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

const App = () => {

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
              <Route path="Bookmarks" element={<Bookmarks />} />
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
