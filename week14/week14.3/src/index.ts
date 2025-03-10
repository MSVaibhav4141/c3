interface User {
    name:string,
    age:number
}

const sumOfAge = (user1: User, user2: User):number => (
    user1.age + user2.age
)

console.log(sumOfAge({
    name:'Harkirat',
    age:27
},{
    name:'Vaibhav',
    age:20
}))