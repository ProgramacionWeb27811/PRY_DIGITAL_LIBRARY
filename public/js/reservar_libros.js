// reservar_libros.js - Sistema de reservas de libros

// Array para almacenar las reservas
let reservas = [];

// Función para obtener la fecha actual en formato legible
function obtenerFechaActual() {
    const fecha = new Date();
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const año = fecha.getFullYear();
    return `${dia}/${mes}/${año}`;
}

// Función para mostrar notificación (Toast)
function mostrarNotificacion(mensaje, tipo = 'success') {
    const contenedor = document.getElementById('notificacionesContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${mensaje}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    contenedor.appendChild(toast);
    const toastBootstrap = new bootstrap.Toast(toast);
    toastBootstrap.show();
    
    // Eliminar el toast del DOM después de ocultarse
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

// Función para reservar un libro
function reservarLibro(libroAgrupado) {
    // Buscar la primera copia disponible
    const copiaDisponible = libroAgrupado.copias.find(copia => copia.disponible);
    
    if (!copiaDisponible) {
        mostrarNotificacion('No hay copias disponibles de este libro', 'warning');
        return;
    }
    
    // Verificar si el usuario ya tiene este libro reservado
    const yaReservado = reservas.some(reserva => 
        reserva.titulo === libroAgrupado.titulo && reserva.estado === 'Reservado'
    );
    
    if (yaReservado) {
        mostrarNotificacion('Ya tienes una copia de este libro reservada', 'info');
        return;
    }
    
    // Crear la reserva
    const nuevaReserva = {
        libro_id: copiaDisponible.libro_id,
        titulo: libroAgrupado.titulo,
        autor: libroAgrupado.autor,
        categoria: libroAgrupado.categoria,
        fechaReserva: obtenerFechaActual(),
        estado: 'Reservado'
    };
    
    // Agregar a las reservas
    reservas.push(nuevaReserva);
    
    // Marcar la copia como no disponible
    copiaDisponible.disponible = false;
    
    // Actualizar la cantidad disponible en el libro agrupado
    libroAgrupado.cantidadDisponible--;
    
    // Actualizar también en el array original de libros
    const libroOriginal = libros.find(l => l.libro_id === copiaDisponible.libro_id);
    if (libroOriginal) {
        libroOriginal.disponible = false;
    }
    
    // Actualizar la tabla de reservas
    actualizarTablaReservas();
    
    // Recargar las cards para reflejar el cambio de disponibilidad
    cargarCards(paginaActual);
    
    // Mostrar notificación de éxito
    mostrarNotificacion(`"${libroAgrupado.titulo}" reservado exitosamente`, 'success');
    
    // Scroll a la sección de mis préstamos
    setTimeout(() => {
        document.getElementById('mis-prestamos').scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

// Función para actualizar la tabla de reservas
function actualizarTablaReservas() {
    const tbody = document.getElementById('tablaPrestamos');
    tbody.innerHTML = '';
    
    if (reservas.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-soft">No tienes libros reservados actualmente</td>
            </tr>
        `;
        return;
    }
    
    reservas.forEach((reserva, index) => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>
                <div>
                    <strong>${reserva.titulo}</strong>
                    <br>
                    <small class="text-soft">${reserva.autor}</small>
                </div>
            </td>
            <td>${reserva.fechaReserva}</td>
            <td>
                <span class="badge bg-success">${reserva.estado}</span>
            </td>
            <td class="text-center">
                <button class="btn btn-sm btn-danger" onclick="devolverLibro(${index})">
                    Devolver
                </button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

// Función para devolver un libro
function devolverLibro(indexReserva) {
    const reserva = reservas[indexReserva];
    
    // Buscar la copia en el array de libros original y marcarla como disponible
    const libroOriginal = libros.find(l => l.libro_id === reserva.libro_id);
    if (libroOriginal) {
        libroOriginal.disponible = true;
    }
    
    // Actualizar la disponibilidad en el libro agrupado
    const libroAgrupado = librosActuales.find(lg => lg.titulo === reserva.titulo);
    if (libroAgrupado) {
        const copia = libroAgrupado.copias.find(c => c.libro_id === reserva.libro_id);
        if (copia) {
            copia.disponible = true;
            libroAgrupado.cantidadDisponible++;
        }
    }
    
    // Eliminar la reserva
    reservas.splice(indexReserva, 1);
    
    // Actualizar la tabla
    actualizarTablaReservas();
    
    // Recargar las cards
    cargarCards(paginaActual);
    
    // Mostrar notificación
    mostrarNotificacion(`"${reserva.titulo}" devuelto correctamente`, 'info');
}

// Delegación de eventos para los botones de reservar
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar la tabla al cargar la página
    actualizarTablaReservas();
    
    // Usar delegación de eventos en el contenedor de cards
    const gridLibros = document.getElementById('gridLibros');
    
    gridLibros.addEventListener('click', function(e) {
        // Verificar si el click fue en un botón de reservar
        if (e.target.tagName === 'BUTTON' && e.target.textContent.trim() === 'Reservar') {
            // Obtener el índice de la card
            const card = e.target.closest('.col-md-6');
            const todasLasCards = Array.from(gridLibros.querySelectorAll('.col-md-6'));
            const indiceCard = todasLasCards.indexOf(card);
            
            // Calcular el índice real considerando la paginación
            const inicio = (paginaActual - 1) * librosXPagina;
            const indiceReal = inicio + indiceCard;
            
            // Obtener el libro correspondiente
            const libroSeleccionado = librosActuales[indiceReal];
            
            if (libroSeleccionado) {
                reservarLibro(libroSeleccionado);
            }
        }
    });
});
