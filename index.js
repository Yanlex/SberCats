let myLogIn = '';
const insideBodyContent = document.querySelector('body > div.d-grid.gap-1 > div > div');
// кнопка закрыть у первого модального окна
const modalCloseButton = document.querySelector('#staticBackdrop > div > div > div.modal-footer > button');
// username в хедаре
const headerUserName = document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div');
// Модальное окно при загрузке сайта
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
// конец

// document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > button');

// Обработчик инпута в хедаре
document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div > input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (insideBodyContent.childNodes.length) {
      insideBodyContent.textContent = '';
    }
    console.log(document.getElementsByTagName('input')[0].value);
    myLogIn = document.getElementsByTagName('input')[0].value;
    modalCloseButton.click();
    // document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div').classList.toggle('visually-hidden');
    contentLoad();
  }
});

document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div > button').addEventListener('click', () => {
  if (insideBodyContent.childNodes.length) {
    insideBodyContent.textContent = '';
  }
  console.log(document.getElementsByTagName('input')[0].value);
  myLogIn = document.getElementsByTagName('input')[0].value;
  modalCloseButton.click();
  // document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div').classList.toggle('visually-hidden');
  contentLoad();
});

// конец

// Обработчик модального окна при загрузке
document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > input').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if (insideBodyContent.childNodes.length) {
      insideBodyContent.textContent = '';
    }
    console.log(document.getElementsByTagName('input')[1].value);
    myLogIn = document.getElementsByTagName('input')[1].value;
    modalCloseButton.click();
    headerUserName.classList.toggle('visually-hidden');
    contentLoad();
  }
});

document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > button').addEventListener('click', () => {
  if (insideBodyContent.childNodes.length) {
    insideBodyContent.textContent = '';
  }
  console.log(document.getElementsByTagName('input')[1].value);
  myLogIn = document.getElementsByTagName('input')[1].value;
  modalCloseButton.click();
  headerUserName.classList.toggle('visually-hidden');
  contentLoad();
});
// конец

// Получаем котиков
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
// конец Получаем котиков

// Шаблон карточек при выводе всех котиков на главной
const getCatHTMLv2 = (cat) => `<div class="col">
<div class="card shadow-sm">
<img class="card-img-top" src="${cat.image}" alt="Card image cap">
  <div class="card-body">
  <p class="h3">${cat.name}</p>
    <div class="card-text">${cat.description}</div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-primary">Редактировать</button>
      </div>
    </div>
  </div>
</div>
</div>`;
// конец
// ZholobovSS
// Yanlex
