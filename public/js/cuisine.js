
// State
const result = [];


// DOMs
const $containerWrap = document.querySelector('.container-wrap');
const $backBtn = document.querySelector('.back-btn');
const $cuisineContainer = document.querySelector('.cuisine-container');
const $preview = document.querySelector('.preview');
const $previewList = document.querySelector('.preview-list');

const renderMain = res => {
  let html = '';

  res.forEach(({ id, name, img, difficulty }) => {
    html += `<div class="cuisine-container">
    <a href="http://localhost:5000/recipe.html?id=${id}">
    <figure class="cuisine">
      <div class="img-wrapper">
        <img src="${img}" alt="${name}" />
        <span class="difficulty">${difficulty}</span>
      </div>
      <figcaption>${name}</figcaption>
      <i class="fas fa-bookmark"></i>
    </figure>
    </a>
  </div>`;
  });

  $containerWrap.innerHTML = html;
};

const renderPrev = res => {
  let li = '';

  res.forEach(item => { li += `<li>${item}</li>`; });
  $previewList.innerHTML = li;
};

const fetchIng = async ingredientes => {
  try {
    const data = await fetch('/cuisine');
    const res = await data.json();

    res.forEach(cuisine => {
      for (let i = 0; i < cuisine.ingredient.length; i++) {
        if (cuisine.ingredient.includes(ingredientes[i])) {
          result.push(cuisine);
        }
      }
      renderMain([...new Set(result)]);
    });
  } catch (e) {
    console.error(e);
  }
};

$backBtn.onclick = () => { window.location.assign('/ingredient.html'); };

$previewList.onclick = ({ target }) => {
  if (target !== $previewList.children) return;
  console.log(target);
};

window.onload = () => {
  const ingredientes = JSON.parse(window.sessionStorage.getItem('ingredientes'));
  fetchIng(ingredientes);
  renderPrev(ingredientes);
  $preview.scrollLeft += 10;
};
