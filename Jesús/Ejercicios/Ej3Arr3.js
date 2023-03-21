/*3- Tu reto es retornar un array solo con las palabras que cumplan con la condición de tener un término de búsqueda dado.

Para solucionarlo vas a encontrar crea una función que recibe los siguientes parámetros de entrada:

array: Un array de strigs con palabras
term: Un string con el término a buscar*/

const names = ["Jesús", "Matemáticas", "Jarra", "Jugo", "Verificar"];
const initial = ("J");

const filterByTerm = (names, initial,) => names.filter(names => names.toUpperCase().includes(initial.toUpperCase()));


console.log(filterByTerm(names, initial));
