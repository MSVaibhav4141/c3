interface UserInfo1 {
    id:string,
    name:string,
    age:number,
    address:string,
    dob:Date
}

type UpdateProps = Pick<UserInfo1,'name'| 'age' | 'address'> 
type OptionalUpdateProps = Partial<UpdateProps>


const updateUserFn = (user:OptionalUpdateProps) => {
    console.log(user.name,user.age,user.address)
}

const userInfo:UserInfo1 ={ 
    id:'jf123kh',
    name:'Vaibhav',
    age:22,
    address:'Delhi',
    dob:new Date('11/11/2001')
}

updateUser(userInfo)
