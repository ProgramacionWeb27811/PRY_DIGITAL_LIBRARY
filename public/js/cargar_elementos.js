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

// Función para cargar libros como cards
function cargarCards() {
    const contenedorCards = document.getElementById('gridLibros');
    
    libros.forEach(libro => {
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
}

// Cargar elementos al documento
document.addEventListener('DOMContentLoaded', function() {
    cargarSelect();
    cargarCards();
});