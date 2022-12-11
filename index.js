let myLogIn = '';

function ready() {
  setTimeout(() => {
    document.querySelector('body').insertAdjacentHTML(
      'afterbegin',
      '     <!-- Button trigger modal --><button type="button" class="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Как вас зовут?</button>',
    );
  });
  setTimeout(() => {
    document.querySelector('body > button').click();
  });
}

document.addEventListener('DOMContentLoaded', ready);
document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > button');
// Обработчик инпута в хедаре
document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div > input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (document.querySelector('body > div.d-grid.gap-1 > div > div').childNodes.length) {
      document.querySelector('body > div.d-grid.gap-1 > div > div').textContent = '';
    }
    console.log(document.getElementsByTagName('input')[0].value);
    myLogIn = document.getElementsByTagName('input')[0].value;
    document.querySelector('#staticBackdrop > div > div > div.modal-footer > button').click();
    // document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div').classList.toggle('visually-hidden');
    contentLoad();
  }
});

document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div > button').addEventListener('click', () => {
  if (document.querySelector('body > div.d-grid.gap-1 > div > div').childNodes.length) {
    document.querySelector('body > div.d-grid.gap-1 > div > div').textContent = '';
  }
  console.log(document.getElementsByTagName('input')[0].value);
  myLogIn = document.getElementsByTagName('input')[0].value;
  document.querySelector('#staticBackdrop > div > div > div.modal-footer > button').click();
  // document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div').classList.toggle('visually-hidden');
  contentLoad();
});

// конец обработчика инпута в хедаре

// Обработчик модельного окна
document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (document.querySelector('body > div.d-grid.gap-1 > div > div').childNodes.length) {
      document.querySelector('body > div.d-grid.gap-1 > div > div').textContent = '';
    }
    console.log(document.getElementsByTagName('input')[1].value);
    myLogIn = document.getElementsByTagName('input')[1].value;
    document.querySelector('#staticBackdrop > div > div > div.modal-footer > button').click();
    document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div').classList.toggle('visually-hidden');
    contentLoad();
  }
});

document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > button').addEventListener('click', () => {
  if (document.querySelector('body > div.d-grid.gap-1 > div > div').childNodes.length) {
    document.querySelector('body > div.d-grid.gap-1 > div > div').textContent = '';
  }
  console.log(document.getElementsByTagName('input')[1].value);
  myLogIn = document.getElementsByTagName('input')[1].value;
  document.querySelector('#staticBackdrop > div > div > div.modal-footer > button').click();
  document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div').classList.toggle('visually-hidden');
  contentLoad();
});
// конец обработчика модельного окна
function contentLoad() {
  fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/show/`)
    .then((response) => response.json())
    .then((cats) => {
      document
        .querySelector('body > div > div > div')
        .insertAdjacentHTML(
          'afterbegin',
          cats.map((cat) => getCatHTMLv2(cat)).join(''),
        );
    });
}

const getCatHTMLv2 = (cat) => `<div class="col">
<div class="card shadow-sm">
<img class="card-img-top" src="${cat.image}" alt="Card image cap">
  <div class="card-body">
    <div class="card-text">${cat.description}</div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-primary">Редактировать</button>
      </div>
    </div>
  </div>
</div>
</div>`;
// ZholobovSS
// Yanlex
