import { cloneElement, Dispatch, ReactElement, SetStateAction } from "react";
import { CloseIcon, SearchIcon } from "../Icons";
import { Input } from "../Input";
import { Link } from "react-router-dom";

type NavModalProp<T extends string> = {
  isAuth: boolean | undefined;
  setSearch: Dispatch<SetStateAction<T>>;
  setInput: Dispatch<SetStateAction<T>>;
  searchInput: T;
  serachOn: T;
  hamStyle: Record<T, T>;
  navItems: ReactElement<{ className?: string }>;
  isHam: T;
  isResultLoad:boolean,
  finalResult:{id:string, content:string}[],
  isSuccess?:boolean,
  username?:string
};
export const SearchModal = ({
  searchInput,
  isAuth,
  setSearch,
  hamStyle,
  serachOn,
  setInput,
  isSuccess,
  navItems,
  isHam,
  isResultLoad,
finalResult,
  username
}: NavModalProp<string>) => {

  

  return (
    <>
      {isAuth ? (
        <div
          className={`h-screen w-full fixed z-[101] bg-mode transition-all ease-in-out duration-300 ${hamStyle[serachOn]} p-2 sm:hidden block`}
        >
          <div className={`w-full flex justify-end`}>
            <button onClick={() => setSearch("searchOff")}>
              <CloseIcon className="text-gray-600 cursor-pointer" stroke={2} />
            </button>
          </div>
          <Input
            className="block w-full mt-3 outline-2 focus:outline-3 focus:border-3 !border-gray-400 !w-full"
            size="md"
            placeholder="Search anything"
            input={searchInput}
            setInput={setInput}
            isResultLoad={isResultLoad}
            startIcon={
              <SearchIcon className="block text-gray-600" stroke={1} />
            }
          />
           <div className="mx-auto rounded-sm w-[97%]  bg-white shadow-lg block sm:hidden ">
           
      {finalResult && finalResult.length === 0 ? isSuccess && <div className="w-full shadow-md bg-gray-200 px-2 m-2 mt-2 rounded-md text-center py-3 mx-auto">No result found</div> : 
      !isResultLoad && finalResult.map((i, index) => (
        <Link onClick={() => setSearch("searchOff")} className="flex justify-center" to={`/user/${username}/${i.id}`}><div className="w-full shadow-md bg-gray-200 hover:bg-purple-200 px-2 m-2 mt-2 rounded-md text-center py-3" key={index}>{i.content}</div></Link>
      ))
      }
    </div>
        </div>
      ) : (
        <div
          className={`fixed z-[101] bg-mode border-gray-300 shadow-md border-b-1 border-border-color w-full rounded-b-xl ${hamStyle[isHam]} transition-all ease-in-out duration-200`}
        >
          {cloneElement(navItems, {
            className: "flex pb-6",
          })}
        </div>
      )}
    </>
  );
};
