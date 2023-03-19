const entrada = [1, 2, 2, 3, 3, 3]
function countNumbers(arry1) {
    let counts = {};
    for (let i = 0; i < arry1.length; i++) {
      let num = arry1[i];
      if (counts[num]) {
        counts[num]++;
      } else {
        counts[num] = 1;
      }
    }
    return counts;
}
console.log(countNumbers(entrada))




const array=[
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

  function sumOrders(arr){
    let cont=0;
    for(let i=0;i<arr.length;i++){
      cont+=arr[i].total;
    }
    return cont;
  }
console.log(sumOrders(array))



const arra =["ana", "santi", "nico", "anastasia"]
const term ="ana"
function filtreWords(arra,term){
    const array2 = arra.filter(word => word.includes(term))
    return array2
}
console.log(filtreWords(arra,term))

