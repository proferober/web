// =============================
// Carga inicial del JSON
// =============================
let actividades = [];

fetch('actividades.json')
  .then(res => res.json())
  .then(data => {
    actividades = data;
  })
  .catch(err => {
    console.error("Error al cargar actividades.json:", err);
  });

// =============================
// Referencias a elementos del DOM
// =============================
const fechaInput = document.getElementById('selectorFecha');
const gradoInput = document.getElementById('selectorGrado');
const contenido = document.getElementById('contenido');

// =============================
// Eventos de cambio en los selectores
// =============================
fechaInput.addEventListener('change', mostrarActividad);
gradoInput.addEventListener('change', mostrarActividad);

// =============================
// Función principal
// =============================
function mostrarActividad() {
  const fechaSeleccionada = fechaInput.value;
  const gradoSeleccionado = gradoInput.value;

  // Validación básica
  if (!fechaSeleccionada || !gradoSeleccionado) {
    contenido.innerHTML = "<p>Seleccione una fecha y un grado.</p>";
    return;
  }

  // Filtrar coincidencias exactas
  const resultados = actividades.filter(a =>
    a.fecha === fechaSeleccionada && a.grado === gradoSeleccionado
  );

  if (resultados.length > 0) {
    let html = "";
    resultados.forEach((a, i) => {
      // Convierte enlaces a clicables
      const textoConEnlaces = a.actividad.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank">$1</a>'
      );
      html += `<div class="actividad"><h3>Actividad ${i + 1}</h3><p>${textoConEnlaces}</p></div>`;
    });
    contenido.innerHTML = html;
  } else {
    contenido.innerHTML = "<p>No hay actividad registrada para esta fecha y grado.</p>";
  }
}
