//Constraint on TYPE arguments

type GettfunctionType<T extends (...args: any) => Promise<any>> = Awaited<ReturnType<T>>



const api = async (api : string)=> {
    const res = await fetch(api);
    const todo = await res.json()
    return todo;
}


type fnType = GettfunctionType<typeof api> // We use type of because we are passing Type not a function hence we use type of and api type is function so it is valid
// type fnTy1pe = GettfunctionType<string> // Throws error as the type is not of type (args:any => any) i.e function


