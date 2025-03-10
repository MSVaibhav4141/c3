"use strict";
let x = 1;
// x = 'Vaibhav'; 
console.log(x);
// function of ts
const greet = (name) => {
    console.log("Hello", name);
};
greet('Vaibhav');
// greet(1) // throws error
const calcSum = (x, y) => {
    return x + y;
};
const sum = calcSum(1, 2);
console.log(sum);
const isLegal = (age) => {
    return age > 18 ? true : false;
};
console.log(isLegal(15));
const delayFucntionCall = (fn) => {
    setTimeout(fn, 1000);
};
const callBackFunction = () => {
    console.log('Hey i am a callback function');
    return 1;
};
delayFucntionCall(callBackFunction);
// If a callback function has argument
const delayFucntionCallSum = (fn) => {
    setTimeout(fn, 1000);
};
const callBackFunctionSum = (a, b) => {
    console.log(a + b);
};
delayFucntionCallSum(() => callBackFunctionSum(2, 2));
// const calcSummation = (a:variable, b: variable): variable => {
//     return a + b ; // Why does this throw error. its an issue   
// } 
// calcSummation(1,2);
