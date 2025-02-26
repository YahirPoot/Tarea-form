// Datos simulados de usuarios (¡Error de seguridad intencional! Almacenar contraseñas en texto plano)
const users = [];

// Datos simulados de mensajes
const messages = [];

// Mostrar/ocultar formularios
document.getElementById('show-register').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('login-form').classList.add('d-none');
    document.getElementById('register-form').classList.remove('d-none');
    document.getElementById('message-area').classList.add('d-none');
});

document.getElementById('show-login').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('register-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
    document.getElementById('message-area').classList.add('d-none');
});

// Registro de usuarios
document.getElementById('register').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;
    const passwordConfirm = document.getElementById('register-confirm-password').value;

    // Guardar usuario en texto plano (¡Error de seguridad!)
    users.push({ username, password, email, passwordConfirm });
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    document.getElementById('register-form').classList.add('d-none');
    document.getElementById('login-form').classList.remove('d-none');
});

// Login de usuarios
document.getElementById('login').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        alert('Inicio de sesión exitoso.');
        document.getElementById('login-form').classList.add('d-none');
        document.getElementById('message-area').classList.remove('d-none');
    } else {
        alert('Usuario o contraseña incorrectos.');
    }
});

// Enviar mensajes
document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const content = document.getElementById('message-content').value;

    // Guardar mensaje (¡Error de seguridad! No se valida ni sanitiza el contenido)
    messages.push(content);
    document.getElementById('message-content').value = '';

    // Mostrar mensajes
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = messages.map(msg => `<div class="alert alert-info">${msg}</div>`).join('');
});