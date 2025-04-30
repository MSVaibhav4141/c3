import { z } from 'zod'

export const CreateUserSchema = z.object({
    email: z.string().max(100),
    username: z.string().min(3).max(20),
    password: z.string().min(5),
})

export const LoginUserSchema = z.object({
    email: z.string().max(100),
    password: z.string().min(5),
})

export const CreateRoomSchema = z.object({
    roomId: z.string().max(10),
})