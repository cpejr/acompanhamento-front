// verifica se a data digitada é válida
export default function isValidDate(date) {

  if (date === undefined || 
      date === "") // proteção contra bad_argument
    return false;

  let day   = date.split('/')[0];
  let month = date.split('/')[1];
  let year  = date.split('/')[2];

  if (day   === undefined   ||  
      month === undefined   || 
      year  === undefined
  ) return false;

  if (day.length   === 0  ||  day.length   > 2 ||
      month.length === 0  ||  month.length > 2 ||
      year.length  !== 4
  ) return false;
  
  if (parseInt(day)   <= 0     ||  parseInt(day) > 31    ||
      parseInt(month) <= 0     ||  parseInt(month) > 12  ||
      parseInt(year)  <= 1900  ||  parseInt(year) > 2050
  ) return false; 

  return true;
}