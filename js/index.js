let clients = [],
    contactsNumber = 0;

    // ТАБЛИЦА
// для таблицы - имя
function getNames(client) {
  const clientName = client.surname + ' ' + client.name + ' ' + client.lastName;
  return clientName;
}

// для таблицы - дата создания
function giveZero(number) {
  if(number < 10) number = "0" + number;
  return number;
}

function getMakingDate(client) {
  let startDate = new Date(client);
  let [month, day, year] = [startDate.getMonth(), startDate.getDate(), startDate.getFullYear()];
  day = giveZero(day);
  month = ++month;
  month = giveZero(month);
  const fullDate = `${day}` + '.' + `${month}` + '.' + `${year}`
  return fullDate;
}
// для таблицы - время создания
function getMakingTime(client) {
  let startDate = new Date(client);
  let [hours, minutes] = [startDate.getHours(), startDate.getMinutes()];
  hours = giveZero(hours);
  minutes = giveZero(minutes);
  const fullTime = `${hours}` + ':' + `${minutes}`
  return fullTime;
}

function makeContact(contact) {
  const contactLink = document.createElement('a');
  contactLink.classList = "table__contakts";
  if (contact.type == 'vkontakte') {
    contactLink.href = `${contact.value}`
    contactLink.datatooltip = `<span class='table__contakts-descr'>vk: </span><a class='table__contakts-link'>${contact.value}</a>`;
    contactLink.innerHTML = `
      <svg class="table__contakts-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/>
      </svg>
    `;
  }
  if (contact.type == 'телефон') {
    contactLink.href = `tel:${contact.value}`
    contactLink.datatooltip = `<a class='table__contakts-tel' style="width: 110px">${contact.value}</a>`;
    contactLink.innerHTML = `
      <svg class="table__contakts-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
          <circle cx="8" cy="8" r="8" fill="#9873FF"/>
          <path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/>
        </g>
      </svg>
    `;
  }
  if (contact.type == 'Facebook') {
    contactLink.href = `${contact.value}`
    contactLink.datatooltip = `<span class='table__contakts-descr'>fb: </span><a class='table__contakts-link'>${contact.value}</a>`;
    contactLink.innerHTML = `
      <svg class="table__contakts-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/>
      </svg>
    `;
  }
  if (contact.type == 'Email') {
    contactLink.href = `mailto:${contact.value}`
    contactLink.datatooltip = `<span class='table__contakts-descr'>email: </span><a class='table__contakts-link'>${contact.value}</a>`;
    contactLink.innerHTML = `
      <svg class="table__contakts-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/>
      </svg>
    `;
  }
  if (contact.type == 'другое') {
    contactLink.href = `${contact.value}`
    contactLink.datatooltip = `<span class='table__contakts-descr'>email: </span><a class='table__contakts-link'>${contact.value}</a>`;
    contactLink.innerHTML = `
      <svg class="table__contakts-svg" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/>
      </svg>
    `;
  }
  return contactLink;
}

// для таблицы - создаем контакты
function getContacs(client) {
  const contactBlock = document.createElement('div'),
        contactBtn = document.createElement('button'),
        contactDisabledBlockDexcr = document.createElement('div');
  contactBlock.classList = "table__contacts-block";
  contactBtn.classList = "contacts__btn";
  contactDisabledBlockDexcr.classList = "table__disable-descr";
  let contactsCounter = 0;
  let filtrContacts = makeFiltrContacts(client.contacts).filtrContacts
  for (let contact of filtrContacts) {
    let contactLink;
    if (contactsCounter < 4) {
      contactLink = makeContact(contact);
      contactBlock.append(contactLink);
    } 
    if (contactsCounter == 4){
      contactBtn.append(contactDisabledBlockDexcr)
      contactBlock.append(contactBtn);
    } 
    if (contactsCounter >= 4){
      let contaktsDisableIndex = contactsCounter - 3;
      contactDisabledBlockDexcr.textContent = '+' + contaktsDisableIndex;
      contactLink = makeContact(contact);
      let disableContacts = []
      disableContacts.push(contactLink)
      contactBtn.addEventListener("click", () => {
        contactBtn.style.display = 'none'
        for (contact of disableContacts) {
          contactBlock.append(contact)
        }
      })
    }

    contactsCounter = ++contactsCounter;
  }
  return contactBlock
}

