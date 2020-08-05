//桶排序
//将元素分到不同的桶中
//再对每个
function bucketSort(arr, bucketSize =  3){
    const buckets = createBuckets(arr, bucketSize);
    const sortedArr = sortBuckets(buckets);
    return sortedArr;
}
/**
 * 
 * @param {*} arr 
 * @param {Number} bucketSize 每个桶的size
 */
function createBuckets(arr, bucketSize){
    let buckets = [];
    const len = arr.length;
    let min = max = arr[0],
        bucketCount ; //桶的数量
    for(let i = 0; i < len; i++){
        arr[i] > max ? max = arr[i] : null;
        arr[i] < min ? min = arr[i] : null;
     }

    //桶的数量
    bucketCount = Math.ceil( (max - min + 1) / bucketSize );
    for(let i =0 ; i < bucketCount; i++){
        buckets[i] = [];
    }

    let bucketIndex;
    //将元素放在哪一个桶中
    for(let i = 0; i < len; i++){
        bucketIndex = Math.floor( (arr[i] - min) / bucketSize );
        buckets[bucketIndex].push(arr[i]);
    }
    
   buckets = buckets.filter(ele => ele.length != 0);
   return buckets;
}
    
function sortBuckets(buckets){
    for(let i = 0; i < buckets.length; i++){
        insertSort(buckets[i]);
    }
    return buckets.flat(1);
}
//[4,2,6,9,1]
function insertSort(arr){
    for(let i = 1; i < arr.length; i++){
        let j = i;
        let tmp = arr[i]
        //j - > 找到正确的插入位置
        while(tmp < arr[j - 1] && j > 0){
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = tmp;
    }
    return arr;
}

console.log(bucketSort([4,3,6,9,5,5]))
// console.log(insertSort([4,2,6,9,1]))

/*
时间复杂度数分析
设有 n 个元素, 在m个桶中均匀分布
那么每个桶总有 c = n / m个元素
假如对桶进行插入排序
每一个桶排序的时间复杂度为 O(c^2)
那么总的时间复杂度为 c^2 * m -> (n/m)^2 * m -> n^2 / m
故O(n)=  n^2 / m
如果 m -> n 则O(n) -> n

现在分析, 在什么样的情况下, 能达到理想情况
1. 若要使 m -> n ,则bucketSize -> 1  --- 需要更多的空间开销(其实这种情况有些类似计数排序)
2. 前提为均匀分布, 若重复元素过多, 导致一个桶里的元素急剧上升, 影响性能
*/
