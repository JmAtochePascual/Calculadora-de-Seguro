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

  // cada año que la diferencia es mayor, el costo se reduce un 3%
  const diferencia = new Date().getFullYear() - this.year;
  cantidad -= ((diferencia * 3) * cantidad) / 100;


  /*
    Si el seguro es básico se multiplica por 30% más
    Si el seguro es completo se multiplica por 50% más
  */
  this.tipo === 'basico' ? cantidad *= 1.30 : cantidad *= 1.50;

  return cantidad;
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

  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(seguro, total);
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

UI.prototype.mostrarResultado = (seguro, total) => {
  const { marca, year, tipo } = seguro;
  const marcas = ['Americano', 'Asiatico', 'Europeo'];
  const textoMarca = marcas[marca - 1];

  const resultadoElement = document.querySelector('#resultado');
  const spinner = document.querySelector('#cargando');

  // Limpiar Html
  while (resultadoElement.firstChild) {
    resultadoElement.removeChild(resultadoElement.firstChild);
  };

  const divElement = document.createElement('div');
  divElement.classList.add('mt-10');
  divElement.innerHTML = `
    <p class="header">Tu resumen:</p>
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal">${tipo}</span></p>
    <p class="font-bold">Total: <span class="font-normal">$ ${total}</span></p>
  `;

  // Mostrar spinner
  spinner.style.display = 'block';

  // Ocultar spinner y mostrar resultado
  setTimeout(() => {
    spinner.style.display = 'none';
    resultadoElement.appendChild(divElement);
  }, 3000);

};


const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  const formularioElement = document.querySelector('#cotizar-seguro');

  ui.llenarYear();
  formularioElement.addEventListener('submit', ui.validarFormulario);
});