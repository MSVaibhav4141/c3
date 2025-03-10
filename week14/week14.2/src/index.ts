interface User {
    name:string,
    age:number,
    address:{
        city:string,
        houseNO:number,
        state:string
    }

}

interface User2 {
    name:'Harkirat' | 'Kirat',
    age:number,
    address:{
        city:string,
        houseNO:number,
        state:string
    }

}

const isLegal = (user:User): boolean => {
    return user.age > 18 ? true : false;
}

const user: User ={
    name:'pushpendra',
    age:17,
    address:{
        city:'Delhi',
        houseNO:11,
        state:'Delhi'
    }

}

const user2: User2 ={
    name:'Harkirat',
    age:17,
    address:{
        city:'Delhi',
        houseNO:11,
        state:'Delhi'
    }

}


console.log(isLegal(user))