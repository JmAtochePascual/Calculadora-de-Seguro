
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

  const marcaElement = document.querySelector('#marca').value;
  const yearElement = document.querySelector('#year').value;
  const tipoElement = document.querySelector('input[name="tipo"]:checked').value;

  if ([marcaElement, yearElement, tipoElement].includes('')) {
    ui.mostrarMensaje('Todos los campos son obligatorios', false);
    return;
  }
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