interface UserInfo {
    id:string,
    name:string,
    age:number,
    address:string,
    dob:Date
}
// interface UserInfoUpdate {
//     name:string,
//     age:number,  We could use this syntax but its will make scope for mistakes and kind of repetetive
//     address:string,
// }

type UpdateUserInterface = Pick<UserInfo,'name'| 'age' | 'address'> 

const updateUser = (user:UpdateUserInterface) => {
    console.log(user.name,user.age,user.address)
}

const user:UserInfo ={
    id:'jf123kh',
    name:'Vaibhav',
    age:22,
    address:'Delhi',
    dob:new Date('11/11/2001')
}

updateUser(user)
