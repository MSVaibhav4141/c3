"use strict";
const isLegal = (user) => {
    return user.age > 18 ? true : false;
};
const user = {
    name: 'pushpendra',
    age: 17,
    address: {
        city: 'Delhi',
        houseNO: 11,
        state: 'Delhi'
    }
};
const user2 = {
    name: 'Harkirat',
    age: 17,
    address: {
        city: 'Delhi',
        houseNO: 11,
        state: 'Delhi'
    }
};
console.log(isLegal(user));
