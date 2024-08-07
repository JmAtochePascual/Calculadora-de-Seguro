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

  // Limpiar resultado anterior
  limpiarHtml();

  // Validar si ya existe una alerta 
  const alertaExistente = document.querySelector('.mensaje');
  if (alertaExistente) return;

  // Crear alerta
  const alerta = document.createElement('div');
  alerta.textContent = mensaje;
  alerta.className = `mensaje mt-10 ${tipo ? 'correcto' : 'error'}`;

  formularioElement.insertBefore(alerta, document.querySelector('#resultado'));

  // Eliminar alerta después de 3 segundos
  setTimeout(() => {
    alerta.remove();
  }, 3000);
};

// Cotizar seguro
const cotizarSeguro = (datosFormulario) => {

  const { marca, year, tipo } = datosFormulario;

  // Base de seguro
  let cantidad = 2000;

  // Obtener marca
  switch (marca) {
    case '1':
      cantidad *= 1.15;
      break;
    case '2':
      cantidad *= 1.05;
      break;
    case '3':
      cantidad *= 1.5;
      break;
    default:
      break;
  }

  // Obtener year
  const diferencia = new Date().getFullYear() - year;
  cantidad -= ((diferencia * 3) * cantidad) / 100;

  // Obtener tipo
  cantidad = (tipo === 'basico') ? cantidad * 1.3 : cantidad * 1.5;

  return { cantidad, marca, year, tipo };
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

// Mostrar resultado 
const mostrarResultado = (datosSeguro) => {

  const { cantidad, marca, year, tipo } = datosSeguro;
  const marcas = {
    1: 'Americano',
    2: 'Asiático',
    3: 'Europeo'
  }

  const div = document.createElement('div');
  div.classList.add('mt-10');

  // Crear resumen
  const texto = `
    <p class="header">Resumen:</p>
    <p class="font-bold">Marca: <span class="font-normal">${marcas[marca]}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal">${tipo}</span></p>
    <p class="font-bold">Total:<span class="font-normal">${cantidad}</span></p>
  `;

  div.innerHTML = texto;

  document.querySelector('#resultado').appendChild(div);
};

// Limpiar html
const limpiarHtml = () => {
  const resultado = document.querySelector('#resultado');

  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
};

export {
  cargarYears,
  obtenerDatosFormulario,
  validarDatosFormulario,
  mostrarAlerta,
  mostrarSpinner,
  cotizarSeguro,
  mostrarResultado
}