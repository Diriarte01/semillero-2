const number = [1,1,2,2,3,3,5,5,5,6,6,6,-1,-1,-1,-1];
console.log(number.length);
console.log(number);
let count = 0;
let aux = number.sort();
console.log(aux);

for (let i = 0; i < number.length; i++) {

    if (aux[i] === -1) {
        count++;
    }
}
console.log(count);