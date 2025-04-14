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
import { useDebouncing } from "../../../hooks/useDebouncing";
import { useMutation } from "@tanstack/react-query";
import { getSearchResult } from "../../../api/getSearchResult";
import { throwAxiosError } from "../../../handleAxioserr";

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

  const [openBadge, setBadge] = useState(false);

  const hamStyle: Record<string, string> = {
    open: "top-[65px] opacity-100",
    close: " opacity-0 -top-[40px]",
    searchOn: "top-[0px] left-0 opacity-100",
    searchOff: "top-[-1000px] opacity-0",
  };

  const handleTheme = () => {
    
    const isDark = document.querySelector('body')?.classList.contains('dark')
    console.log(isDark)
    if(isDark){
      localStorage.setItem('theme','light')
      document.querySelector('body')?.classList.remove('dark')
    }else{
      localStorage.setItem('theme', 'dark')
      document.querySelector('body')?.classList.add('dark')
    }
  }
  const BadgeItems = [
    <span> <GemeniIcon className="w-18 mr-2"/><ToggleSwitch w={38} h={20}/></span>,
    <span>Profile</span>,
    <span onClick={handleTheme}>Theme</span>,
    <span onClick={() => setOpen(true)}>Add Conent</span>,
    <Link to={`/user/ll/Bookmarks`}><span>Bookmarks</span></Link>,
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
    console.log(isClick)
    setBadge(!isClick);
  }, [isClick]);

  const search = useDebouncing({input:searchInput, delay:500})

    const [searchResult, setResult] = useState<{id:string, content:string}[]>([])
    
      const getSearch =  useMutation({
        mutationFn:getSearchResult,
        onSuccess:(data) => {
          setResult( data.message);
          const prevSearch = localStorage.getItem('search')
          if(prevSearch){
            const array = JSON.parse(prevSearch)
            localStorage.setItem('search', JSON.stringify([...array, search]))
          }else{
          localStorage.setItem('search', JSON.stringify([search]))
          }
        },
        onError:throwAxiosError
      })
  
  
    
     
    useEffect(() => {
      search.trim().length > 0 && getSearch.mutate({input:searchInput})
    },[search])
    

  return (
    <>
      <div
        className={`h-[70px] top-[34px] flex md:max-w-[2100px] w-full bg-mode z-100 justify-between px-4 md:px-9 border-b-1 border-border-color items-center fixed left-[50%] -translate-1/2`}
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
                  <ContentModal setOpen={setOpen}/>
                </Modal>
                <Input
                  className="hidden sm:block"
                  size="sm"
                  placeholder="Search anything"
                  input={searchInput}
                  setInput={setInput}
                  isResultLoad={getSearch.isPending}
                  finalResult={searchResult}
                  isSuccess={getSearch.isSuccess}
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
                  open={openBadge}
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
        isResultLoad={getSearch.isPending}
        finalResult={searchResult}
        setInput={setInput}
        isSuccess={getSearch.isSuccess}
        navItems={props.navItems}
        isHam={isHam}
      />
    </>
  );
};
