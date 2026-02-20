const API_URL = 'http://localhost:8080/api/catalog/config';

export const getGlobalConfig = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch config');
        return await response.json();
    } catch (error) {
        console.error('Error fetching config:', error);
        return {};
    }
};

export const updateGlobalConfig = async (updates) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add Authorization header if needed in future
            },
            body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update config');
        return true;
    } catch (error) {
        console.error('Error updating config:', error);
        throw error;
    }
};
