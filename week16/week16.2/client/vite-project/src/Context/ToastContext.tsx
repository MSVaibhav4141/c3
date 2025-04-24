import { createContext, Dispatch, ReactElement, SetStateAction, useContext, useState } from "react"

type Context = {
    toast: (message:string) => void
    setRoomId:Dispatch<SetStateAction<string>>
    roomId:string
    name:string
    setName:Dispatch<SetStateAction<string>>
}

const defaultToastContext: Context = {
    toast: () => {},
    setRoomId: () => {},
    setName: () => {},
    roomId:'',
    name:''
}
export const ToastContext = createContext<Context>(defaultToastContext)
export const Toaster = ({children}:{children:ReactElement}) => {
    
    const [roomId, setRoomId] = useState<string>('')
    const [name, setName] = useState<string>('')


    const toast = (message:string) => {

        document.getElementById('toast')!.innerText = message;
        document.getElementById('toast')?.classList.add('bottom-10')
        
        setTimeout(() => {
            document.getElementById('toast')?.classList.remove('bottom-10')
            
        }, 2000);
    }

    return<>
    <ToastContext.Provider value={{toast,roomId, setRoomId, name, setName}}>
        {children}
    </ToastContext.Provider>
    </>
}

export const useToast = () => {
    const context = useContext(ToastContext)
    if(!context) throw new Error('Context is not defined')
    return context;
}