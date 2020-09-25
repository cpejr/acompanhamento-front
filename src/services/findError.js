export default function findError(type, content) {
  switch (type) {
    case "email":
      const regEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regEmail.test(content);

    case "password":
      const reSenha = /^[A-Za-z]\w{7,14}$/;
      return reSenha.test(content);

    case "cpf/cnpj":
      const reCpfCnpj = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/g;
      return reCpfCnpj.test(content);

    default:
      return "";
  }
}
