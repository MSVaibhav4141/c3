import { PrismaClient } from "@prisma/client";

const client = new PrismaClient()

const seed = async() => {
    await client.user.create({
        data:{
            username:'HAAAA',
            email:"sdjnfjdf",
            password:'sdkfsdf'
        }
    })
}

seed();