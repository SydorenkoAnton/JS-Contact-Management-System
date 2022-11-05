import {setUpToolTip} from './modules/tooltip.js';
import {getNames, getMakingDate, getMakingTime, getContacs} from './modules/halpingTable.js';
import {MakeValidation, MakeContactValidation} from './modules/validation.js';
import {delClient} from './modules/delClient.js';
import {makeNewContacts, makeSelectorDOM} from './modules/Selekt.js';
import {makeFiltr, makeBackFiltr, makeFiltrName, makeBackFiltrName} from './modules/filters.js';

let clients = [];                                                           // переменная для массива с клиентами

function makeTableString (client) {                                         // заполняем строку информацией по клиенту
  const tableBlock = document.getElementById('clients'),                    // создаем новую строку в таблице
        row = document.createElement('ul'),
        id = document.createElement('li'),
        fullname = document.createElement('li'),
        createDate = document.createElement('li'),
        createTime = document.createElement('span'),
        lastUpdateDate = document.createElement('li'),
        lastUpdateTime = document.createElement('span'),
        contacts = document.createElement('li'),
        buttons = document.createElement('li');
  
  id.textContent = client.id;                                             // заполняем ячейки  
  fullname.textContent = getNames(client);
  createDate.textContent = getMakingDate(client.createdAt);
  createTime.textContent = getMakingTime(client.createdAt);
  lastUpdateDate.textContent = getMakingDate(client.updatedAt);
  lastUpdateTime.textContent = getMakingTime(client.updatedAt);
  row.classList = "table__line";
  id.classList = "table__Cell-id";
  fullname.classList = "table__Cell-fullname";
  createDate.classList = "table__Cell-creatdate";
  lastUpdateDate.classList = "table__Cell-lastupd";
  contacts.classList = "table__Cell-contacts";
  buttons.classList = "table__Cell-btns";
  createTime.classList = "error";
  lastUpdateTime.classList = "error";
  createDate.append(createTime);
  lastUpdateDate.append(lastUpdateTime);
  contacts.append(getContacs(client));

  const changeButton = document.createElement('button'),                   // создаем кнопки
        deleteButton = document.createElement('button');
  changeButton.classList = "table__change-btn btn-reset";
  changeButton.innerHTML = `
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10.5V13H2.5L9.87333 5.62662L7.37333 3.12662L0 10.5ZM11.8067 3.69329C12.0667 3.43329 12.0667 3.01329 11.8067 2.75329L10.2467 1.19329C9.98667 0.933291 9.56667 0.933291 9.30667 1.19329L8.08667 2.41329L10.5867 4.91329L11.8067 3.69329Z" fill="#9873FF"/>
    </svg>
    Изменить
  `
  deleteButton.classList = "table__del-btn btn-reset";
  deleteButton.innerHTML = `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#F06A4D"/>
    </svg>
    Удалить
  `
  changeButton.addEventListener("click", () => {                          // при клике открываем модальное окно
    makeChengeModal(id.textContent);
  })
  deleteButton.addEventListener("click", () => {                          // при клике удаляем строку
    delClient (id.textContent)
  })
  buttons.append(changeButton)
  buttons.append(deleteButton)
  row.append(id);
  row.append(fullname);
  row.append(createDate);
  row.append(lastUpdateDate);
  row.append(contacts);
  row.append(buttons);
  tableBlock.append(row);
}

