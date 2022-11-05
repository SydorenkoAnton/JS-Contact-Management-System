// удаление клиента
export function delClient (id) {
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

export function exitDel(btn, modalDelate) {
  btn.addEventListener("click", () =>{
    modalDelate.style.display = "none";
  });
}