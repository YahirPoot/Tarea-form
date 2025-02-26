
const users = [];

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

document.getElementById('register').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const email = document.getElementById('register-email').value;
    console.log(username, password);

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
    });
    const result = await response.text();
    alert(result);
    if (result === 'Registro exitoso') {
        document.getElementById('register-form').classList.add('d-none');
        document.getElementById('login-form').classList.remove('d-none');
    }
});

// Manejo de login
document.getElementById('login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.text();
    alert(result);
    if (result === 'Login exitoso') {
        document.getElementById('login-form').classList.add('d-none');
        document.getElementById('message-area').classList.remove('d-none');
    }
});

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const content = document.getElementById('message-content').value;

    messages.push(content);
    document.getElementById('message-content').value = '';

    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = messages.map(msg => `<div class="alert alert-info">${msg}</div>`).join('');
});