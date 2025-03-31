"use strict";
const sumOfAge = (user1, user2) => (user1.age + user2.age);
console.log(sumOfAge({
    name: 'Harkirat',
    age: 27
}, {
    name: 'Vaibhav',
    age: 20
}));
