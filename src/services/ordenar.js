function ordenar(equipments, ordemBy, ordemAlfabetica, date) {
  equipments.sort((a, b) => {
    if (date) {
      a = a[ordemBy].split("/").reverse().join("");
      b = b[ordemBy].split("/").reverse().join("");
    }
    else {
      a = a[ordemBy];
      b = b[ordemBy];
    }

    function sortOrdem(a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    }//função que ordena itens de um array

    return (
      ordemAlfabetica ? sortOrdem(a, b) : -sortOrdem(a, b)
    )
  });
  return equipments;
}// logica da ordenação (alfabetica ou inversa)

export default ordenar;
