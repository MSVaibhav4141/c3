interface UserInfo {
    firstName: string,
    lastName : string,
    age: number
}

const filterLegalUser = (users:UserInfo[]): UserInfo[] =>(
     users.filter((i) => i.age > 18)
)

const users:UserInfo[] = [{
    firstName:'Arman',
    lastName:'khanna',
    age:21
},
 {
    firstName:'Arman',
    lastName:'khanna',
    age:21
},
 {
    firstName:'Arman',
    lastName:'khanna',
    age:1
},
 {
    firstName:'Arman',
    lastName:'khanna',
    age:21
},
 {
    firstName:'Arman',
    lastName:'khanna',
    age:21
}
]

const legalUsers = filterLegalUser(users)
console.log(legalUsers)