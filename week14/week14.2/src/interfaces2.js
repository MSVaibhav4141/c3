"use strict";
const person = {
    name: 'Vms',
    age: 12,
    greet: () => false
};
// Now what if we want to implement interfaces on a class
class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.greet = () => this.age > 18;
    }
}
console.log(new Employee('Babu', 12).greet());
