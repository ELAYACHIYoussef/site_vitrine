-- Mettre à jour le rôle de l'utilisateur admin
UPDATE users 
SET role = 'admin' 
WHERE email = 'ysf.elayachi@gmail.com';

-- Vérifier que ça a fonctionné
SELECT username, email, role 
FROM users 
WHERE email = 'ysf.elayachi@gmail.com';
