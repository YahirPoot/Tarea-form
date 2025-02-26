const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

// Configurar middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

// Conectar a SQLite
const db = new sqlite3.Database('database.db');

// Crear tabla de usuarios si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL
)`);

// Endpoint vulnerable para registro de usuarios
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    
    // Consulta SQL vulnerable a inyección
    const sql = `INSERT INTO users (username, password, role) VALUES ('${username}', '${password}', 'user')`;
    db.run(sql, function (err) {
        if (err) {
            return res.send('Error en el registro');
        }
        res.send('Registro exitoso');
    });
});

// Endpoint vulnerable para login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Consulta SQL vulnerable a inyección
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    db.get(sql, (err, user) => {
        if (user) {
            res.cookie('session', user.id, { httpOnly: false }); // Cookie insegura
            res.send('Login exitoso');
        } else {
            res.send('Credenciales incorrectas');
        }
    });
});

// Endpoint vulnerable para cambiar contraseña (CSRF)
app.post('/change-password', (req, res) => {
    const { newPassword } = req.body;
    const userId = req.cookies.session;

    if (!userId) return res.send('No estás autenticado');

    // Cambio de contraseña sin verificación (CSRF)
    const sql = `UPDATE users SET password = '${newPassword}' WHERE id = ${userId}`;
    db.run(sql, function (err) {
        if (err) {
            return res.send('Error cambiando contraseña');
        }
        res.send('Contraseña cambiada');
    });
});

// Iniciar servidor
app.listen(port, () => {
    console.log(`Servidor vulnerable en http://localhost:${port}`);
});
