//Inference between the arguments

// const getValueOfKey = (obj:object, key:keyof object) => { //incorrect as object doesnt mean normal object instead  any non primitve values like array , obj and key of array s nothing so never
// const getValueOfKey = <TObj>(obj:TObj, key:keyof TObj) => { // Doesnt work correctly

const getValueOfKey = <TObj, TKey extends keyof TObj>(obj:TObj, key:TKey) => {   // --------> Infering(relating) two argument (TObj, TKey) with each other
                                                                                // --------> also provides infer to result and autocompletes    
    return obj[key]
}

const getValue = getValueOfKey({
    a:true,
    b:'hey',
    c:1
},"b")

console.log(getValue)