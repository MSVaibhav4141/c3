// Default Type Parameters

const createSet = <T = string>() => {  //If no type are passed it will be infered as string
    const set = new Set<T>()
    console.log('New Set Crated')
}

const numberSet = createSet<number>()
const getSet = createSet()   