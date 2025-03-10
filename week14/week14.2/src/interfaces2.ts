interface People{
    name:string,
    age:number,
    greet: ()=> boolean
}

const person: People ={
    name:'Vms',
    age:12,
    greet:() => false
}

// Now what if we want to implement interfaces on a class

class Employee implements People{
    constructor(
        public name:string,
        public age:number
    ){}
    greet = () => this.age > 18
}

console.log(new Employee('Babu', 12).greet())