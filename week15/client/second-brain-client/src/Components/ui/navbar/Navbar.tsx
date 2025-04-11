import {
  cloneElement,
  JSX,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Input } from "../Input";
import { Bars, GemeniIcon, PlusIcon, SearchIcon } from "../Icons";
import { useAuth } from "../../../context/AuthContent";
import { Modal } from "../Modal";
import { ContentModal } from "../ContentModal";
import { SearchModal } from "./SeachModal";
import { BadgeModal } from "./IconModal";
import { useCloseOnOutClick } from "../../../hooks/closeOutsideClick";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import { ToggleSwitch } from "../ToggleSwitch";

interface NavProps {
  logo: ReactElement;
  navItems: JSX.Element;
  h: number;
}

export const Navbar = (props: NavProps): ReactElement => {
  // For giving input to search box
  const [searchInput, setInput] = useState<string>("");
  const [open, setOpen] = useState(false);
  const { loading, isAuth, logout } = useAuth();
  const [isHam, setHam] = useState<string>("close");
  const [serachOn, setSearch] = useState<string>("searchOff");

  const [opebBadge, setBadge] = useState(false);

  const hamStyle: Record<string, string> = {
    open: "top-[65px] opacity-100",
    close: " opacity-0 -top-[40px]",
    searchOn: "top-[0px] left-0 opacity-100",
    searchOff: "top-[-1000px] opacity-0",
  };

  const BadgeItems = [
    <span> <GemeniIcon className="w-18 mr-2"/><ToggleSwitch w={38} h={20}/></span>,
    <span>Profile</span>,
    <span>Theme</span>,
    <span onClick={() => setOpen(true)}>Add Conent</span>,
    <span>Bookmarks</span>,
    <Button
      onClick={() => {
        // logout();
        console.log('hi')
        setBadge(false);
        logout()
      }}
      title="Logout"
      variant="primary"
      size="sm"

    >
    </Button>,
  ];

  const badgeRef = useRef<HTMLDivElement>(null);

  const isClick = useCloseOnOutClick(badgeRef.current);

  useEffect(() => {
    setBadge(!isClick);
  }, [isClick]);

  return (
    <>
      <div
        className={`h-[70px] top-[34px] flex md:max-w-[2100px] w-full bg-white z-100 justify-between px-4 md:px-9 border-b-1 border-border-color items-center fixed left-[50%] -translate-1/2`}
      >
        <div className="text-2xl font-semibold cursor-default">
          {isAuth ? <>{props.logo}</> : <Link to={"/"}>{props.logo}</Link>}
        </div>
        {!loading && (
          <div className="flex items-center">
            {isAuth ? (
              <>
                <div onClick={() => setOpen(true)}>
                  <PlusIcon
                    className="hidden sm:block text-gray-400"
                    stroke={1.5}
                  />
                </div>
                <Modal isOpen={open} setOpen={setOpen} opacity={50} >
                  <ContentModal />
                </Modal>
                <Input
                  className="hidden sm:block"
                  size="sm"
                  placeholder="Search anything"
                  input={searchInput}
                  setInput={setInput}
                  startIcon={
                    <SearchIcon
                      className="hidden sm:block text-gray-500"
                      stroke={1}
                    />
                  }
                />
                <span onClick={() => setSearch("searchOn")}>
                  <SearchIcon
                    stroke={1.5}
                    className="block sm:hidden text-gray-500 cursor-pointer"
                  />
                </span>
                <BadgeModal
                  reference={badgeRef}
                  open={opebBadge}
                  setOpen={setBadge}
                  items={BadgeItems}
                />
              </>
            ) : (
              <>
                {cloneElement(props.navItems, {
                  className: "hidden md:flex",
                })}
                <span
                  onClick={() =>
                    setHam((prev) => (prev === "open" ? "close" : "open"))
                  }
                >
                  <Bars
                    stroke={1.5}
                    className="w-8 h-8 hover:text-purple-500 transition duration-150 cursor-pointer md:hidden"
                  />
                </span>
              </>
            )}
          </div>
        )}
      </div>
      <div className="pb-[70px]"></div>

      <SearchModal
        isAuth={isAuth}
        searchInput={searchInput}
        setSearch={setSearch}
        hamStyle={hamStyle}
        serachOn={serachOn}
        setInput={setInput}
        navItems={props.navItems}
        isHam={isHam}
      />
    </>
  );
};
