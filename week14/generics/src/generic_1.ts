type Info<TData> = {
    data: TData
}
 
type  User = Info<number>;

const user:User = {
    data:1
}

type User2 = Info<string>
console.log(user)
//Here generics are being used a type of prop that i can pass to 'types' or even to 'interfaces';
