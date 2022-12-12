let myLogIn = '';
const insideBodyContent = document.querySelector('body > div.d-grid.gap-1 > div > div');
// кнопка закрыть у первого модального окна
const modalCloseButton = document.querySelector('#staticBackdrop > div > div > div.modal-footer > button');
// username в хедаре
const headerUserName = document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div');
// Добавить котика
const addCatButton = document.querySelector('#addСatForm > div > div > form > div.modal-footer > button.btn.btn-primary');
// fetch запрос
let myFetch = {};
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
    myLogIn = document.getElementsByTagName('input')[0].value;
    modalCloseButton.click();
    contentLoad();
  }
});

document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div > button').addEventListener('click', () => {
  if (insideBodyContent.childNodes.length) {
    insideBodyContent.textContent = '';
  }
  myLogIn = document.getElementsByTagName('input')[0].value;
  modalCloseButton.click();
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
  myLogIn = document.getElementsByTagName('input')[1].value;
  modalCloseButton.click();
  headerUserName.classList.toggle('visually-hidden');
  contentLoad();
});
// конец

// Обработчик добавить котика https://doka.guide/js/deal-with-forms/
function serializeForm(formNode) {
  const { elements } = formNode;

  const data = Array.from(elements)
    .map((element) => {
      const { name, type } = element;
      const value = type === 'checkbox' ? element.checked : element.value;

      return { name, value };
    })
    .filter((item) => !!item.name);

  const myCatObj = {
    id: data[0].value,
    name: data[1].value,
    image: data[2].value,
    age: data[3].value,
    rate: data[4].value,
    favorite: data[6].value,
    description: data[5].value,
  };
  myFetch = myCatObj;
}

async function sendData(data) {
  console.log(data);
  return await fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const data = serializeForm(event.target);

  const response = await sendData(myFetch);
}

const addCatForm = document.querySelector('#addCat');
addCatForm.addEventListener('submit', handleFormSubmit);
//

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
// {
//   "id": 1,
//   "name": "Имя котика",
//   "image": "Ссылка на изображение",
//   "age": 0,
//   "rate": 0,
//   "favorite": false,
//   "description": ""
// }
// data[0].value
// 0
// :
// {name: 'cat-id', value: ''}
// 1
// :
// {name: 'cat-name', value: ''}
// 2
// :
// {name: 'cat-image', value: ''}
// 3
// :
// {name: 'cat-age', value: ''}
// 4
// :
// {name: 'floatingSelect', value: 'Оценить котика'}
// 5
// :
// {name: 'cat-description', value: ''}
// 6
// :
// {name: 'cat-fav', value: false}
