/*
1- Tienes un array de números entre positivos y negativos, tu reto es retornar un objeto con el número de veces que aparece un número.

<code>
Input: [1, 2, 2, 3, 3, 3]
Output: {  1: 1,   2: 2,   3: 3 }
</code>
*/

const number = [1, 2, 3, 2, -1, -1, 0];

function countNumber(number) {
    let result = {};
    for (let i = 0; i < number.length; i++) {
      
      if (result[number[i]]) {
        result[number[i]]+=1;
      } else {
        result[number[i]] = 1;
      }
    }
    return result;
  }
  
  console.log(countNumber(number));