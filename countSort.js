//计数排序

function countSort(arr){
    const len = arr.length;
    const counts = new Array(len + 1);

    arr.forEach(ele => { //n
        if(counts[ele] == undefined){
            counts[ele] = 0;
        }
        counts[ele] ++;
    });

    let index= 0;
    counts.forEach((count, i)=>{
        while(count > 0){
            arr[index++]  = i;
            count--;
        }
    })
    return arr;
}

console.log(countSort([4,3,2,1]))