/*
1- Tienes un array de números entre positivos y negativos, tu reto es retornar un objeto con el número de veces que aparece un número.

<code>
Input: [1, 2, 2, 3, 3, 3]
Output: {  1: 1,   2: 2,   3: 3 }
</code> 

*/

console.log("*********primer ejercicio***********")
const array = [1, 2, 2, 3, 3, 3];

function countsN(array){
  let nums ={};
  let count ={};
  for(let i = 0; i<array.length;i++){
    let num = array[i];
    if(count[num]){
      count[num] ++;
   }  else{
      count[num] = 1;
   }   

  }
   return count;
}

console.log(countsN(array));


 console.log("*********segundo ejercicio***********")

 const orders = [
    {
      customerName: "Nicolas",
      total: 100,
      delivered: true,
    },
    {
      customerName: "Zulema",
      total: 120,
      delivered: false,
    },
    {
      customerName: "Santiago",
      total: 20,
      delivered: false,
    }
  ]


    function purchaseOrder(orders){

    let totalOrders = orders.reduce((sum, value) => ( sum + value.total ), 0);
    console.log(totalOrders);

 }
    purchaseOrder(orders);


    console.log("*********tercer ejercicio***********")


    const arrayTerms = ["ana", "santi", "nico", "anastasia"];
    const newTerms = [];
    const termSearch = "ana";

    function filter(array,termSearch){
    const newTerms = arrayTerms.filter(term=> term.includes(termSearch));     
    return(newTerms);
    }
    
    console.log(filter(array,termSearch));