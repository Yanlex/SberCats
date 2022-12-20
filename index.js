let myLogIn = '';

// Модальное окно, добавить кота
//   Кнопка закрыть
const $addCatModalCloseButton = document.querySelector('[data-cat-card-modal-add-close-button]');
//   Кнопка в хедаре сохранить котика
const $addCatButton = document.querySelector('[data-modal-add-cat-save-button]');

const $insideBodyContent = document.querySelector('[data-wrapper]');
// кнопка закрыть у первого модального окна
const $modalCloseButton = document.querySelector('[data-cat-info-open-button]');
// Инпут в хедаре
const $headerUserName = document.querySelector('[data-cat-loginheader-input]');

// Кнопка в хедаре добавить котика
const $catModalAddCatButton = document.querySelector('[data-cat-modal-add-cat-button]');
// Инпут в хедаре
const $headerLoginInput = document.querySelector('[data-header-login-input]');
// Кнопка ОК в хедаре
const $headerLoginOkButton = document.querySelector('[data-header-login-ok-button]');
// Карточка котика
const $firstModalLoginInput = document.querySelector('[data-first-modal-login-input]');
// Страница редактировать котика
const $firstModalLoginOkButton = document.querySelector('[data-first-modal-login-ok-button]');
const $catEditModalSecondSendButton = document.querySelector('[data-cat-edit-modal-second-send-button]'); // кнопка отправить

// Кнопка редактировать краточку на главной
const $catCardOpenEdit = document.querySelector('[data-cat-open-edit]');

// тело модального окна, информация о котике
const $modalCatInfoFirst = document.querySelector('[data-modal-first-cat-info]'); // первая карточка
const $modalCatInfoSecond = document.querySelector('[data-modal-second-cat-info]'); // вторая карточка, с редактированием
const $modalCatEditSecondCloseButton = document.querySelector('[data-cat-edit-modal-close-button]');

// Кнопка удаления котика
const $catDelete = document.querySelector('[data-cat-delete]');

let oneCat = {};
const catUpdate = {
  name: '',
  image: 'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
  age: 4,
  rate: 5,
  favorite: false,
  description: '',
};
// fetch запрос
let myFetch = {};
let catID = 0;
// Вызов модального окна при загрузке сайта
function ready() {
  setTimeout(() => {
    $catModalAddCatButton.classList.toggle('visually-hidden');
    document.querySelector('body').insertAdjacentHTML(
      'afterbegin',
      '     <!-- Button trigger modal --><button data-first-login-pop type="button" class="btn btn-primary visually-hidden" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Как вас зовут?</button>',
    );
  });
  setTimeout(() => {
    document.querySelector('body > button').click();
  });
}

document.addEventListener('DOMContentLoaded', ready);

// document.querySelector('#staticBackdrop > div > div > div.modal-body > form > div > button');

// Обработчик инпута в хедаре
$headerLoginInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if ($insideBodyContent.childNodes.length) {
      $insideBodyContent.textContent = '';
    }
    myLogIn = document.getElementsByTagName('input')[0].value;
    $modalCloseButton.click();
    getAllCats();
  }
});
// обработчик кнопки ОК в хедаре
$headerLoginOkButton.addEventListener('click', () => {
  if ($insideBodyContent.childNodes.length) {
    $insideBodyContent.textContent = '';
  }
  myLogIn = document.getElementsByTagName('input')[0].value;
  $modalCloseButton.click();
  getAllCats();
});

// Обработчик модального окна при загрузке
$firstModalLoginInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    if ($insideBodyContent.childNodes.length) {
      $insideBodyContent.textContent = '';
    }
    myLogIn = document.getElementsByTagName('input')[1].value;
    $modalCloseButton.click();
    $headerUserName.classList.toggle('visually-hidden');
    $catModalAddCatButton.classList.toggle('visually-hidden');
    getAllCats();
  }
});

$firstModalLoginOkButton.addEventListener('click', () => {
  if ($insideBodyContent.childNodes.length) {
    $insideBodyContent.textContent = '';
  }
  myLogIn = document.getElementsByTagName('input')[1].value;
  $modalCloseButton.click();
  $headerUserName.classList.toggle('visually-hidden');
  getAllCats();
});

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

// Обрабочик добавления котика
async function postAddCat(data) {
  return await fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/add/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  }).then(() => localStorage.setItem(`${myFetch.id}`, JSON.stringify(data))).then(() => {
    $insideBodyContent.textContent = '';
    getAllCats(myLogIn);
  });
}

async function catAddModalAddButton(event) {
  event.preventDefault();
  serializeForm(event.target);
  return await postAddCat(myFetch);
}

