import { formularioElement, selecMarcaElement, selecYearElement, spinnerElement } from "./selectores.js";

// Cargar years
const cargarYears = () => {

  const yearActual = new Date().getFullYear();
  const yearMin = yearActual - 10;

  // Llenar select
  for (let i = yearActual; i >= yearMin; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;

    selecYearElement.appendChild(option);
  }
};

// Obtener datos del formulario
const obtenerDatosFormulario = () => {
  return {
    marca: selecMarcaElement.value,
    year: selecYearElement.value,
    tipo: document.querySelector('input[name="tipo"]:checked').value
  };
};

// Validar datos del formulario
const validarDatosFormulario = (datosFormulario) => Object.values(datosFormulario).every(valor => valor !== '');

// Mostrar alerta
const mostrarAlerta = (mensaje, tipo) => {

  // Validar si ya existe una alerta 
  const alertaExistente = document.querySelector('.mensaje');
  if (alertaExistente) return;

  // Crear alerta
  const alerta = document.createElement('div');
  alerta.textContent = mensaje;
  alerta.className = `mensaje ${tipo ? 'correcto' : 'error'}`;

  formularioElement.insertBefore(alerta, document.querySelector('#resultado'));

  // Eliminar alerta después de 3 segundos
  setTimeout(() => {
    alerta.remove();
  }, 3000);
};


// Mostrar spinner
const mostrarSpinner = () => {
  return new Promise(resolve => {

    spinnerElement.style.display = 'block';

    setTimeout(() => {
      spinnerElement.style.display = 'none';
      resolve();
    }, 3000);
  });
};
export {
  cargarYears,
  obtenerDatosFormulario,
  validarDatosFormulario,
  mostrarAlerta,
  mostrarSpinner
}