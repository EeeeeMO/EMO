let ingredientes = [];
let ingredientName = '';

//Dom
const $ingredientes = document.querySelector('.ingredientes');
const $ingreItem = document.querySelector('.ingre-item');
const $ingreItemContainer = document.querySelector('.ingre-item-container');
const $refresh = document.querySelector('.refresh');
const $cookEnter = document.querySelector('.cookEnter');

//fn
const render = () => {
  $ingreItemContainer.innerHTML =
    `<li class="ingre-item"><span>${ingredientName}</span><button class="remove-ingre-item">X</button></li>` +
    $ingreItemContainer.innerHTML;
};

$ingredientes.onclick = (e) => {
  if (!e.target.matches('.ingredient > ul > li')) return;
  ingredientName = e.target.textContent;
  $ingreItemContainer.classList.add('active');
  $refresh.classList.add('active');
  $cookEnter.classList.add('active');

  if (ingredientes.some((item) => item === ingredientName)) return;
  ingredientes = ingredientes.concat(ingredientName);
  render();
};

$ingreItemContainer.onclick = (e) => {
  if (!e.target.matches('.remove-ingre-item')) return;
  $ingreItemContainer.removeChild(e.target.parentNode);

  const ingredientAdded = e.target.previousSibling.textContent;
  ingredientes = ingredientes.filter((item) => item !== ingredientAdded);

  if (!ingredientes.length) {
    $ingreItemContainer.classList.remove('active');
    $refresh.classList.remove('active');
    $cookEnter.classList.remove('active');
    window.sessionStorage.clear();
  }
};

const fetchIngre = async () => {
  try {
    const cuisineDb = await fetch('/cuisine');
    const ingreData = cuisineDb.json();
    console.log(ingreData);
  } catch {}
};

fetchIngre();

$cookEnter.onclick = (e) => {
  window.sessionStorage.setItem('ingredientes', JSON.stringify(ingredientes));
};
