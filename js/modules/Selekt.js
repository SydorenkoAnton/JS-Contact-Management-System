let contactsNumber = 0;

export function makeNewContacts() {                                              // создание новой строки с контактами
  const changeDivContakts = document.getElementById('change__contacts'),         // находим блок с контактами
    changeBtnContakts = document.getElementById('change__btn-contacts');         // находим кнопку для добавления новых строк
    changeBtnContakts.addEventListener("click", () =>{                           // при клике создаем новую строку с селектом и инпутом
    makeSelectorDOM(changeDivContakts);
    if (changeDivContakts.offsetHeight > 280) {                                  // если высота блока после добавления строки > 280, добавляем скрол
      changeDivContakts.classList.add('change__contacts-scroll')
    } 
    let divContakts = changeDivContakts.querySelectorAll(".line")                // если строк > 10, даем кнопке disabled
    changeBtnContakts.disabled = divContakts.length >= 10
  })
}


export function makeSelectorDOM(changeDivContakts, type = "телефон", value = '') {  // создание селекта
  let contactBlock = document.createElement('div');                              // создание обертку
  contactsNumber = ++ contactsNumber;                                            // счетчик
  contactBlock.id = contactsNumber + 'contact';                                  // даем id
  const selectBlock = document.createElement('div'),                             // создаем элементы 
        optionContainer = document.createElement('div'),
        optionVK = document.createElement('button'),
        optionFB = document.createElement('button'),
        optionEmail = document.createElement('button'),
        optionOther = document.createElement('button'),
        selected = document.createElement('button');
  let vkontakte = "vkontakte",                                                    // текст в кнопках
      facebook = "Facebook",
      email = "Email",
      other = "другое",
      phon = "телефон";

  if (type === "vkontakte") {                                                     // меняем текст если type != "телефон"
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

  optionContainer.append(optionVK);                                              // групируем
  optionContainer.append(optionFB);
  optionContainer.append(optionEmail);
  optionContainer.append(optionOther);
  optionContainer.classList = "option-container";                                // класс для блока селекта
  selected.textContent = phon;                                                   // даем текст выбраному селекту
  selected.classList = "selected btn-reset";                                     // даем класс выбраному селекту
  selectBlock.classList = "select__block"                                        // даем класс блоку селекта
  selectBlock.append(optionContainer);                                           // групируем
  selectBlock.append(selected);

  let hoverClick = 1;
  selected.addEventListener("click", () =>{                                      // при клике на селект
    const allSelectes = changeDivContakts.querySelectorAll(".option-container"); 
    if (hoverClick === 1) {
      for (let select of allSelectes) {                                          // закрываем остальные селекты
        select.classList.remove("active")
      }
    }
    optionContainer.classList.toggle("active");                                  // открываем-закрываем нужный селект
    if (hoverClick === 1) {
      optionVK.focus();                                                          // перемещаем фокус блок-кнопка
    } else {
      selected.focus();
    } 
    hoverClick = - hoverClick;
  })

  const inputBlock = document.createElement('div'),
        delButton = document.createElement('button'),                            // создаем кнопку удаления строки
        errorDescr = document.querySelector(".change__walidation"),              // находим блок с описанием валидации
        input = document.createElement('input');                                 // создаем инпут
  input.classList = "contact__input";
  input.type = "text";
  input.placeholder = "Введите данные контакта";
  input.value = value;

  // if (input.value !== '') {
  //   delButton.style.opacity = 1;
  // }
  input.addEventListener("input", () => {                                         //при заполнении инпута убираем закрас и текст ошибки
    input.style.background = "#F4F3F6";
    errorDescr.textContent = '';
    // delButton.style.opacity = 1;
  }); 

  if (selected.textContent =="телефон") {                                         //добавляем маску
    let im = new Inputmask('+7(999) 999-99-99');
    im.mask(input);
  }

  optionVK.textContent = vkontakte;                                               //при клике внутри селекта меняем текст
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

  delButton.classList = "contact__btn-exit btn-reset";                                   //кнопка удаления строки
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

  delButton.addEventListener("click", () => {                                            // при клике удаляем строку и проверяем высоту
    lineContact.parentNode.removeChild(lineContact);                                     // если < 260 - убераем скрол
    const changeBtnContakts = document.getElementById('change__btn-contacts');
    changeBtnContakts.disabled = false;
    if (changeDivContakts.offsetHeight < 260 && changeDivContakts.classList == 'change__contacts-scroll'){
      changeDivContakts.classList.remove('change__contacts-scroll');
    }
  })
  inputBlock.classList = "input__block";                                                 //групируем
  inputBlock.append(input);
  inputBlock.append(delButton);

  const lineContact = document.createElement('div');
  lineContact.classList = "line"
  lineContact.append(selectBlock);
  lineContact.append(inputBlock);

  changeDivContakts.append(lineContact);
}

function makeSelectFunction(optionContainer, selected, opinion) {                        //меняем текст и закрываем блок инпута при клике
  const OptionText = opinion.textContent,
        selectedText = selected.textContent;
  opinion.textContent = selectedText;
  selected.textContent = OptionText;
  optionContainer.classList.remove("active");
}