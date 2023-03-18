/*
3- Tu reto es retornar un array solo con las palabras que cumplan con la condición de tener un término de búsqueda dado.

Para solucionarlo vas a encontrar crea una función que recibe los siguientes parámetros de entrada:

array: Un array de strigs con palabras
term: Un string con el término a buscar

<code>
Input: array: ["ana", "santi", "nico", "anastasia"] term: "ana"
Ouput: ["ana", "anastasia"]
</code>
*/

const array = ["Walt", "Anastasia", "Diego", "Pablo", "Violeta"];
const term = ("V");

const filterByTerm = (array, term) => array.filter(array => array.toLowerCase().includes(term.toLowerCase()));

console.log(filterByTerm(array, term));
