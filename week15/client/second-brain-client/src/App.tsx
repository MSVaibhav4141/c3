import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/landing/LandingPage";
import { Dashboard } from "./Pages/dashbord/Dashboard";
import { SignIn } from "./Pages/auth/Signin";
import { SignUp } from "./Pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import { PrivateRoue } from "./routes/ProtectedRoue";
import { MainLayout } from "./Components/layout/MainLayout";
import { YoutubePage } from "./Pages/dashbord/YoutubePage";
import { DashboardHome } from "./Pages/dashbord/Home";
import { Xpage } from "./Pages/dashbord/Xpage";
import { Bookmarks } from "./Pages/dashbord/Bookmark";
import { useEffect } from "react";
import { SharedPost } from "./Pages/dashbord/SharedPost";

const App = () => {

  useEffect(() => {
    
    if(!localStorage.getItem('theme')){
    const mq = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
  
    if (mq.matches) {
      document.querySelector('body')?.classList.add('dark')
    }
    
    mq.addEventListener("change", (evt) => evt.matches ? document.querySelector('body')?.classList.add('dark') : document.querySelector('body')?.classList.add('light'))
   
    return () => mq.removeEventListener("change", (evt) => evt.matches ? document.querySelector('body')?.classList.add('dark') : document.querySelector('body')?.classList.add('light'))
}else{
  const theme:string = localStorage.getItem('theme')!;
  document.querySelector('body')?.classList.add(theme)
}
  }, []);

  return (
    <>
        <>
          <Routes>
            <Route element={<MainLayout />}>
             {/* Private routes */}
            <Route element={<PrivateRoue />}>
              <Route path="/user/:name" element={<Dashboard />} >
              <Route index element={<DashboardHome />}/>
              <Route path="YT" element={<YoutubePage />} />
              <Route path="X" element={<Xpage />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="shared/content" element={<SharedPost />} />
              </Route>
            </Route>

            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            </Route>
          </Routes>

          <ToastContainer stacked />
        </>
    </>
  );
};


export default App;
