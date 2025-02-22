// Datos simulados de usuarios (¡Error de seguridad intencional! Almacenar contraseñas en texto plano)
const users = [];

// Mostrar/ocultar formularios
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Registro de usuarios
document.getElementById('register').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

    // Guardar usuario en texto plano (¡Error de seguridad!)
    users.push({ username, password, email, passwordConfirm });
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

// Login de usuarios
document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;


    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Inicio de sesión exitoso.');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('message-area').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

