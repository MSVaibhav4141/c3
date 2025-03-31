"use strict";
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        return "Hello";
    }
}
class Manager extends Person {
    constructor(name) {
        super(name);
        this.name = name;
    }
    greet() {
        return 'Hi';
    }
}
class Manager3 extends Person {
    constructor(name) {
        super(name);
        this.name = name;
    }
    greet() {
        return 'Hi';
    }
}
const manager1 = new Manager('Bob');
console.log(manager1.sayHello());
console.log(manager1.greet());
