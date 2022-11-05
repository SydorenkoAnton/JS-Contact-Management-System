export function MakeValidation(input) {                                     // проверяем на заполнение поля инпутов
  if (input.value.trim() === '') {                                          // если инпут пустой или только с пробелами
    input.style.background = "#E6E6FA"                                      // подкрашиваем инпут
    const walidation = false;                                               // переменная которая не дает отправить данные на сервер
    return walidation
  } else {
    const walidation = true;                                                // инпут не пустой даем разрешение на отправку данных на сервер
    return walidation
  }
}

// Валидация контактов
export function MakeContactValidation() {                                   // проверяем на заполнение поля инпутов в контактах
  const contactBlock = document.getElementById('change__contacts');         // ищем блок с контактами
  let contacts = contactBlock.querySelectorAll("input")                     // берем все инпуты с контактов
  let walidation = true
  contacts.forEach(function (contact) {                                     // проверяем все инпуты с контактов
    if (contact.value.trim() === '') {                                      // если инпут пустой или только с пробелами
      contact.style.background = "#E6E6FA"                                  // подкрашиваем инпут
      walidation = false;                                                   // переменная которая не дает отправить данные на сервер
    } 
  })
  return walidation
}