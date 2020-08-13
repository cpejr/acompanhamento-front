import React, { useState } from 'react';

const CreatePeople = {
  "people": [
    {
      id: "15",
      funcao: "Administrador",
      lastactive: "15/08/2019",
      name: "Maiara",
      birth: "07/07/2000",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "15",
      funcao: "Administrador",
      lastactive: "15/07/2008",
      name: "Antonio",
      birth: "5555555",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "15",
      funcao: "Cliente",
      lastactive: "27/02/2020",
      name: "Juliana",
      birth: "1111111",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "15",
      funcao: "Funcionário",
      lastactive: "10/08/2020",
      name: "Arthur",
      birth: "07/07/2000",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "15",
      funcao: "Cliente",
      lastactive: "10/08/2020",
      name: "Joao",
      birth: "07/07/2000",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "15",
      funcao: "Administrador",
      lastactive: "10/08/2020",
      name: "Jota",
      birth: "51515151",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "17",
      funcao: "Funcionário",
      lastactive: "01/08/2020",
      name: "Izabela",
      birth: "50/50/05",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "15",
      funcao: "Cliente",
      lastactive: "10/08/2020",
      name: "Talles",
      birth: "07/07/8844",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
    {
      id: "16",
      funcao: "Administrador",
      lastactive: "05/08/2020",
      name: "Pedro",
      birth: "02/02/2000",
      adress: "blablabla",
      cpf: "515151511", //CPF unico
      email: "jsabduasud",
      phone: "98989898",
    },
  ]
}

function Testes() {
  const [users, setUsers] = useState(OrdenamentoInicial); // guarda usuarios
  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true); // define ordem (true/false)


  function Ordenar() {
    const usersOrdem = users;

    usersOrdem.sort((a, b) => (
      ordemAlfabetica ? -sortOrdem(a, b) : sortOrdem(a, b)
    ));

    setUsers(usersOrdem);
    setOrdemAlfabetica(!ordemAlfabetica);
  }

  function OrdenamentoInicial() {
    const usersOrdem = CreatePeople.people;

    usersOrdem.sort((a, b) => sortOrdem(a, b));

    return usersOrdem;
  }

  function sortOrdem(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.name}>{user.name}</li>)
        )}
      </ul>

      <br />

      <button onClick={Ordenar} >
        Ordenar {ordemAlfabetica ? "->" : "<-"}
      </button>
    </div >
  );
}

export default Testes;
