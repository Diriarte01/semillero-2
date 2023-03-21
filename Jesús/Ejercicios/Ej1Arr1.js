/* Ejercicios de JavaScript


1- Tienes un array de números entre positivos y negativos, tu reto es retornar un objeto con el número de veces que aparece un número.

<code>
Input: [1, 2, 2, 3, 3, 3]
Output: {  1: 1,   2: 2,   3: 3 }
</code>*/

const number = [1,1,2,2,3,3,5,5,5,6,6,6,-1,-1,-1,-1];
function countNumber(number){
    const count = {};
    for(let i = 0; i < number.length; i++){
        if(count[number[i]]){
            count[number[i]]+=1;
        }else{
            count[number[i]] = 1;
        }
}
    return count;
}
console.log(countNumber(number));