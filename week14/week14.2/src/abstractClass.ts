abstract class Person{
    name:string;
    constructor(name:string){
this.name = name;
    }

    abstract greet(): string   //Chidren class must enforce this method on themselves

    sayHello():string{  // Even concreate methods cant be accessed directly it has to be accessed by a children
        return "Hello"
    }
}

class Manager extends Person{
    constructor(public name:string){
        super(name)
    }
     greet():string
     {   
        return 'Hi';
     } 
}
class Manager3 extends Person{
    constructor(public name:string){
        super(name)
    }
     greet():string
     {   
        return 'Hi';
     } 
}
const manager1 = new Manager('Bob')
console.log(manager1.sayHello())
console.log(manager1.greet())