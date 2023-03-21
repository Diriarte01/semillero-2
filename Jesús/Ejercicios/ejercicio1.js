const number = [1,3,3,3,3,-12,-12,-12,-9,-9,2,2,2,8,5,8,33].sort();
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
