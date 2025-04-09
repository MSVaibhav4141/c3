import { BKIcon, Home, XIcon, YTIcon } from "../../Components/ui/Icons";
import { SideBar } from "../../Components/ui/Sidebar/SideBar";
import { DashboardHome } from "./Home";

export const Dashboard = () => {
  return (
    <>
      <div className="flex pb-10 sm:p-0 ">
        <SideBar
          width="70"
          SideItem={<Home />}
          ItemIcon={[<Home />, <XIcon />, <YTIcon />, <BKIcon stroke={2} />]}
        />
        <section className="w-full">
          <DashboardHome />
        </section>
      </div>
    </>
  );
};
