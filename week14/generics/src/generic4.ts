// Type Infer 
const addId = <T>(obj: T) => { //TypeScrpit automatically infer the type by the runtime argument of the fn.
    return{ 
        ...obj,
        id:'1'
    }
}

// const editedObj = <{firstName:string,lastName:string}>addId({ //--------------------> we don't have to explicitly define the type as above type can infer from runtime argument
const editedObj = addId({
    firstName:'Vaibhav',
    lastName:'Singh'
})

console.log(editedObj)
console.log(editedObj.id)  