import { date, z } from 'zod';

export function setupCounter(element: HTMLDivElement) {
  // type User = {username:string}
  function greet(user:User){
    element.innerHTML = `Hi from zod ${user.username}`
  }
  
  const UserSchema = z.object({
    username:z.string()
  })
  
  // 
  type User = z.infer<typeof UserSchema>
  const user = JSON.parse('{"username":"123"}') // fails at runtime so use zod
  console.log(UserSchema.safeParse(user)) // as we can see it runs at runtime as well 


  // const user = JSON.parse('{"username":123}') as User; // fails at runtime so use zod


    greet(user)
    
}

export const basicValidationZod = (element: HTMLSpanElement) => {
  
  const enumArray = ['Singing', 'Cricket', 'Reading'] as const   //making array read-only

  enum Hobbies{
    Progamming = 'Programming',
    Singing = 'Singing',
    Playing = 'Playing'
  }
  const UserSchema = z.object({
    username:z.string().min(3).max(9),  //set min length of username 3
    age:z.number().gt(0).default(Math.random),             //These are basic primitive data type of zod
    dob:z.date().optional(),    //This set dob as optional           
    isProgram:z.boolean(),
    email:z.string().email(),   // Can check for email
    country:z.string().default('India'),
    li:z.literal(true), // Now it always needed to be true ,
    hobbies:z.enum(enumArray) ,             //enumArray throw red squigly cause zod think array could be changed hence it can't handle it. hence make array as only read
    secondHobby: z.nativeEnum(Hobbies)
  })
  element.innerHTML = `Basic zod validations`

  type User = z.infer<typeof UserSchema>;


}

export const zodObjectType = (element: HTMLDivElement, value: string) => {
console.log(value)
}