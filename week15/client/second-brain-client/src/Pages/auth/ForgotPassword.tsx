import { Button } from "../../Components/ui/Button";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { resetPasswordMail } from "../../api/requestResetMail";
import { toast } from "react-toastify";

export const ForgotPassword = () => {
    
    const [email, setEmail] = useState<string>('')


    const sendMailMutation = useMutation({
        mutationFn: resetPasswordMail,
        onSuccess:() => {
            toast.success('Reset mail has been send to your email')
        }
    })

    const handleSubmit = (e:FormEvent) => {
        e.preventDefault()
        sendMailMutation.mutate(email)
    }

      return (
        <>
          <div className="h-[calc(100vh-70px)] flex items-center justify-center px-4 md:w-auto md:p-0">
            <form
              className="bg-signup-bg flex w-full rounded-lg mx-30  md:h-120 flex items-center justify-center"
              onSubmit={handleSubmit}
            >
              <div className="h-full flex md:flex-row flex-col p-5 md:py-18 w-full">
                <div className="w-1/2  md:text-4xl lg:text-5xl font-semibold ml-14 hidden md:flex flex-col justify-start leading-16 text-grey-400">
                  <p>Forgot it? No biggie.</p>
                  <p>Let's get you a</p>
                  <p>new password!.</p>

                </div>
                <div className="w-full text-xl text-center md:hidden font-semibold md:ml-14  text-grey-400 leading-8 mb-4">
                  <p className="">
                  Forgot your password?
                    <span className="font-bold text-nowrap">
                    No worries!
                    </span>
                  </p>
                  <p>We got you.</p>
                </div>
    
                <div className="w-full md:h-auto md:w-1/3 bg-white md:m-2 flex flex-col p-6 rounded-lg">
                  {/* <Input  onChange={() => console.log('hhh')} placeholder="email" type="email"/> */}
                  <input
                    name="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    required
                    className="p-3 h-16 mt-1 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
                  />
    
                  <Button
                    loading={sendMailMutation.isPending}
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
      );
}