const addCatForm = document.querySelector('#addCat');
addCatForm.addEventListener('submit', catAddModalAddButton); // Модалка добавить кота, кнопка Добавить

// Получаем котиков
async function getAllCats() {
  if ($insideBodyContent.childNodes.length) {
    $insideBodyContent.textContent = '';
  }
  try {
    const response = await fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/show/`)
    const cats = await response.json()
    cats.forEach((cat) => {
      localStorage.setItem(`${cat.id}`, JSON.stringify(cat));
      document.querySelector('[data-wrapper]').insertAdjacentHTML('afterbegin', getCatHTMLv2(cat));
    });
  } catch (error) {
    console.log(error)
  }
}

// https://cats.petiteweb.dev/api/single/yanlex/show/1
async function getOneCatInfo(el) {
  fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/show/${el}`)
    .then((response) => response.json())
    .then((cat) => {
      oneCat = cat;
      $modalCatInfoFirst.insertAdjacentHTML('afterbegin', `<div class="col">
        <span class="visually-hidden">${cat.id}</span>
        <div class="card shadow-sm">
        <div class="imageChangeSize">
        <img class="rounded img-thumbnail" src="${cat.image}" alt="Card image cap"></div>
          <div class="card-body">
          <p class="h4">${cat.name}</p>
          <div class="d-grid gap-3">
          </div>

          </div>
        </div>
        </div>`);
      $modalCatInfoSecond.insertAdjacentHTML('afterbegin', `<div class="col">
        <span class="visually-hidden">${cat.id}</span>
        <form id="updateCatForm" name="updateCatForm">
        <div class="d-grid gap-3">
  <div class="p-2 bg-light border"><input class="form-control" id="cat-image-update" name="cat-image-update" type="text" placeholder="${cat.image}" value="${cat.image}" aria-label="default input example"></div>
  <div class="p-2 bg-light border"><input class="form-control" id="cat-age-update" name="cat-age-update" type="number" placeholder="Возраст: ${cat.age}" value="${cat.age}" aria-label="default input example"></div>
  <div class="p-2 bg-light border"><input class="form-control" id="cat-rate-update" name="cat-rate-update" type="text" placeholder="Рейтинг: ${cat.rate}" value="${cat.rate}" aria-label="default input example"></div>
  <div class="p-2 bg-light border"><textarea class="form-control" id="cat-description-update" name="cat-description-update" placeholder="Описание: ${cat.description}"  id="floatingTextarea">${cat.description}</textarea></div>
            <div class="position-relative">
  <div class="position-absolute top-0 start-50 translate-middle-x">
    <div class="form-check mb-3">
      <input class="form-check-input fs-6" type="checkbox" value="${cat.favorite}" value="${cat.favorite}" id="cat-fav-update" name="cat-fav-update">
      <label class="form-check-label badge bg-primary text-wrap fs-6" for="cat-fav-update">
        Это любимый котик?
      </label>
    </div>
  </div>
</div>
  </div>
      </form>
        </div>`);
      if (document.querySelector('#cat-fav-update').value === 'true') {
        document.querySelector('#cat-fav-update').checked = true;
      }
      document.querySelector('#cat-fav-update').addEventListener('click', () => {
        if (document.querySelector('#cat-fav-update').checked) {
          document.querySelector('#cat-fav-update').value = 'true';
        }
        if (!document.querySelector('#cat-fav-update').checked) {
          document.querySelector('#cat-fav-update').value = 'false';
        }
      });

      catUpdate.name = cat.name;
      catUpdate.image = cat.image;
      catUpdate.age = cat.age;
      catUpdate.rate = cat.rate;
      catUpdate.favorite = cat.favorite;
      catUpdate.description = cat.description;
    }).then(() => changeCatCard());

  function changeCatCard() {
    if (oneCat.age) {
      if (oneCat.age > 4 || oneCat.age === 0) {
        $modalCatInfoFirst.insertAdjacentHTML('beforeEnd', `
        <div class="p-2 bg-light border">Возраст: ${oneCat.age} лет</div>
        `);
      } else if (oneCat.age === 1) {
        $modalCatInfoFirst.insertAdjacentHTML('beforeEnd', `
        <div class="p-2 bg-light border">Возраст: ${oneCat.age} год</div>
        `);
      } else if (oneCat.age > 1 && oneCat.age < 5) {
        $modalCatInfoFirst.insertAdjacentHTML('beforeEnd', `
        <div class="p-2 bg-light border">Возраст: ${oneCat.age} года</div>
        `);
      }
    }
    if (oneCat.favorite) {
      $modalCatInfoFirst.insertAdjacentHTML('beforeEnd', `
      <div class="p-2 bg-light border">Я любимчик</div>
      `);
    }

    if (oneCat.rate) {
      $modalCatInfoFirst.insertAdjacentHTML('beforeEnd', `<div class="p-2 bg-light border">Рейтинг: ${oneCat.rate}<div class="progress">
      <div class="progress-bar bg-success" role="progressbar" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${oneCat.rate * 10}%"></div>
    </div></div>
      `);
    }

    if (oneCat.description) {
      $modalCatInfoFirst.insertAdjacentHTML('beforeEnd', `<div class="p-2 bg-light border">${oneCat.description}</div>
      `);
    }
  }
}
// конец Получаем котиков
// получаем котика для модального окна, информация о котике по клику
// Шаблон карточек при выводе всех к
const getCatHTMLv2 = (cat) => `<div class="col" value="${cat.id}" id="cat-id${cat.id}">
<span class="visually-hidden" id="catIdSpan">${cat.id}</span>
<div class="card shadow-sm h-100">
<div class="imageChangeSize">
<img class="rounded img-thumbnail" src="${cat.image}" alt="Card image cap"></div>
  <div class="card-body">
  <p class="h3">${cat.name}</p>
  <div class="p-2 bg-light border">Рейтинг: ${cat.rate}<div class="progress">
  <div class="progress-bar bg-success" role="progressbar" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: ${cat.rate * 10}%"></div>
</div></div>
<div class="p-2 bg-light border">${cat.description}</div>
<div class="">

    </div>
  </div>
</div>
</div>`;

