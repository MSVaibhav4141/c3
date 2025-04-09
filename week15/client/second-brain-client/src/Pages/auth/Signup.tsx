import React, { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../../Components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { signUpFn } from "../../api/signup";
import { throwAxiosError } from "../../handleAxioserr";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContent";

export const SignUp = () => {
  //Using lbraries func
  const navigate = useNavigate();
  const { isAuth, username } = useAuth();

  //Valid payload for zod check
  const signInPayload = z.object({
    name: z.string(),
    username: z.string(),
    password: z.string(),
  });

  type payloadSignin = z.infer<typeof signInPayload>;

  const initialPayload: payloadSignin = {
    name: "",
    username: "",
    password: "",
  };

  //variable for storing payload
  const [payload, setPayload] = useState<payloadSignin>(initialPayload);

  //Handeling data entering
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  //Handling signup request
  const signUpRequest = useMutation({
    mutationFn: signUpFn,
    onSuccess: (data) => {
      localStorage.setItem("authorization", data.token);
      toast.success("You are successfully signed up");
      navigate("/user/");
    },

    onError: throwAxiosError,
  });

  //Handling form submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signUpRequest.mutate(payload);
  };

  //routing user to dashboard upon logged session
  useEffect(() => {
    if (isAuth && username) {
      navigate(`/user/${username}`);
    }
  }, [username, isAuth]);

  return (
    <>
      <div className="h-[calc(100vh-70px)] flex items-center justify-center px-4 md:w-auto md:p-0">
        <form
          className="bg-signup-bg flex w-full rounded-lg mx-30 p-5 md:p-0  md:h-120 flex items-center justify-center"
          onSubmit={handleSubmit}
        >
          <div className="h-full flex md:flex-row flex-col md:py-18 w-full">
            <div className="w-1/2 md:text-3xl lg:text-4xl xl:text-5xl font-semibold ml-14 hidden md:flex flex-col justify-start leading-16 text-grey-400">
              <p>Let BrainlySB</p>
              <p>be your second brain!!!</p>
              <p>Get started</p>
              <p>Sign up now!</p>
              <p
                className="text-sm font-light hover:text-indigo-600 text-indigo-800 cursor-pointer"
                onClick={() => navigate("/signin")}
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
              <p>Tired of forgetting unorganized stuff!!!</p>
            </div>
            <div className="w-full md:h-auto md:w-1/3 bg-white md:m-2 flex flex-col p-6 rounded-lg">
              {/* <Input  onChange={() => console.log('hhh')} placeholder="email" type="email"/> */}
              <input
                name="name"
                value={payload.name}
                onChange={handleChange}
                type="text"
                placeholder="Username"
                required
                className="p-3 h-14 mt-3 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
              />
              <input
                name="username"
                value={payload.username}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
                className="p-3 h-14 mt-3 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
              />
              <input
                name="password"
                value={payload.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
                className="p-3 h-14  mt-3 mb-1 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 "
              />
              <p className="text-end text-sm mb-6 mt-1 text-indigo-800 cursor-pointer hover:text-indigo-600">
                Our privacy policy
              </p>
              <Button
                loading={signUpRequest.isPending}
                type="submit"
                className="w-full h-14"
                variant="primary"
                size="sm"
                title="Join"
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
