
const array = ["Walt", "Anastasia", "Diego", "Pablo", "Violeta"];
const term = ("V");

const filterByTerm = (array, term) => array.filter(array => array.toLowerCase().includes(term.toLowerCase()));

console.log(filterByTerm(array, term));


/*
const array = ["Walt", "Anastasia", "Santiago", "Pablo", "Violeta"];
const term = "W";

function filterByTerm(array, term) {
    return array.filter(function(array) {
      return array.toLowerCase().includes(term.toLowerCase());
    });
  }
  
  console.log(filterByTerm(array, term)); 
  */
/*
  const array = ["Walt","Diego","Juan","Lionel"]
  const term = "W"

  const string = (array,term)=> array.filter((array=> typeof array == 'string'))

  console.log(string(array,term))
*/