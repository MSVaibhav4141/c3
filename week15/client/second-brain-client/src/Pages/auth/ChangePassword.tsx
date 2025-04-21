import { Button } from "../../Components/ui/Button";
import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { resetPasswordMail } from "../../api/requestResetMail";
import { toast } from "react-toastify";
import { changePassword } from "../../api/changePassword";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContent";
import { checkToken } from "../../api/checkToken";

export const ChangePassword = () => {
    
    const [password, setPassowd] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    const {login} = useAuth()

    const token = searchParams.get('token')
    const userId = searchParams.get('id')

    // Will decided if page will open or not 
    const {data, isSuccess, isError, isPending} = useQuery({
        queryKey:['token','validity'],
        queryFn:() => checkToken(token!, userId!),
        retry:false
    })
    
    console.log(data, isSuccess, isError, isPending)
    const changePasswordFn = useMutation({
        mutationFn: changePassword,
        onSuccess:(data) => {
            toast.success('Your password has been reset successfully')
            login(data.token)
            navigate('/signin')
        }
    })

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        const payload = {
            token,
            userId,
            password,
            confirmPassword
        }
        changePasswordFn.mutate(payload)
    }

    useEffect(() => {
        if(isError){
            navigate('/')
        }
    }, [isError])

      return (
        <>
        {!isPending && isSuccess && (
                    <>
                    <div className="h-[calc(100vh-70px)] flex items-center justify-center px-4 md:w-auto md:p-0">
                      <form
                        className="bg-signup-bg flex w-full rounded-lg mx-30  md:h-120 flex items-center justify-center"
                        onSubmit={handleSubmit}
                      >
                        <div className="h-full flex md:flex-row flex-col p-5 md:py-18 w-full">
                          <div className="w-1/2  md:text-4xl lg:text-5xl font-semibold ml-14 hidden md:flex flex-col justify-start leading-16 text-grey-400">
                            <p>Almost there</p>
                            <p>set your new password </p>
                            <p>and you're good to go!</p>
          
                          </div>
                          <div className="w-full text-xl text-center md:hidden font-semibold md:ml-14  text-grey-400 leading-8 mb-4">
                            <p className="">
                            One last step 
                              <span className="font-bold text-nowrap">
                              set your new
                              </span>
                            </p>
                            <p>password!</p>
                          </div>
              
                          <div className="w-full md:h-auto md:w-1/3 bg-white md:m-2 flex flex-col p-6 rounded-lg">
                            {/* <Input  onChange={() => console.log('hhh')} placeholder="email" type="email"/> */}
                            <input
                              name="password"
                              value={password}
                              onChange={(e) => setPassowd(e.target.value)}
                              type="password"
                              placeholder="Password"
                              required
                              className="p-3 h-16 mt-1 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
                            />
          
                            <input
                              name="username"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              type="password"
                              placeholder="Confirm Password"
                              required
                              className="p-3 h-16 mt-1 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
                            />
              
                            <Button
                              loading={changePasswordFn.isPending}
                              type="submit"
                              className="w-full h-16 mt-4"
                              variant="primary"
                              size="sm"
                              title="Reset Password"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </>
        )}
        
        </>
      );
}