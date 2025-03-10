type Info<TData> = {
    data: TData
}
 
type  User = Info<number>;

const user:User = {
    data:1
}

console.log(user)
//Here generics are being used a type of prop that i can pass to 'types' or even to 'interfaces';

export {}