function makeTableString (client) {
  const tableBlock = document.getElementById('clients'),
        row = document.createElement('ul'),
        id = document.createElement('li'),
        fullname = document.createElement('li'),
        createDate = document.createElement('li'),
        createTime = document.createElement('span'),
        lastUpdateDate = document.createElement('li'),
        lastUpdateTime = document.createElement('span'),
        contacts = document.createElement('li'),
        buttons = document.createElement('li');
  
  id.textContent = client.id;
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

  const changeButton = document.createElement('button'),
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
  changeButton.addEventListener("click", () => {
    makeChengeModal(id.textContent);
  })
  deleteButton.addEventListener("click", () => {
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

async function makeChengeModal(id = 0) {
  const modalWindow = document.getElementById('change__modal'),
        modalExit = document.getElementById('change__btn-exit'),
        changeId = document.getElementById('change__id'),
        changeSereName = document.getElementById('change__sureName'),
        changeName = document.getElementById('change__name'),
        changeLastName = document.getElementById('change__lastName'),
        changeDivContakts = document.getElementById('change__contacts'),
        saveBatton = document.querySelector(".change__btn-save"),
        delBatton = document.querySelector(".change__btn-del"),
        changeTitle = document.getElementById('modal__title'),
        errorDescr = document.querySelector(".change__walidation");
  console.log(50);
  changeSereName.addEventListener("input", () => {
    changeSereName.style.background = "#fff";
    errorDescr.textContent = '';
  }); 
  changeName.addEventListener("input", () => {
    changeName.style.background = "#fff";
    errorDescr.textContent = '';
  });
  errorDescr.textContent = '';
  if (id !== 0) {
    changeTitle.textContent = "Изменить данные";
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {method: 'GET'});
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

  modalExit.addEventListener("click", () =>{
    modalWindow.style.display = "none";
    changeDivContakts.innerHTML = '';
  });

  if (id === 0) {
    modalWindow.style.display = "block";
    changeTitle.innerText = "Новый клиент";
    changeId.parentNode.style.display = "none";
    changeSereName.value = '';
    changeName.value = '';
    changeLastName.value = '';
    delBatton.innerHTML = 'Отмена';
  }

  saveBatton.addEventListener("click", async () =>{
    const validSereName = MakeValidation(changeSereName);
    const validName = MakeValidation(changeName);
    const validContact = MakeContactValidation();
    if (validSereName === true && validName === true && validContact === true) {
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
      if (changeTitle.innerText === "Изменить данные") {
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
  delBatton.addEventListener("click", () => {
    if (changeTitle.innerText === "Изменить данные") {
      delClient (id)
    }
    if (changeTitle.innerText === "Новый клиент") {
      modalWindow.style.display = "none";
      changeDivContakts.innerHTML = '';
    }
  })

  modalWindow.addEventListener("click", function(e) {
    if (e.target == modalWindow) {
      modalWindow.style.display = "none";
    }
  })
}

// удаление клиента
function delClient (id) {
  const modalDelate = document.getElementById('del__modal'),
  btnDelate = document.getElementById("del__btn"),
  exitDelate = document.getElementById("del__btn-exit"),
  backDelate = document.getElementById("del__btn-back");
  modalDelate.style.display = "block";
  btnDelate.addEventListener("click", () =>{
    const respons = fetch(`http://localhost:3000/api/clients/${id}`, {
      method: 'DELETE'
    });
  });
exitDel(exitDelate, modalDelate);
exitDel(backDelate, modalDelate);
}

function exitDel(btn, modalDelate) {
  btn.addEventListener("click", () =>{
    modalDelate.style.display = "none";
  });
}

function makeNewContacts() {
  const changeDivContakts = document.getElementById('change__contacts'),
    changeBtnContakts = document.getElementById('change__btn-contacts');
    changeBtnContakts.addEventListener("click", () =>{
    makeSelectorDOM(changeDivContakts);
    if (changeDivContakts.offsetHeight > 280) {
      changeDivContakts.classList.add('change__contacts-scroll')
    } 
    let divContakts = changeDivContakts.querySelectorAll(".line")
    changeBtnContakts.disabled = divContakts.length >= 10
  })
}
makeNewContacts()

// Фильтры
function makeFiltr(clients, key) {
  let filtrClients = [];
  filtrClients = clients.sort(function(a,b) {
    if (a[key] > b[key]) return -1;
  });
  return {
    filtrClients
  }
}

function makeBackFiltr(clients, key) {                                                        // сортировка в обратную сторону
  let filtrClients = [];
  filtrClients = clients.sort(function(a,b) {
    if (a[key] < b[key]) return -1;
  });
  return {
    filtrClients
  }
}

function makeFiltrName(clients, name, sureName, secondName) {                                // сортировка если однофамильци
  let filtrClients = [];
  filtrClients = clients.sort(function(a,b) {
    if (a[sureName] == b[sureName] && a[name] == b[name]) {
      if (a[secondName] > b[secondName]) return -1;
    } else if (a[sureName] == b[sureName]) {
      if (a[name] > b[name]) return -1;
    } else {
      if (a[sureName] > b[sureName]) return -1;
    }
  });
  return {
    filtrClients
  }
}

function makeBackFiltrName(clients, name, sureName, secondName) {
  let filtrClients = [];
  filtrClients = clients.sort(function(a,b) {
    if (a[sureName] == b[sureName] && a[name] == b[name]) {
      if (a[secondName] < b[secondName]) return -1;
    } else if (a[sureName] == b[sureName]) {
      if (a[name] < b[name]) return -1;
    } else {
      if (a[sureName] < b[sureName]) return -1;
    }
  });
  return {
    filtrClients
  }
}

function makeFiltrContacts(contacts) {
  let filtrContacts = [];
  filtrContacts = contacts.sort(function(a,b) {
    if (a["type"] < b["type"]) return -1;
  });
  return {
    filtrContacts
  }
}

function titleArrow(titles) {
  const title = document.getElementById(titles),
        tableBlock = document.getElementById('clients'),
        arrowTitles = document.querySelectorAll('.hero__table-title');
  let filterDir = 1,
      filtrClients = [];
  title.addEventListener('click', async () => {
    for (let arrowTitle of arrowTitles) {
      if (arrowTitle.id !== titles) {
        arrowTitle.classList.remove(`hero__table-${arrowTitle.id}-active`);
      }
    }
    title.classList.toggle(`hero__table-${titles}-active`);
    filterDir = - filterDir;
    if(titles=='title1') {
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
    tableBlock.innerHTML = '';
    for (let client of filtrClients) {
      makeTableString (client)
    }
    setUpToolTip()
  });
  if(titles=='title2') {
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

const [title1, title2, title3, title4] = ['title1', 'title2', 'title3', 'title4'];

titleArrow(title1)
titleArrow(title2)
titleArrow(title3)
titleArrow(title4)

// поиск

function seachClient() {
  const tableBlock = document.getElementById('clients'),
        searchInput = document.getElementById('header__input');
  let timeout = null;
  searchInput.addEventListener("input", (e) => {
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

seachClient()

function addClient() {
  const addButton = document.querySelector('.hero__add-button'),
        id = 0;
  addButton.addEventListener("click", () => {
    makeChengeModal(id)
  })
}

addClient()

// загружаем с сервера студентов, наполняем таблицу
async function loadClients() {
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
  const preload = document.querySelector(".loadingio-spinner-eclipse-5c6fcsearps");
  preload.style.display = "none"
  setUpToolTip()
}
loadClients()

// ТУЛТИПЫ
function setUpToolTip() {
  let tooltip = '',
      toolTipDiv = document.createElement('div'),
      toolTipRelative = document.createElement('div'),
      toolTipElements = document.querySelectorAll(".table__contakts"),
      timer;

  toolTipRelative.classList.add("tooltip__relative");
  toolTipDiv.classList.add("div__tooltip");
  toolTipDiv.append(toolTipRelative);

  let displayTooltip = function(e, obj) {
      tooltip = obj.datatooltip;
      toolTipDiv.innerHTML = tooltip;
      fadeIn(toolTipDiv);
      let height = toolTipDiv.offsetHeight;
      let width = toolTipDiv.offsetWidth/2;
      console.log(height);
      toolTipDiv.style.top = - height - 30 + "px";
      toolTipDiv.style.left = - width - 13 + "px";
  };

  let fadeOut = function (element) {
    let op = 1;
    if (!timer) {
      timer = setInterval(function () {
        if (op<= 0.1) {
            clearInterval(timer);
            timer = null;
            element.style.opacity = 0;
            element.style.display = "none"
        }
        element.style.opacity = op;
        op -= op * 0.1;
      }, 10);
    }
  };

  let fadeIn = function (element) {
    let op = 0.1;
    element.style.display = 'flex';
    let timer = setInterval(function () {
        if (op>= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += op * 0.1;
    }, 10)
  };

  toolTipElements.forEach(function (elem) {
    let timeout;
    elem.addEventListener("mouseenter", function(e){
      let that = this;
      elem.append(toolTipDiv);
      timeout = setTimeout(function () {
        displayTooltip(e, that);
      }, 400)
    });
    elem.addEventListener("mouseleave", function(e){
      clearTimeout(timeout)
      fadeOut(toolTipDiv)
    })
    elem.addEventListener("focus", function(e){
      let that = this;
      elem.append(toolTipDiv);
      timeout = setTimeout(function () {
        displayTooltip(e, that);
      }, 400)
    });
    elem.addEventListener('blur', function(e){
      clearTimeout(timeout)
      fadeOut(toolTipDiv)
    })
  })
}

function makeSelectorDOM(changeDivContakts, type = "телефон", value = '') {
  let contactBlock = document.createElement('div');
  contactsNumber = ++ contactsNumber;
  contactBlock.id = contactsNumber + 'contact';

  const selectBlock = document.createElement('div'),
        optionContainer = document.createElement('div'),
        optionVK = document.createElement('button'),
        optionFB = document.createElement('button'),
        optionEmail = document.createElement('button'),
        optionOther = document.createElement('button'),
        selected = document.createElement('button');
  let vkontakte = "vkontakte",
      facebook = "Facebook",
      email = "Email",
      other = "другое",
      phon = "телефон";

  if (type === "vkontakte") {
    vkontakte = "телефон";
    phon = "vkontakte";
  }
  if (type === "Facebook") {
    facebook = "телефон";
    phon = "Facebook";
  }
  if (type === "Email") {
    email = "телефон";
    phon = "Email";
  }
  if (type === "другое") {
    other = "телефон";
    phon = "другое";
  }

  optionContainer.append(optionVK);
  optionContainer.append(optionFB);
  optionContainer.append(optionEmail);
  optionContainer.append(optionOther);
  optionContainer.classList = "option-container";
  selected.textContent = phon;
  selected.classList = "selected btn-reset";
  selectBlock.classList = "select__block"
  selectBlock.append(optionContainer);
  selectBlock.append(selected);

  let hoverClick = 1
  selected.addEventListener("click", () =>{
    const allSelectes = changeDivContakts.querySelectorAll(".option-container");
    if (hoverClick === 1) {
      for (let select of allSelectes) {
        select.classList.remove("active")
      }
    }
    optionContainer.classList.toggle("active");
    if (hoverClick === 1) {
      optionVK.focus();
    } else {
      selected.focus();
    } 
    hoverClick = - hoverClick;
  })

  const inputBlock = document.createElement('div'),
        delButton = document.createElement('button'),
        errorDescr = document.querySelector(".change__walidation"),
        input = document.createElement('input');
  input.classList = "contact__input";
  input.type = "text";
  input.placeholder = "Введите данные контакта";
  input.value = value;

  if (input.value !== '') {
    delButton.style.opacity = 1;
  }
  input.addEventListener("input", () => {
    input.style.background = "#F4F3F6";
    errorDescr.textContent = '';
    delButton.style.opacity = 1;
  }); 

  if (selected.textContent =="телефон") {
    let im = new Inputmask('+7(999) 999-99-99');
    im.mask(input);
  }

  optionVK.textContent = vkontakte;
  optionVK.classList = "option btn-reset";
  optionVK.addEventListener("click", () => {
    makeSelectFunction(optionContainer, selected, optionVK);
    if (selected.textContent !=="телефон") {
      if (input.inputmask) { input.inputmask.remove(); }
    }
  })

  optionFB.textContent = facebook;
  optionFB.classList = "option btn-reset";
  optionFB.addEventListener("click", () => {
    makeSelectFunction(optionContainer, selected, optionFB);
    if (selected.textContent !=="телефон") {
      if (input.inputmask) { input.inputmask.remove(); }
    }
  })

  optionEmail.textContent = email;
  optionEmail.classList = "option btn-reset";
  optionEmail.addEventListener("click", () => {
    makeSelectFunction(optionContainer, selected, optionEmail);
    if (selected.textContent !=="телефон") {
      if (input.inputmask) { input.inputmask.remove(); }
    }
  })

  optionOther.textContent = other;
  optionOther.classList = "option btn-reset";
  optionOther.addEventListener("click", () => {
    makeSelectFunction(optionContainer, selected, optionOther);
    if (selected.textContent !=="телефон") {
      if (input.inputmask) { input.inputmask.remove(); }
    }
  })

  delButton.classList = "contact__btn-exit btn-reset";
  delButton.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_224_6681)">
        <path class='table__contakts-btn' d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/>
      </g>
      <defs>
        <clipPath id="clip0_224_6681">
          <rect width="16" height="16" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  `;

  delButton.addEventListener("click", () => {
    lineContact.parentNode.removeChild(lineContact);
    const changeBtnContakts = document.getElementById('change__btn-contacts');
    changeBtnContakts.disabled = false;
    if (changeDivContakts.offsetHeight < 260 && changeDivContakts.classList == 'change__contacts-scroll'){
      changeDivContakts.classList.remove('change__contacts-scroll');
    }
  })
  inputBlock.classList = "input__block";
  inputBlock.append(input);
  inputBlock.append(delButton);

  const lineContact = document.createElement('div');
  lineContact.classList = "line"
  lineContact.append(selectBlock);
  lineContact.append(inputBlock);

  changeDivContakts.append(lineContact);
}

// работа селекта
function makeSelectFunction(optionContainer, selected, opinion) {
  const OptionText = opinion.textContent,
        selectedText = selected.textContent;
  opinion.textContent = selectedText;
  selected.textContent = OptionText;
  optionContainer.classList.remove("active");
}

// Валидация инпутов
function MakeValidation(input) {
  if (input.value.trim() === '') { 
    input.style.background = "#E6E6FA"
    const walidation = false;
    return walidation
  } else {
    const walidation = true;
    return walidation
  }
}

// Валидация контактов
function MakeContactValidation() {
  const contactBlock = document.getElementById('change__contacts');
  let contacts = contactBlock.querySelectorAll("input")
  let walidation = true
  contacts.forEach(function (contact) {
    if (contact.value.trim() === '') { 
      contact.style.background = "#E6E6FA"
      walidation = false;
    } 
  })
  return walidation
}
