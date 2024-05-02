function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
};

Seguro.prototype.cotizarSeguro = function () {
  /*
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35
  */
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case '1':
      cantidad = base * 1.15;
      break;
    case '2':
      cantidad = base * 1.05;
      break;
    case '3':
      cantidad = base * 1.35;
      break;
    default:
      break;
  };

  console.log(cantidad);
};

function UI() { };

// Llenar las opciones de año
UI.prototype.llenarYear = () => {
  const max = new Date().getFullYear();
  const min = max - 20;
  const selectYearElement = document.querySelector('#year');

  for (let i = max; i > min; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;

    selectYearElement.appendChild(option);
  };
};

// Validar formulario
UI.prototype.validarFormulario = (event) => {
  event.preventDefault();

  const marca = document.querySelector('#marca').value;
  const year = document.querySelector('#year').value;
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if ([marca, year, tipo].includes('')) {
    ui.mostrarMensaje('Todos los campos son obligatorios', false);
    return;
  }

  ui.mostrarMensaje('Cotizando...', true);

  const seguro = new Seguro(marca, year, tipo);

  seguro.cotizarSeguro();

};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo = true) => {
  const formularioElement = document.querySelector('#cotizar-seguro');

  const divElement = document.createElement('div');
  divElement.classList.add('mensaje', 'mt-10');
  divElement.textContent = mensaje;

  tipo ? divElement.classList.add('correcto') : divElement.classList.add('error');

  formularioElement.insertBefore(divElement, document.querySelector('#resultado'));

  setTimeout(() => {
    divElement.remove();
  }, 3000);
};


const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  const formularioElement = document.querySelector('#cotizar-seguro');

  ui.llenarYear();
  formularioElement.addEventListener('submit', ui.validarFormulario);
});