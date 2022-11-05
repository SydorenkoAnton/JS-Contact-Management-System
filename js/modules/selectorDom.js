let contactsNumber = 0;

export function makeNewContacts() {
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

function makeSelectFunction(optionContainer, selected, opinion) {
  const OptionText = opinion.textContent,
        selectedText = selected.textContent;
  opinion.textContent = selectedText;
  selected.textContent = OptionText;
  optionContainer.classList.remove("active");
}