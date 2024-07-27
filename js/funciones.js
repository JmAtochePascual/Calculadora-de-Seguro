import { selecMarcaElement, selecYearElement } from "./selectores.js";

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

export {
  cargarYears,
  obtenerDatosFormulario,
  validarDatosFormulario
}