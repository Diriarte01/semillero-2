// Obtener los elementos del formulario
const form = document.querySelector('form');
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const userAndPassword = {
    "juan@mail.com"  : "juan123",
    "maria@mail.com" : "maria123",
    "admin@mail.com" : "admin123"
};

// Agregar un evento de escucha para el envío del formulario
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir que se envíe el formulario

    // Validar los campos del formulario
    if (username.value.trim() === '' || password.value.trim() === '') {
        alert('Por favor ingresa tu usuario y contraseña');
        return;
    }
    if ((username.value.trim() === 'juan@mail.com' && password.value.trim() === 'juan123') ||
        (username.value.trim() === 'maria@mail.com' && password.value.trim() === 'maria123') ||
        (username.value.trim() === 'admin@mail.com' && password.value.trim() === 'admin123')) {
        // Si el usuario y la contraseña son válidos, redirigir al usuario a la página principal
        window.location.href = 'https://fakeapi.platzi.com/';
    } else {
        // Mostrar mensaje de error
        alert('Usuario o contraseña incorrectos');
    }

});

