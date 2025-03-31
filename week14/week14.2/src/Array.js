"use strict";
const filterLegalUser = (users) => (users.filter((i) => i.age > 18));
const users = [{
        firstName: 'Arman',
        lastName: 'khanna',
        age: 21
    },
    {
        firstName: 'Arman',
        lastName: 'khanna',
        age: 21
    },
    {
        firstName: 'Arman',
        lastName: 'khanna',
        age: 1
    },
    {
        firstName: 'Arman',
        lastName: 'khanna',
        age: 21
    },
    {
        firstName: 'Arman',
        lastName: 'khanna',
        age: 21
    }
];
const legalUsers = filterLegalUser(users);
console.log(legalUsers);
