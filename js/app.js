import { cargarYears, cotizarSeguro, mostrarAlerta, mostrarResultado, mostrarSpinner, obtenerDatosFormulario, validarDatosFormulario } from "./funciones.js";
import { formularioElement } from "./selectores.js";


// Inicio de la aplicación
const init = async (vent) => {
  vent.preventDefault();

  // Obtener datos del formulario
  const datosFormulario = obtenerDatosFormulario();

  // Verificar datos del formulario
  const esDatosValidos = validarDatosFormulario(datosFormulario);

  // Validar datos del formulario
  if (!esDatosValidos) {
    mostrarAlerta('Todos los campos son obligatorios', false);
    return;
  }

  // Mostrar mensaje de éxito
  mostrarAlerta('Cotizando...', true);

  // Mostar spinner
  await mostrarSpinner();

  // Cotizar seguro
  const datosSeguro = cotizarSeguro(datosFormulario);

  // Mostrar resultado
  mostrarResultado(datosSeguro);
};


// Cargar eventos
document.addEventListener('DOMContentLoaded', () => {

  // Cargar years
  cargarYears();

  formularioElement.addEventListener('submit', init);
});