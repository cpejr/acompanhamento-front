function ordenar(data, ordemBy, ordemAlfabetica, date) {
  data.sort((row1, row2) => {

    if (date) {
      row1 = new Date(row1[ordemBy]);
      row2 = new Date(row2[ordemBy]);
    }
    else {
      row1 = row1[ordemBy] ? row1[ordemBy].toLowerCase() : "";
      row2 = row2[ordemBy] ? row2[ordemBy].toLowerCase() : ""
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
      ordemAlfabetica ? sortOrdem(row1, row2) : -sortOrdem(row1, row2)
    )
  });
  return data;
}// logica da ordenação (alfabetica ou inversa)

export default ordenar;
