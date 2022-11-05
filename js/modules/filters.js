export function makeFiltr(clients, key) {                                                            // сортировка от большего к меньшего и обратно
  let filtrClients = [];
  filtrClients = clients.sort(function(a,b) {
    if (a[key] > b[key]) return -1;
  });
  return {
    filtrClients
  }
}

export function makeBackFiltr(clients, key) {                                                       
  let filtrClients = [];
  filtrClients = clients.sort(function(a,b) {
    if (a[key] < b[key]) return -1;
  });
  return {
    filtrClients
  }
}

export function makeFiltrName(clients, name, sureName, secondName) {                                // сортировка если однофамильцы
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

export function makeBackFiltrName(clients, name, sureName, secondName) {
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