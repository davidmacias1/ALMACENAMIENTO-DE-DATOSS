document.addEventListener('DOMContentLoaded', () => {
    const clienteForm = document.getElementById('clienteform')
    clienteForm.addEventListener('submit', (e) => {
        e.preventDefault()

        // Validar el formulario
        if (!validateForm()) {
            return
        }
        // Obtener valores del formulario
        const cedula = document.getElementById('cedula').value
        const apellidos = document.getElementById('apellido').value
        const nombres = document.getElementById('nombre').value
        const direccion = document.getElementById('direccion').value
        const telefono = document.getElementById('telefono').value
        const email = document.getElementById('correo').value

        // Obtener clientes existentes del localStorage
        const Clientes = JSON.parse(localStorage.getItem('Clientes')) || []

        // Verificar si el cliente ya está registrado
        const isClienteRegistered = Clientes.find(cliente => cliente.cedula === cedula)
        if (isClienteRegistered) {
            alert('¡El cliente ya está registrado!')
            return
        }

        // Añadir nuevo cliente al array
        Clientes.push({cedula: cedula, apellidos: apellidos, nombres: nombres, direccion: direccion, telefono: telefono, email: email})
        
        // Almacenar clientes actualizados en localStorage
        localStorage.setItem('Clientes', JSON.stringify(Clientes))

        // Mensaje de éxito y redirección
        alert('¡Registro Exitoso!')
        window.location.href = 'registro.html'
    })
})

function validateForm() {
    const nombre = document.getElementById('nombre').value
    const apellido = document.getElementById('apellido').value
    const telefono = document.getElementById('telefono').value
    const cedula = document.getElementById('cedula').value
    const correo = document.getElementById('correo').value

    let hasError = false

    const namePattern = /^[a-zA-ZáéíóúñÑü]+$/
    if (nombre.length < 3 || !nombre.match(namePattern)) {
        document.getElementById('firstname-error').textContent = 'El nombre debe tener al menos 3 caracteres y solo letras.'
        hasError = true
    } else {
        document.getElementById('firstname-error').textContent = ''
    }

    if (apellido.length < 3 || !apellido.match(namePattern)) {
        document.getElementById('lastname-error').textContent = 'El apellido debe tener al menos 3 caracteres y solo letras.'
        hasError = true
    } else {
        document.getElementById('lastname-error').textContent = ''
    }

    const phonePattern = /^[0-9]+$/
    if (!telefono.match(phonePattern)) {
        document.getElementById('telefono-error').textContent = 'El teléfono debe contener solo números.'
        hasError = true
    } else {
        document.getElementById('telefono-error').textContent = ''
    }

    if (!cedula.match(phonePattern)) {
        document.getElementById('cedula-error').textContent = 'La cédula debe contener solo números.'
        hasError = true
    } else {
        document.getElementById('cedula-error').textContent = ''
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if (!correo.match(emailPattern)) {
        document.getElementById('email-error').textContent = 'Ingresa una dirección de correo electrónico válida.'
        hasError = true
    } else {
        document.getElementById('email-error').textContent = ''
    }

    if (!hasError) {
        alert('¡Usuario registrado exitosamente!')
    }

    return !hasError
}