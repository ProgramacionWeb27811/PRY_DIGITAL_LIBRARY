// const DB_URL = 'https://fdlrjsqrqtnpbgsjgohn.supabase.co/rest/v1/';

document.getElementById("anio").textContent = new Date().getFullYear();

const txtBuscar = document.getElementById("txtBuscar");
const selectCategoria = document.getElementById("selectCategoria");

document.getElementById("btnBuscar").addEventListener("click", () => {
    const q = (txtBuscar.value || "").trim();
    const cat = selectCategoria.value;
    alert(`Buscar: "${q}" | Categoría: "${cat || "Todas"}"`);
});

document.getElementById("btnLimpiar").addEventListener("click", () => {
    txtBuscar.value = "";
    selectCategoria.value = "";
    txtBuscar.focus();
});

document.getElementById("btnGuardarLibro").addEventListener("click", () => {
    const t = document.getElementById("inpTitulo").value.trim();
    const a = document.getElementById("inpAutor").value.trim();
    const c = document.getElementById("inpCategoria").value;

    if (!t || !a || !c) {
        alert("Complete: Título, Autor y Categoría.");
        return;
    }

    alert(`Libro guardado (demo): ${t} - ${a} [${c}]`);
});  