// document.addEventListener('click', (e) => console.log(e.target));

// вызов модального окна при клике на карточку кота
document.querySelectorAll('[data-wrapper]').forEach((el) => {
  el.addEventListener('click', (els) => {
    if ($modalCatInfoFirst.childNodes.length) {
      $modalCatInfoFirst.textContent = '';
    }
    if ($modalCatInfoSecond.childNodes.length) {
      $modalCatInfoSecond.textContent = '';
    }

    document.querySelector('[data-cat-open-info]').click();
    catID = els.target.closest('.col').childNodes[1].textContent;
    getOneCatInfo(els.target.closest('.col').childNodes[1].textContent);
  });
});

$addCatButton.addEventListener('click', (event) => {
  $addCatModalCloseButton.click();
});

// Обработчик кнопки удаления котика
$catDelete.addEventListener('click', (event) => {
  $catCardOpenEdit.click();
  delCat();
  document.getElementById(`cat-id${catID}`).remove();
  localStorage.removeItem(`${catID}`);
});

async function delCat() {
  fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/delete/${catID}`, {
    method: 'DELETE',
  });
}

// -------------------------------- Редактировать котика
$catEditModalSecondSendButton.addEventListener('click', () => {
  if (document.getElementById('cat-image-update').value) {
    catUpdate.image = document.getElementById('cat-image-update').value;
  }
  if (document.getElementById('cat-age-update').value) {
    catUpdate.age = document.getElementById('cat-age-update').value;
  }
  if (document.getElementById('cat-rate-update').value) {
    catUpdate.rate = document.getElementById('cat-rate-update').value;
  }
  if (document.querySelector('#cat-fav-update').value) {
    catUpdate.favorite = document.querySelector('#cat-fav-update').value;
  }
  if (document.getElementById('cat-description-update').value) {
    catUpdate.description = document.getElementById('cat-description-update').value;
  }
  const myJSON = JSON.stringify(catUpdate);

  // Simple PUT request with a JSON body using fetch
  // Обновляем котика
  const element = document.querySelector('#put-request .date-updated');
  const putUpdateCatInfo = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(catUpdate),
  };
  fetch(`https://cats.petiteweb.dev/api/single/${myLogIn}/update/${catID}`, putUpdateCatInfo)
    .then((response) => response.json())
    .then((data) => element.innerHTML = data.updatedAt)
    .catch((console.error()));
  $modalCatEditSecondCloseButton.click();
});
// слушаю id инпут при добавлении котика, првоеряю свободен ли id
document.querySelector('#cat-id').addEventListener('keyup', (event) => {
  if (!localStorage.getItem(document.querySelector('#cat-id').value)) {
    document.querySelector('#cat-id').classList.remove('text-bg-danger');
    document.querySelector('#cat-id').classList.add('text-bg-success');
  } else {
    document.querySelector('#cat-id').classList.remove('text-bg-success');
    document.querySelector('#cat-id').classList.add('text-bg-danger');
  }
});
