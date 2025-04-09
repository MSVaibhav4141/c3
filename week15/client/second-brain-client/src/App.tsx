import { Route, Routes } from "react-router-dom";
import { LandingPage } from "./Pages/landing/LandingPage";
import { Dashboard } from "./Pages/dashbord/Dashboard";
import { SignIn } from "./Pages/auth/Signin";
import { SignUp } from "./Pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import { useAuth } from "./context/AuthContent";
import { PrivateRoue } from "./routes/ProtectedRoue";
import { MainLayout } from "./Components/layout/MainLayout";

const App = () => {

  const { loading } = useAuth();

  return (
    <>
      {!loading && (
        <>
          <Routes>
            <Route element={<MainLayout />}>
             {/* Private routes */}
            <Route element={<PrivateRoue />}>
              <Route path="/user/:name" element={<Dashboard />} />
            </Route>

            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            </Route>
          </Routes>

          <ToastContainer stacked />
        </>
      )}
    </>
  );
};


export default App;
