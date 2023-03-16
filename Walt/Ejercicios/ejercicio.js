const num = [1,2,3,1,2,3,1,2]
function count (num){
    let contador = 0

    for (let i = 0; i < num.length; i++){
        if (num[i] == contador)
        contador ++;
    }
    return contador;
}
console.log("count")