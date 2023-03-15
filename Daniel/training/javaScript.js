// Variables dentron de JS

//const
/* const name = 'Daniel';
name = 'jesus'
console.log(name); */

//let 
/* let name = 'jesus';
name = 'Daniel'; */
/* if(true){
    let name = 'Walt'
    console.log(name);
}
console.log(name); */


//var  
/* if(true){
    console.log(name);
}
var name = 'Walt'
console.log(name);
var name = 'Daniel'; */

//If

//else

//else if

//switc
/* const age = 5

switch (age) {
    case 25:
        console.log('Su edad es 25');
    break;
    case 32:
        console.log('Su edad es 32');
    break
    default:
        console.log('su edad no se encuentra en las opciones');
} */
//try- catch
//finally

/* try{
    const word = 5;
    const data = 'mi nombre es Daniel y vengo de aracataca'
    console.log(data.includes(word))
}catch(e){
    console.log('Hubo un error en la ejecución', e);
}finally{
    console.log('El algoritmo a terminado')
} */


/* function responseApi(obj) {
    const response = { succes: false, error: '', data: '' }
    try {
        if (typeof obj.name !== 'string') {
            throw new Error('el nombre debe ser un tipo de dato String')
        }
        if (typeof obj.age !== 'number') {
            throw new Error('la edad debe ser un tipo de dato Numero')
        }
        response.succes = true;
        response.data = `Se ha creado el registro con nombre ${obj.name} y edad ${obj.age}`
    } catch (e) {
        response.succes = false;
        response.error = e;
    } finally {
        return response;
    }
}

const obj = { name: 'Daniel', age: '25' }
console.log(responseApi(obj)) */

/* const array = [];
array.push(25,35,25,35,40,25,80,75,15,35);
array.push('Daniel', true)
array.push({ name: 'Daniel', age: 25 })

console.log(array) */
/* const map = array.map((rs)=>{
    if(typeof rs === 'number'){
        return rs*2;
    }else{
        return rs
    }
}) */
//console.log(map)
/* array.pop()
console.log(array)
array.shift()
console.log(array)

array.unshift(90)
console.log(array) */

/*const filters =  array.filter((rs)=> typeof rs == 'number' )
console.log(filters)

const reduce = array.reduce((total, rs)=> {
    if (typeof rs == 'number'){
        if(total[rs]){
            total[rs] += 1
        }else{
            total[rs] = 1
        }
    }
    return total
},{})
console.log(reduce)*/

/* const obj = {};
obj['Name'] = 'Daniel'
obj['age'] = 25
obj['gender'] = 'man'
 */
/* console.log(obj)

console.log(Object.keys(obj))
console.log(Object.values(obj)) */

/* for (const key in obj){
    console.log(`${key}: ${obj[key]}`)
} */
/* 
function dataWord(s,b){
    return s.includes(b)
}

console.log(dataWord('Daniel es e un estudiante de ingenieria','Daniel')) */

/* 
const number = [3,9,5,12,4,21];

const number3 =  (n)=> n.filter((s=>  s % 3 == 0))

console.log(number3(number)) */

/* const array = [1,true,2,3,'Daniel','2',5]

const numbers = (n)=> n.filter((s =>  typeof s == 'number'))
console.log(numbers(array)) */


/* const reduce = array.reduce((total, rs)=> {
    if (typeof rs == 'number'){
        if(total[rs]){
            total[rs] += 1
        }else{
            total[rs] = 1
        }
    }
    return total
},{}) */

const number = [3,9,9,9,9,5,5,12,4,21];

function countNumber(numbers){
    const response = {};
    for(let i=0; i < numbers.length; i++){
        if(response[numbers[i]]){
            response[numbers[i]] += 1
        }else{
            response[numbers[i]] = 1
        }
    }
    return response
}

console.log(countNumber(number))