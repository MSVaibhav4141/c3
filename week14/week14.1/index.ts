let x: number = 1;

// x = 'Vaibhav'; 

console.log(x);


// function of ts

const greet = (name : string) =>{
    console.log("Hello",name)
} 

greet('Vaibhav')
// greet(1) // throws error

const calcSum = (x: number , y: number): number => {
    return x + y;
}

const sum: number = calcSum(1, 2);

console.log(sum);


const isLegal = (age: number): boolean => {
    return age > 18 ? true : false;
}

console.log(isLegal(15))

const delayFucntionCall = (fn: () => void): void  => {
    setTimeout(fn, 1000);
}

const callBackFunction = () => {
    console.log('Hey i am a callback function');
    return 1;
}

delayFucntionCall(callBackFunction);

// If a callback function has argument

const delayFucntionCallSum = (fn: (a: number, b: number) => void)   => {
    setTimeout(fn, 1000);
}

const callBackFunctionSum = (a: number , b: number): void  => {
    console.log( a + b);
}

delayFucntionCallSum(() => callBackFunctionSum(2,2));

type variable = string | number;

// const calcSummation = (a:variable, b: variable): variable => {
//     return a + b ; // Why does this throw error. its an issue   
// } 

// calcSummation(1,2);i