async function makeChengeModal(id = 0) {                                    // модальное окно
  const modalWindow = document.getElementById('change__modal'),             // находим элементы модального окна
        modalExit = document.getElementById('change__btn-exit'),
        changeId = document.getElementById('change__id'),
        changeSereName = document.getElementById('change__sureName'),
        changeName = document.getElementById('change__name'),
        changeLastName = document.getElementById('change__lastName'),
        changeDivContakts = document.getElementById('change__contacts'),
        saveBatton = document.querySelector(".change__btn-save"),
        delBatton = document.querySelector(".change__btn-del"),
        changeTitle = document.getElementById('modal__title'),
        errorDescr = document.querySelector(".change__walidation"),
        divContakts = changeDivContakts.querySelectorAll(".line"),
        changeBtnContakts = document.getElementById('change__btn-contacts');

  if (changeDivContakts.offsetHeight > 280) {                              // проверяем высоту блока с контактами
    changeDivContakts.classList.add('change__contacts-scroll')             // если > 280 добавляем скрол
  } 
  changeBtnContakts.disabled = divContakts.length >= 10;                   // проверяем количество контактов
  if (divContakts.length < 10) {                                           // если >= 10 закрываем кнопку добавления контактов
    changeBtnContakts.disabled = false;                                    // если < 10 открываем кнопку добавления контактов
  }

  changeSereName.addEventListener("input", () => {                         // убираем закрашивание с инпутов
    changeSereName.style.background = "#fff";
    errorDescr.textContent = '';
  }); 
  changeName.addEventListener("input", () => {
    changeName.style.background = "#fff";
    errorDescr.textContent = '';
  });
  errorDescr.textContent = '';                                             // даем титул если модальное окно для "Изменить данные"
  if (id !== 0) {
    changeTitle.textContent = "Изменить данные";

    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {method: 'GET'}); // берем данные для заполнения модального окна
    const client = await response.json();
    changeSereName.value = client.surname;
    changeName.value = client.name;
    changeLastName.value = client.lastName;
    delBatton.innerHTML = 'Удалить клиента';
    modalWindow.style.display = "block";
    changeId.textContent = id;
    for (let contact of client.contacts) {
      makeSelectorDOM(changeDivContakts, contact.type, contact.value)
    }
  }

  modalExit.addEventListener("click", () =>{                               // при выходе с модального окна чистим поля
    modalWindow.style.display = "none";
    changeDivContakts.innerHTML = '';
  });

  if (id === 0) {
    modalWindow.style.display = "block";
    changeTitle.innerText = "Новый клиент";                                // даем титул если модальное окно для "Новый клиент"
    changeId.parentNode.style.display = "none";
    changeSereName.value = '';
    changeName.value = '';
    changeLastName.value = '';
    delBatton.innerHTML = 'Отмена';
  }

  saveBatton.addEventListener("click", async () =>{                        // при клике на "Изменить данные" или "Новый клиент"
    const validSereName = MakeValidation(changeSereName);                  // проверяем валидацию
    const validName = MakeValidation(changeName);
    const validContact = MakeContactValidation();
    if (validSereName === true && validName === true && validContact === true) { // если валидация true создаем массив с клиентом
      let newStudentContacts = [];
      const messedgers = changeDivContakts.querySelectorAll(".line")
      messedgers.forEach(function (messedger) {
        const messedgerType = messedger.querySelector(".selected"),
              messedgerValue = messedger.querySelector(".contact__input");
        let newContact = {};
        newContact.type = messedgerType.innerText;
        newContact.value = messedgerValue.value;
        newStudentContacts.push(newContact)
        console.log(newStudentContacts)
      })
      if (changeTitle.innerText === "Изменить данные") {                         // в зависимости от титула меняем данные или создаем нового клиента
        const respons = await fetch(`http://localhost:3000/api/clients/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            name: changeName.value,
            surname: changeSereName.value,
            lastName: changeLastName.value,
            contacts: newStudentContacts
          })
        });
      };
      if (changeTitle.innerText === "Новый клиент") {
        console.log(id)
        const respons = await fetch(`http://localhost:3000/api/clients/`, {
          method: 'POST',
          body: JSON.stringify({
            name: changeName.value,
            surname: changeSereName.value,
            lastName: changeLastName.value,
            contacts: newStudentContacts
          })
        });
      };
    };
  })
  delBatton.addEventListener("click", () => {                         // в зависимости от титула удаляем клиента или закрываем окно
    if (changeTitle.innerText === "Изменить данные") {
      delClient (id)
    }
    if (changeTitle.innerText === "Новый клиент") {
      modalWindow.style.display = "none";
      changeDivContakts.innerHTML = '';
    }
  })

  modalWindow.addEventListener("click", function(e) {                 // закрываем окно
    if (e.target == modalWindow) {
      modalWindow.style.display = "none";
    }
  })
}

