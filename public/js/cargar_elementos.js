// Datos de los libros
const libros = [
    { 
        titulo: 'JavaScript: The Good Parts', 
        autor: 'Douglas Crockford', 
        detalles: 'Una guía esencial para dominar JavaScript y evitar sus partes problemáticas.', 
        categoria: 'Programación',
        disponible: true
    },
    { 
        titulo: 'Diseño de Bases de Datos', 
        autor: 'Carlos Coronel', 
        detalles: 'Fundamentos y aplicaciones prácticas del diseño de bases de datos relacionales.', 
        categoria: 'Base de Datos',
        disponible: true
    },
    { 
        titulo: 'Algoritmos en C++', 
        autor: 'Robert Sedgewick', 
        detalles: 'Implementación y análisis de algoritmos fundamentales en programación.', 
        categoria: 'Algoritmos',
        disponible: true
    },
    { 
        titulo: 'HTML5 y CSS3', 
        autor: 'Jon Duckett', 
        detalles: 'Diseño y desarrollo web moderno con HTML5 y CSS3.', 
        categoria: 'Diseño Web',
        disponible: true
    },
    { 
        titulo: 'Clean Code', 
        autor: 'Robert C. Martin', 
        detalles: 'Técnicas ágiles de desarrollo de software para escribir código limpio.', 
        categoria: 'Programación',
        disponible: true
    },
    { 
        titulo: 'SQL Avanzado', 
        autor: 'Joe Celko', 
        detalles: 'Técnicas avanzadas de SQL para desarrolladores profesionales.', 
        categoria: 'Base de Datos',
        disponible: true
    },
    { 
        titulo: 'Estructuras de Datos', 
        autor: 'Mark Allen Weiss', 
        detalles: 'Teoría y práctica de estructuras de datos fundamentales.', 
        categoria: 'Algoritmos',
        disponible: true
    },
    { 
        titulo: 'Python para Científicos', 
        autor: 'Alex DeCaria', 
        detalles: 'Aplicaciones de Python en computación científica y análisis de datos.', 
        categoria: 'Programación',
        disponible: true
    },
    { 
        titulo: 'Responsive Web Design', 
        autor: 'Ethan Marcotte', 
        detalles: 'Técnicas modernas para crear sitios web adaptativos y mobile-first.', 
        categoria: 'Diseño Web',
        disponible: true
    },
    { 
        titulo: 'MongoDB: The Definitive Guide', 
        autor: 'Shannon Bradshaw', 
        detalles: 'Guía completa sobre bases de datos NoSQL con MongoDB.', 
        categoria: 'Base de Datos',
        disponible: true
    },
    { 
        titulo: 'Introduction to Algorithms', 
        autor: 'Thomas H. Cormen', 
        detalles: 'Referencia académica sobre algoritmos clásicos y su complejidad.', 
        categoria: 'Algoritmos',
        disponible: true
    },
    { 
        titulo: 'Vue.js 3 Guide', 
        autor: 'Evan You', 
        detalles: 'Desarrollo de aplicaciones web interactivas con Vue.js.', 
        categoria: 'Programación',
        disponible: true
    },
    { 
        titulo: 'Diseño UX/UI Moderno', 
        autor: 'Steve Krug', 
        detalles: 'Principios de usabilidad y diseño de interfaces de usuario.', 
        categoria: 'Diseño Web',
        disponible: true
    },
    { 
        titulo: 'Administración de Servidores Linux', 
        autor: 'Evi Nemeth', 
        detalles: 'Gestión profesional de servidores Linux en entornos empresariales.', 
        categoria: 'Programación',
        disponible: true
    },
    { 
        titulo: 'Data Science con Python', 
        autor: 'Jake VanderPlas', 
        detalles: 'Análisis y visualización de datos usando Python y librerías especializadas.', 
        categoria: 'Base de Datos',
        disponible: true
    }
];

// Datos de las categorías
const categorias = ['Programación', 'Base de Datos', 'Algoritmos', 'Diseño Web'];

// Función para cargar categorías en el select
function cargarSelect() {
    const selectElement = document.getElementById('selectCategoria');
    
    categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria;
        option.textContent = categoria;
        selectElement.appendChild(option);
    });
}

// Variables de paginación
let paginaActual = 1;
const librosXPagina = 8;
let librosActuales = [...libros]; // Para almacenar libros filtrados

// Función para cargar libros como cards
function cargarCards(pagina = 1) {
    const contenedorCards = document.getElementById('gridLibros');
    contenedorCards.innerHTML = '';
    
    // Calcular índices
    const inicio = (pagina - 1) * librosXPagina;
    const fin = inicio + librosXPagina;
    const librosPagina = librosActuales.slice(inicio, fin);
    
    if (librosPagina.length === 0) {
        contenedorCards.innerHTML = '<div class="col-12 text-center text-soft"><p>No se encontraron libros.</p></div>';
        document.getElementById('paginationContainer').innerHTML = '';
        return;
    }
    
    librosPagina.forEach(libro => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3';
        
        col.innerHTML = `
            <div class="glass rounded-3 p-3 h-100 shadow-soft">
                <h5 class="fw-bold mb-2">${libro.titulo}</h5>
                <p class="text-soft small mb-2">📝 ${libro.autor}</p>
                <p class="small mb-3">${libro.detalles}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <span class="badge bg-primary">${libro.categoria}</span>
                    <button class="btn btn-sm btn-primary">Reservar</button>
                </div>
            </div>
        `;
        
        contenedorCards.appendChild(col);
    });
    
    // Cargar paginación
    cargarPaginacion();
}

// Función para cargar libros con filtro (desde controlador.js)
function cargarCardsConFiltro(librosFiltrados, pagina = 1) {
    librosActuales = [...librosFiltrados];
    paginaActual = 1;
    cargarCards(pagina);
}

// Función para cargar la paginación
function cargarPaginacion() {
    const totalPaginas = Math.ceil(librosActuales.length / librosXPagina);
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';
    
    if (totalPaginas <= 1) return; // No mostrar paginación si hay una sola página
    
    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Page navigation');
    
    const ul = document.createElement('ul');
    ul.className = 'pagination justify-content-center pagination-custom';
    
    // Botón anterior
    const liPrev = document.createElement('li');
    liPrev.className = `page-item ${paginaActual === 1 ? 'disabled' : ''}`;
    liPrev.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${paginaActual - 1}); return false;">Anterior</a>`;
    ul.appendChild(liPrev);
    
    // Números de página
    for (let i = 1; i <= totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === paginaActual ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${i}); return false;">${i}</a>`;
        ul.appendChild(li);
    }
    
    // Botón siguiente
    const liNext = document.createElement('li');
    liNext.className = `page-item ${paginaActual === totalPaginas ? 'disabled' : ''}`;
    liNext.innerHTML = `<a class="page-link" href="#" onclick="cambiarPagina(${paginaActual + 1}); return false;">Siguiente</a>`;
    ul.appendChild(liNext);
    
    nav.appendChild(ul);
    paginationContainer.appendChild(nav);
}

// Función para cambiar de página
function cambiarPagina(pagina) {
    const totalPaginas = Math.ceil(librosActuales.length / librosXPagina);
    if (pagina >= 1 && pagina <= totalPaginas) {
        paginaActual = pagina;
        cargarCards(paginaActual);
        // Scroll al inicio del catálogo
        document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
}

// Cargar elementos al documento
document.addEventListener('DOMContentLoaded', function() {
    cargarSelect();
    cargarCards();
});