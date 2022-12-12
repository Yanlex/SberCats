let myLogIn = '';
const insideBodyContent = document.querySelector('body > div.d-grid.gap-1 > div > div');
// кнопка закрыть у первого модального окна
const modalCloseButton = document.querySelector('#staticBackdrop > div > div > div.modal-footer > button');
// username в хедаре
const headerUserName = document.querySelector('body > div.d-grid.gap-1 > header > div > div > form > div');
// Добавить котика
const addCatButton = document.querySelector('#addСatForm > div > div > form > div.modal-footer > button.btn.btn-primary');
let oneCat = {};
// fetch запрос
let myFetch = {};
// Модальное окно при загрузке сайта
function ready() {
  setTimeout(() => {
    document.querySelector('body > div.d-grid.gap-1 > header > div > div > div > button').classList.toggle('visually-hidden');
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
    document.querySelector('body > div.d-grid.gap-1 > header > div > div > div > button').classList.toggle('visually-hidden');
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
      document.querySelector('body > div.d-grid.gap-1 > div > div.row')
        .insertAdjacentHTML(
          'afterbegin',
          cats.map((cat) => getCatHTMLv2(cat)).join(''),
        );
    });
}

// https://cats.petiteweb.dev/api/single/yanlex/show/1
async function getOneCatInfo(el) {
  fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/show/${el}`)
    .then((response) => response.json())
    .then((cat) => {
      oneCat = cat;
      document.querySelector('#exampleModalToggle2 > div > div > div.modal-body').insertAdjacentHTML('afterbegin', `<div class="col">
        <span class="visually-hidden">${cat.id}</span>
        <div class="card shadow-sm">
        <div class="imageChangeSize">
        <img class="rounded img-thumbnail" src="${cat.image}" alt="Card image cap"></div>
          <div class="card-body">
          <p class="h4">Моя кличка: ${cat.name}</p>
          <div class="d-grid gap-3">
          </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
            </div>
          </div>
        </div>
        </div>`);
    }).then(() => changeCatCard());

  function changeCatCard() {
    if (oneCat.age) {
      if (oneCat.age > 4 || oneCat.age === 0) {
        document.querySelector('#exampleModalToggle2 > div > div > div.modal-body > div > div > div.card-body > div.d-flex.justify-content-between.align-items-center.mt-2').insertAdjacentHTML('afterbegin', `
        <div class="p-2 bg-light border">Мне: ${oneCat.age} лет</div>
        `);
      } else if (oneCat.age === 1) {
        document.querySelector('#exampleModalToggle2 > div > div > div.modal-body > div > div > div.card-body > div.d-flex.justify-content-between.align-items-center.mt-2').insertAdjacentHTML('afterbegin', `
        <div class="p-2 bg-light border">Мне: ${oneCat.age} год</div>
        `);
      } else if (oneCat.age > 1 && oneCat.age < 5) {
        document.querySelector('#exampleModalToggle2 > div > div > div.modal-body > div > div > div.card-body > div.d-flex.justify-content-between.align-items-center.mt-2').insertAdjacentHTML('afterbegin', `
        <div class="p-2 bg-light border">Мне: ${oneCat.age} года</div>
        `);
      }
    }
    if (oneCat.favorite) {
      document.querySelector('#exampleModalToggle2 > div > div > div.modal-body > div > div > div.card-body > div.d-flex.justify-content-between.align-items-center.mt-2').insertAdjacentHTML('afterbegin', `
      <div class="p-2 bg-light border">Я любимчик</div>
      `);
    }

    if (oneCat.rate) {
      document.querySelector('#exampleModalToggle2 > div > div > div.modal-body > div > div > div.card-body').insertAdjacentHTML('beforeEnd', `<div class="p-2 bg-light border">Мой рейтинг: ${oneCat.rate}<div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${oneCat.rate * 10}%"></div>
    </div></div>
      `);
    }

    if (oneCat.description) {
      document.querySelector('#exampleModalToggle2 > div > div > div.modal-body > div > div > div.card-body').insertAdjacentHTML('beforeEnd', `<div class="p-2 bg-light border">${oneCat.description}</div>
      `);
    }
  }
}
// конец Получаем котиков
// получаем котика для модального окна, информация о котике по клику
// Шаблон карточек при выводе всех котиков на главной
const getCatHTMLv2 = (cat) => `<div class="col" value="${cat.id}">
<span class="visually-hidden" id="catIdSpan">${cat.id}</span>
<div class="card shadow-sm">
<div class="imageChangeSize">
<img class="rounded img-thumbnail" src="${cat.image}" alt="Card image cap"></div>
  <div class="card-body">
  <p class="h3">${cat.name}</p>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="btn-group">
        <button type="button" class="btn btn-sm btn-outline-primary">Редактировать</button>
      </div>
    </div>
  </div>
</div>
</div>`;

// document.addEventListener('click', (e) => console.log(e.target));
// вызов модального окна при клике на карточку котика
document.querySelectorAll('body > div.d-grid.gap-1 > div > div ').forEach((el) => {
  el.addEventListener('click', (el) => {
    if (document.querySelector('#exampleModalToggle2 > div > div > div.modal-body').childNodes.length) {
      document.querySelector('#exampleModalToggle2 > div > div > div.modal-body').textContent = '';
    }
    document.querySelector('body > button:nth-child(7)').click();
    getOneCatInfo(el.target.closest('.col').childNodes[1].textContent);
  });
});
