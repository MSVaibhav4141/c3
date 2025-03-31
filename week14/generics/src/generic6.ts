// We could see how can we apply type safety on obj and there entries usng records
// Getting largest elemt of obj and printing its key and value
const getLargest = <TObj extends Record<string, number>>(obj: TObj): {
    key: keyof TObj,  //<----
    value:number
} => {
    const keys = Object.keys(obj) as Array<keyof TObj>   // <---
    let largsetKey:keyof TObj = keys[0];
    let largsetValue:number = -1
    for(const prop in obj){
        if(obj[prop] > largsetValue)
        {
            largsetValue = obj[prop]
            largsetKey = prop
        }
    }

    return{
        key:largsetKey,
        value:largsetValue
    }
}

const largestKeyValuePair = getLargest({
    a:1,
    b:12,
    c:3,
    d:-2
})

console.log(largestKeyValuePair)