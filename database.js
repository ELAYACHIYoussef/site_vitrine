const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('[DATABASE] SUPABASE_URL or SUPABASE_KEY missing in .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

const db = {
    get: async (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        try {
            const lsql = sql.toLowerCase();
            // User by email
            if (lsql.includes('from users where email = ?')) {
                const { data, error } = await supabase.from('users').select('*').eq('email', params[0]).single();
                if (callback) callback(error, data);
            }
            // Password reset token
            else if (lsql.includes('from password_reset_tokens')) {
                const { data, error } = await supabase.from('password_reset_tokens')
                    .select('*')
                    .eq('token', params[0])
                    .eq('used', false)
                    .gt('expires_at', new Date().toISOString())
                    .single();
                if (callback) callback(error, data);
            }
            // Count users/orders
            else if (lsql.includes('select count(*)')) {
                const table = lsql.includes('from users') ? 'users' : (lsql.includes('from orders') ? 'orders' : 'products');
                let query = supabase.from(table).select('*', { count: 'exact', head: true });
                if (lsql.includes("role = 'client'")) query = query.eq('role', 'client');
                const { count, error } = await query;
                if (callback) callback(error, { count: count || 0 });
            }
            // Sum views
            else if (lsql.includes('select sum(views)')) {
                const { data, error } = await supabase.from('products').select('views');
                const sum = data ? data.reduce((acc, curr) => acc + (curr.views || 0), 0) : 0;
                if (callback) callback(error, { count: sum });
            }
            // Product by ID
            else if (lsql.includes('from products where id = ?')) {
                const { data, error } = await supabase.from('products').select('*').eq('id', params[0]).single();
                if (callback) callback(error, data);
            }
            else {
                console.warn(`[Supabase Wrapper] get: Unsupported query: ${sql}`);
                if (callback) callback(null, null);
            }
        } catch (err) {
            if (callback) callback(err);
        }
    },

    all: async (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        try {
            const lsql = sql.toLowerCase();
            if (lsql.includes('select distinct category, categorylabel from products')) {
                const { data, error } = await supabase.from('products').select('category, categorylabel');
                // Manually handle distinct if needed, or just let the frontend handle it
                const unique = Array.from(new Map(data?.map(item => [item.category, item])).values());
                if (callback) callback(error, unique || []);
                return;
            }
            // Products
            if (lsql.includes('from products')) {
                let query = supabase.from('products').select('*');
                if (lsql.includes('where category = ?')) query = query.eq('category', params[0]);
                if (lsql.includes('order by views desc')) query = query.order('views', { ascending: false });
                if (lsql.includes('limit')) {
                    const limit = parseInt(sql.match(/limit (\d+)/i)?.[1] || '10');
                    query = query.limit(limit);
                }
                const { data, error } = await query;
                if (callback) callback(error, data || []);
            }
            else {
                console.warn(`[Supabase Wrapper] all: Unsupported query: ${sql}`);
                if (callback) callback(null, []);
            }
        } catch (err) {
            if (callback) callback(err);
        }
    },

    run: async (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }
        try {
            const lsql = sql.toLowerCase();
            let result = { changes: 1 };

            // INSERT user
            if (lsql.includes('insert into users')) {
                const { data, error } = await supabase.from('users').insert({
                    username: params[0], email: params[1], password: params[2], role: params[3]
                }).select().single();
                if (callback) callback.call({ lastID: data?.id }, error);
            }
            // INSERT reset token
            else if (lsql.includes('insert into password_reset_tokens')) {
                const { error } = await supabase.from('password_reset_tokens').insert({
                    user_id: params[0], token: params[1], expires_at: params[2]
                });
                if (callback) callback(error);
            }
            // UPDATE user password
            else if (lsql.includes('update users set password')) {
                const { error } = await supabase.from('users').update({ password: params[0] }).eq('id', params[1]);
                if (callback) callback(error);
            }
            // UPDATE reset token used
            else if (lsql.includes('update password_reset_tokens set used = 1')) {
                const { error } = await supabase.from('password_reset_tokens').update({ used: true }).eq('id', params[0]);
                if (callback) callback(error);
            }
            // INSERT products (Leboncoin sync)
            else if (lsql.includes('insert into products') || lsql.includes('insert or ignore into products')) {
                const isIgnore = lsql.includes('ignore');
                const { data, error } = await supabase.from('products').insert({
                    name: params[0], price: params[1], category: params[2], categorylabel: params[3],
                    description_courte: params[4], thumbnail: params[5], images: params[6]
                }).select().single();
                if (callback) callback.call({ lastID: data?.id, changes: (error && isIgnore) ? 0 : 1 }, error);
            }
            // UPDATE product views
            else if (lsql.includes('update products set views = views + 1')) {
                const { data: p } = await supabase.from('products').select('views').eq('id', params[0]).single();
                const { error } = await supabase.from('products').update({ views: (p?.views || 0) + 1 }).eq('id', params[0]);
                if (callback) callback(error);
            }
            else {
                console.warn(`[Supabase Wrapper] run: Unsupported query: ${sql}`);
                if (callback) callback(null);
            }
        } catch (err) {
            if (callback) callback(err);
        }
    },

    serialize: (fn) => fn(),
    prepare: (sql) => ({
        run: (...args) => {
            const callback = args.pop();
            db.run(sql, args, callback);
        },
        finalize: () => { }
    })
};

const initDb = async () => {
    return Promise.resolve(db);
};

module.exports = { db, initDb, supabase };
