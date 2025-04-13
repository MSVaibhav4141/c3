import { Outlet } from "react-router-dom";
import { BKIcon, Home, XIcon, YTIcon } from "../../Components/ui/Icons";
import { SideBar } from "../../Components/ui/Sidebar/SideBar";

export const Dashboard = () => {
  return (
    <>
      <div className="flex pb-10 sm:p-0 ">
        <SideBar
          width="70"
          SideItem={<Home />}
          ItemIcon={[<Home />, <YTIcon />, <XIcon />,<BKIcon stroke={2} />]}
        />
        <section className="w-full">
          <Outlet />
        </section>
      </div>
    </>
  );
};
