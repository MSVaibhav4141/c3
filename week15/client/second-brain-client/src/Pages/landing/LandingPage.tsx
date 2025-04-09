import { useEffect } from "react";
import { Hero } from "../Home/Hero";
import { Mid } from "../Home/MidPage";
import { useAuth } from "../../context/AuthContent";
import { useNavigate } from "react-router-dom";


export const LandingPage = () => {
    const { isAuth, username, loading } = useAuth();
    const naviagte = useNavigate()
    useEffect(() => {
      if (isAuth && !loading && username) {
        naviagte(`/user/${username}`);
      }
    }, [isAuth, loading, username]);
  return (
    <>
      <Hero />
      <Mid />
    </>
  );
};
