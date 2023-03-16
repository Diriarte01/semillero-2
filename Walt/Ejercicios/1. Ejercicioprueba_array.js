/*
const number = [2,2,2,4,5,3,-8,-8,-7]

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
*/

const numbers = [1, 1, 1, 2, 3, 3, -4, -4, -5, -6, -7, -8, -8]
function countNumber(numbers) {
    const count = {};
    for (let w = 0; w < numbers.lenght; w++) {
        if (count[numbers[w]]) {
            count[numbers[w]] += 1;
        } else {
            count[numbers[w]] = 1;
        }
    }
    return count;
}
console.log(countNumber(numbers));