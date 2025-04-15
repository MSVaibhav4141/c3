import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../ui/navbar/Navbar";
import { Button } from "../ui/Button";
import { LogoNavbar } from "../ui/Icons";




export const MainLayout = () => {
    
      const navigate = useNavigate();

      const NavItems = ({ className }: { className?: string }) => (
        <div className={className}>
          <Button
            title="Login"
            className="ml-4 mr-2 md:mr-3"
            variant="primary"
            size="sm"
            onClick={() => navigate("/signin")}
          />
          <Button
            title="Join"
            className="w-full mr-4 md:w-25"
            variant="secondary"
            size="sm"
            onClick={() => navigate("/signup")}
          />
        </div>
      );

      
  return (
    <>
      <Navbar h={111} logo={<LogoNavbar />} navItems={<NavItems />} />
      <main className="md:max-w-[2100px] min-h-screen mx-auto bg-mode">
        <Outlet />
      </main>
    </>
  );
};
