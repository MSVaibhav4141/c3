"use strict";
const updateUserFn = (user) => {
    console.log(user.name, user.age, user.address);
};
const userInfo = {
    id: 'jf123kh',
    name: 'Vaibhav',
    age: 22,
    address: 'Delhi',
    dob: new Date('11/11/2001')
};
updateUser(userInfo);
