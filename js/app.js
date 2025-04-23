const selectBrandElement = document.querySelector('#marca');
const selectYearElement = document.querySelector('#year');
const formElement = document.querySelector('#cotizar-seguro');
const spinnerElement = document.querySelector('#cargando');

const quote = async (event) => {
  event.preventDefault();

  const data = getDataOfFrom();

  if (Object.values(data).includes('')) {
    showAlert('Todos los campos son obligatorios', false);
    return;
  };

  await showSpinner();

  const insure = getQuote(data);

  showResult(insure);
};


const showYears = () => {
  const currentYear = new Date().getFullYear();
  const yearMin = currentYear - 10;

  for (let i = currentYear; i >= yearMin; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;

    selectYearElement.appendChild(option);
  };
};

const getDataOfFrom = () => ({
  brand: selectBrandElement.value,
  year: selectYearElement.value,
  type: document.querySelector('input[name="tipo"]:checked').value
});

const showAlert = (message, type) => {
  cleanHtml();

  const alertExist = document.querySelector('.mensaje');
  if (alertExist) return;

  const alert = document.createElement('div');
  alert.textContent = message;
  alert.className = `mensaje mt-10 ${type ? 'correcto' : 'error'}`;

  formElement.insertBefore(alert, document.querySelector('#resultado'));

  setTimeout(() => {
    alert.remove();
  }, 3000);
};

const getQuote = (data) => {
  const { brand, year, type } = data;

  let quantity = 2000;

  switch (brand) {
    case '1':
      quantity *= 1.15;
      break;
    case '2':
      quantity *= 1.05;
      break;
    case '3':
      quantity *= 1.5;
      break;
    default:
      break;
  };

  const difference = new Date().getFullYear() - year;

  quantity -= ((difference * 3) * quantity) / 100;

  quantity = (type === 'basico') ? quantity * 1.3 : quantity * 1.5;

  return { quantity, brand, year, type };
};

const showSpinner = () => {
  return new Promise(resolve => {

    showAlert('Cotizando...', true);

    spinnerElement.style.display = 'block';

    setTimeout(() => {
      spinnerElement.style.display = 'none';
      resolve();
    }, 3000);
  });
};

const showResult = ({ quantity, brand, year, type }) => {
  const marcas = {
    1: 'Americano',
    2: 'Asiático',
    3: 'Europeo'
  };

  const div = document.createElement('div');
  div.classList.add('mt-10');

  const information = `
    <p class="header">Resumen:</p>
    <p class="font-bold">Marca: <span class="font-normal">${marcas[brand]}</span></p>
    <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
    <p class="font-bold">Tipo: <span class="font-normal">${type}</span></p>
    <p class="font-bold">Total:<span class="font-normal">${quantity}</span></p>
  `;

  div.innerHTML = information;

  document.querySelector('#resultado').appendChild(div);
};

const cleanHtml = () => {
  const resultado = document.querySelector('#resultado');

  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  };
};

document.addEventListener('DOMContentLoaded', () => {
  showYears();
  formElement.addEventListener('submit', quote);
});