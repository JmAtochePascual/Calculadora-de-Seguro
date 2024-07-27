import { cargarYears, obtenerDatosFormulario, validarDatosFormulario } from "./funciones.js";
import { formularioElement } from "./selectores.js";


// Inicio de la aplicación
const init = (e) => {
  e.preventDefault();

  // Obtener datos del formulario
  const datosFormulario = obtenerDatosFormulario();

  // Validar datos del formulario
  const esDatosValidos = validarDatosFormulario(datosFormulario);

};


// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {

  // Cargar years
  cargarYears();

  formularioElement.addEventListener('submit', init);
});