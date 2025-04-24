import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Input } from "./Input"
import { useDebouncing } from "../../hooks/useDebouncing"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllUsers } from "../../api/getAllUsers"
import { getUserDetails } from "../../api/getUsersDetais"
import { getAllowedUsers } from "../../api/getAllowedUser"
import { allowUser } from "../../api/allowUsers"
import { CloseIcon, CrossIcon, PlusIcon } from "./Icons"
import { toast } from "react-toastify"
import { throwAxiosError } from "../../handleAxioserr"
import { deleteUser } from "../../api/deleteUser"
import { changeVisiblty } from "../../api/changeAcctVisibility"
import { Button } from "./Button"
import { toTitleCase } from "../../Pages/UserProfile"

type AllowedUser = {
    users:{
    _id: string,
    allowedTo: {
        _id: string,
        name: string
    }
}[];
}

type UserProps = {
    reference?:React.RefObject<HTMLDivElement | null>
    setOpen : Dispatch<SetStateAction<boolean>>
}

export const UserProfile = ({setOpen} : UserProps) => {

    const queryClient = useQueryClient()

    const [isPrivate, setPrivate] = useState<string>('')
    const [input, setInput] = useState<string>('')



    const changedInput = useDebouncing({input, delay:600})
    
        const {data:usersData, isSuccess} = useQuery({
            queryKey:['users','info'],
            queryFn:getUserDetails
        })

    const {data, fetchStatus, isSuccess:userSuccess} = useQuery({
        queryKey:['all','users',changedInput],
        queryFn:() => getAllUsers(changedInput),
        enabled:changedInput.length > 0
    })


    const {data:allowedUsers} = useQuery({
        queryKey:['allowed','users'],
        queryFn:() => getAllowedUsers<AllowedUser>()
    })
    
    const addUsers = useMutation({
        mutationFn:allowUser,
        onSuccess:() => {
            toast.success("User added succesfully")
            queryClient.invalidateQueries({queryKey:['allowed','users']})
        },
        onError:throwAxiosError
    })

    
    const removeUsers = useMutation({
        mutationFn: deleteUser,
        onSuccess:() => {
            toast.success("User removed succesfully")
            queryClient.invalidateQueries({queryKey:['allowed','users']})
        },
        onError:throwAxiosError
    })


    const changeAccountVisibility = useMutation({
        mutationFn:changeVisiblty,
        onSuccess:(data) => {
            toast.success(data.message)
        },
        onError:throwAxiosError
    })

    const handleAddUsers = (name:string) => {
        addUsers.mutate(name)
    }

    const handleProfileChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setPrivate(e.currentTarget.value)
        changeAccountVisibility.mutate(e.currentTarget.value === 'public' ? true : false)
    }

    const handleInputFocus = () => {
        document.getElementById('custom_input')?.focus()
    }

   useEffect(() => {
    setPrivate(usersData?.user?.accountType ? 'public': 'private')
   },[usersData?.user?.accountType])

    return <>
   {isSuccess && (
     <div className="flex text-grey-400 border-border-color shadow-md text-nowrap bg-mode rounded-xl mx-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-15 justify-center flex-col md:flex-row md:min-w-[765px] min-h-[350px] max-h-[98%] md:max-h-[350px] max-w-[95vw]">
        <span onClick={() => setOpen(false) } className="absolute top-2 right-2 cursor-pointer hover:text-red-300 transition duration-200">
        <CloseIcon  stroke={2} />
        </span>
     <img src="/assets/brain.png" alt="" className="aspect-square w-[200px] h-[200px] object-contain bg-red-200 rounded-full mx-auto md:m-0"/>
     <div className="flex flex-col justify-start m-0 md:mx-10 text-center md:text-start">
         <p className="mt-4">Username : {toTitleCase(usersData?.user?.name)}</p>
         <p className="mt-4">Email : {usersData?.user?.username}</p>
     <div className="my-4">Account Type : 
         <select value={isPrivate} onChange={handleProfileChange} className="bg-mode mx-2 p-1 rounded-sm border-border-color">p-1--

         <option value={'public'}>Public</option>
         <option value={'private'}>Private</option>
         </select>
         </div>
     {isPrivate === 'private' &&
     <>
     <div className="relative">
         <Input placeholder="Enter username" size="xs" setInput={setInput} className="max-w-55 p-2 text-center md:text-start" input={input} isResultLoad={fetchStatus === 'fetching'} />
         <div className="absolute top-12 bg-purple-50 w-full rounded-md max-h-[200px] overflow-y-auto">
             <div>{data?.users?.map((i:{_id:string, name:string},index:number) => (
                 <div key={index} className="flex justify-between p-2 bg-purple-200/50 hover:bg-purple-200 transition duration-200 m-1 rounded-md">
                    <p>{i.name}</p>
                    <span className='bg-green-200 rounded-full hover:bg-green-300 duration-200 transition' onClick={() => handleAddUsers(i.name)}><PlusIcon  stroke={1.5} className="text-grey-400"/></span>
                    </div>
             ))}</div>
         </div>
         {!data?.users.length && userSuccess && (
                   <div className="absolute top-12 bg-purple-50 w-full rounded-md max-h-[200px] overflow-y-auto">
                   <div>
                       <div  className="flex justify-between p-2 bg-purple-200/50 transition duration-200 m-1 rounded-md">
                          <p>No user found</p>
                          </div>
                   </div>
               </div>
         )}
  
     
     </div>
     </>
     }
     </div>
     {isPrivate === 'private' && (
            <div className="border-border-color border-1 rounded-md p-2 mt-5 md:m-0 ">
            <div className="h-[200px] md:h-[90%] overflow-y-auto ">
                {allowedUsers?.users.length === 0 && (
                    <div className="flex flex-col items-center w-full h-full justify-center">
                        <p className="text-grey-400/40 mb-4 text-xl font-bold text-center">No users can see <br/> your profile</p>
                        <Button onClick={handleInputFocus} title="Add Users" variant="primary" size="sm"></Button>
                    </div>
                )}
                {allowedUsers && allowedUsers?.users.length > 0 && (
                     <>
                     <p className="font-medium">Who can see your profile</p>
                 {allowedUsers?.users?.map((i, index) => (
                     <div className="flex justify-between p-2 mt-1 bg-green-200/50 hover:bg-green-200 transition duration-200 mx-1 rounded-md" key={index}>
                         <p>{i.allowedTo.name}</p>
                         <span className="bg-red-200 rounded-full hover:bg-red-300 duration-200 transition" onClick={() => removeUsers.mutate(i.allowedTo?._id)}><CrossIcon stroke={1.5}/></span>
                         </div>
                 ))}
                 </>
                )}
                   
            </div>
         </div>
     )}
 </div>
   )}
    </>
} 