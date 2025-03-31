// HEre we know that typescrpt is complaining that the return type suppose to be array of key of obj but OBJECT.keys return an array of obj but in string format
// So here we know mopre than typescript so intstead we can sort of overule on typescript and can use 'as'




// const getKeyObj = <Tobj extends {}>(obj: Tobj): Array<keyof Tobj> => {
//     return Object.keys(obj)
// } 



const getKeyObj = <Tobj extends {}>(obj: Tobj) => {
    return Object.keys(obj) as Array<keyof Tobj>
} 


const getKeys = getKeyObj({
    a:1,
    b:2,
    c:3
})

console.log(getKeys);