function titleArrow(titles) {                                          // функционал титулов     
  const title = document.getElementById(titles),                       // находим титул  
        tableBlock = document.getElementById('clients'),               // находим таблицу 
        arrowTitles = document.querySelectorAll('.hero__table-title'); // находим стрелку направления
  let filterDir = 1,                                                   // направление фильтра
      filtrClients = [];
  title.addEventListener('click', () => {                              // при клике убираем активный класс с других стрелок                     
    for (let arrowTitle of arrowTitles) {
      if (arrowTitle.id !== `titles`) {
        arrowTitle.classList.remove(`hero__table-${arrowTitle.id}-active`);
      }
    }
    if (filterDir === 1) {                                             // в зависимости от направления фильтра даем или убираем активный класс     
      title.classList.add(`hero__table-${titles}-active`)
    } else {
      title.classList.remove(`hero__table-${titles}-active`)
    }
    filterDir = - filterDir;
    if(titles=='title1') {                                             // в зависимости от направления фильтруем массив       
      if (filterDir === 1) {
        filtrClients = makeBackFiltr(clients, "id").filtrClients;
      } else {
        filtrClients = makeFiltr(clients, 'id').filtrClients;
      }
    } else if (titles=='title2') {
      if (filterDir === 1) {
        filtrClients = makeFiltrName(clients, "name", "sureName", "secondName").filtrClients;
      } else {
        filtrClients = makeBackFiltrName(clients, "name", "sureName", "secondName").filtrClients;
      }
    } else if (titles=='title3') {
      if (filterDir === 1) {
        filtrClients = makeFiltr(clients, "createdAt").filtrClients;
      } else {
        filtrClients = makeBackFiltr(clients, 'createdAt').filtrClients;
      }
    } else {
      if (filterDir === 1) {
        filtrClients = makeFiltr(clients, "updatedAt").filtrClients;
      } else {
        filtrClients = makeBackFiltr(clients, 'updatedAt').filtrClients;
      }
    } 
    tableBlock.innerHTML = '';                                          // заполняем таблицу отфильтрованным массивом   
    for (let client of filtrClients) {
      makeTableString (client)
    }
    setUpToolTip()
  });
  if(titles=='title2') {                                              // в зависимости от направления фильтра меняем буквы в титуле ФИО   
    title.addEventListener('click', () => {
      const tittleLetters = document.getElementById("title2__letters");
      const letters = tittleLetters.innerText;
      let splitString = letters.split("");
      let reversLetters = splitString.reverse();
      let joinLetters = reversLetters.join("")
      tittleLetters.innerText = joinLetters
    });
  }
}

function seachClient() {                                             // поиск   
  const tableBlock = document.getElementById('clients'),
        searchInput = document.getElementById('header__input');
  let timeout = null;
  searchInput.addEventListener("input", (e) => {                     // при вводе данных в инпут через 1000 генерируем новый массив из сервера 
    const value = e.currentTarget.value
    clearTimeout(timeout)
    timeout = setTimeout(async () => {
      const response = await fetch(`http://localhost:3000/api/clients?search=${value}`);
      const data = await response.json(); 
      console.log(data);
      tableBlock.innerHTML = '';
      for (let client of data) {
        makeTableString (client)
      }
      setUpToolTip()
    }, 1000);
  });
}

function addClient() {                                               // при клике на добавить клиента открываем модальное окно
  const addButton = document.querySelector('.hero__add-button'),
        id = 0;
  addButton.addEventListener("click", () => {
    makeChengeModal(id)
  })
}

async function loadClients() {                                       // заполняем таблицу при загрузке страницы
  const response = await fetch('http://localhost:3000/api/clients');
  response.onload = async () => {
    console.log(10)
  }
  const data = await response.json();
  clients = makeBackFiltr(data, "id").filtrClients;
  console.log(clients);
  for (let client of clients) {
    makeTableString (client)
  }
  const preload = document.querySelector(".loadingio-spinner-eclipse-5c6fcsearps"); // пока таблица не заполнена показываем прелоад
  preload.style.display = "none"
  setUpToolTip()
}

makeNewContacts()
const [title1, title2, title3, title4] = ['title1', 'title2', 'title3', 'title4'];
titleArrow(title1)
titleArrow(title2)
titleArrow(title3)
titleArrow(title4)
seachClient()
addClient()
loadClients()

