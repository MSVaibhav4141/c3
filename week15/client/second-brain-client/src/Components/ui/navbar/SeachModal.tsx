import { cloneElement, Dispatch, ReactElement, SetStateAction } from "react";
import { CloseIcon, SearchIcon } from "../Icons";
import { Input } from "../Input";

type NavModalProp<T extends string> = {
  isAuth: boolean | undefined;
  setSearch: Dispatch<SetStateAction<T>>;
  setInput: Dispatch<SetStateAction<T>>;
  searchInput: T;
  serachOn: T;
  hamStyle: Record<T, T>;
  navItems: ReactElement<{ className?: string }>;
  isHam: T;
};
export const SearchModal = ({
  searchInput,
  isAuth,
  setSearch,
  hamStyle,
  serachOn,
  setInput,
  navItems,
  isHam,
}: NavModalProp<string>) => {
  return (
    <>
      {isAuth ? (
        <div
          className={`h-screen w-full fixed z-[101] bg-modal transition-all ease-in-out duration-300 ${hamStyle[serachOn]} p-2`}
        >
          <div className={`w-full flex justify-end`}>
            <button onClick={() => setSearch("searchOff")}>
              <CloseIcon className="text-gray-600 cursor-pointer" stroke={2} />
            </button>
          </div>
          <Input
            className="block w-full mt-3 outline-2 focus:outline-3 focus:border-3 !border-gray-400"
            size="md"
            placeholder="Search anything"
            input={searchInput}
            setInput={setInput}
            startIcon={
              <SearchIcon className="block text-gray-600" stroke={1} />
            }
          />
        </div>
      ) : (
        <div
          className={`fixed z-[101] bg-white border-gray-300 shadow-md border-b-1 w-full rounded-b-xl ${hamStyle[isHam]} transition-all ease-in-out duration-200`}
        >
          {cloneElement(navItems, {
            className: "flex pb-6",
          })}
        </div>
      )}
    </>
  );
};
