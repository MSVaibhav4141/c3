import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signInFn } from "../../api/signIn";
import { throwAxiosError } from "../../handleAxioserr";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContent";

export const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isAuth, username } = useAuth();
  //Valid payload for zod check
  const signupPayload = z.object({
    username: z.string(),
    password: z.string(),
  });

  type payloadSignup = z.infer<typeof signupPayload>;

  //variable for storing payload
  const [payload, setPayload] = useState<payloadSignup>({
    username: "",
    password: "",
  });

  //Handeling data entering
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === "username" && setPayload((prev) => ({ ...prev, [name]: value }));
    name === "password" && setPayload((prev) => ({ ...prev, [name]: value }));
  };

  //Handling request

  const signInRequest = useMutation({
    mutationFn: signInFn,
    onSuccess: (data) => {
      localStorage.setItem("authorization", data.token);
      toast.success("You are now logged in");

      navigate(`/user/${data.username}`);
      login(data.token);
    },
    onError: throwAxiosError,
  });

  //Handling form submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signInRequest.mutate(payload);
  };

  //routing user to dashboard upon logged session
  useEffect(() => {
    if (isAuth && username) {
      navigate(`/user/${username}`);
    }
  }, [isAuth, username]);
  return (
    <>
      <div className="h-[calc(100vh-70px)] flex items-center justify-center px-4 md:w-auto md:p-0">
        <form
          className="bg-signup-bg flex w-full rounded-lg mx-30  md:h-120 flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="h-full flex md:flex-row flex-col p-5 md:py-18 w-full">
            <div className="w-1/2 text-5xl font-semibold ml-14 hidden md:flex flex-col justify-start leading-16 text-grey-400">
              <p>Forgetting something?</p>
              <p>Let us help!!!</p>
              <p>Go ahead and login.</p>
              <p
                className="text-sm font-light hover:text-indigo-600 text-indigo-800 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                New User? Join here!!
              </p>
            </div>
            <div className="w-full text-xl text-center md:hidden font-semibold md:ml-14  text-grey-400 leading-8 mb-4">
              <p className="">
                Welcome to{" "}
                <span className="font-bold">
                  brainly<span className="text-purple-300">SB</span>
                </span>
              </p>
              <p>We will help you remember!!!</p>
            </div>

            <div className="w-full md:h-auto md:w-1/3 bg-white md:m-2 flex flex-col p-6 rounded-lg">
              {/* <Input  onChange={() => console.log('hhh')} placeholder="email" type="email"/> */}
              <input
                name="username"
                value={payload.username}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
                className="p-3 h-16 mt-1 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
              />
              <input
                name="password"
                value={payload.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
                className="p-3 h-16  mt-4 mb-1 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
              />
              <p className="text-end text-sm mb-8 text-indigo-800 cursor-pointer hover:text-indigo-600">
                Problem signing in?
              </p>

              <Button
                loading={signInRequest.isPending}
                type="submit"
                className="w-full h-16"
                variant="primary"
                size="sm"
                title="Login"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
