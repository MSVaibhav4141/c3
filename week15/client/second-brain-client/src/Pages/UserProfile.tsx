import Masonry from "react-masonry-css"
import { breakpoints } from "./dashbord/Home"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getContent } from "../api/getContent"
import { Cards } from "../Components/ui/Cards"
import { useAuth } from "../context/AuthContent"
import { publicUserContent } from "../api/getContentPublicUser"
import { getUserName } from "../api/getUserName"


export function toTitleCase(str:string) {
    return str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  

export const UserProfile = () => {

    const {name} = useParams<string>();

    const {isAuth,loading} = useAuth();

    const {data:user, isLoading:userLoading, isSuccess:userSuccess, isError, } = useQuery({
        queryKey:['username', name],
        queryFn:() => getUserName(name!),
        retry:2
      })

     const { data, isSuccess,isLoading } = !loading && isAuth ? useQuery({
        queryKey: ["userprofile", user?.user?.name],
        queryFn: () => getContent(user?.user?.name),
        staleTime:2 * 60 * 1000,
        enabled: !!user?.user?.name, 
      }):  useQuery({
        queryKey: ["public",'post', user?.user?.name],
        queryFn: () => publicUserContent(user?.user?.name),
        enabled: !!user?.user?.name, 
      })
      

      console.log(isError)
    return <>
      {userLoading && <div className="text-grey-400">Loading</div> }
    {isError && <div className="text-grey-400">Error</div>}
     
      { (userSuccess && (
        <div className="px-2 md:px-5 lg:px-10 xl:px-15 text-grey-400 ">
        <div className='border-b-1 border-border-color flex items-center py-8 px-6' >
            <div className="w-[200px] aspect-square rounded-full bg-blue-300 flex items-center justify-center">
                <img src="/assets/brain.png" alt="" className="w-full h-full object-contain object-center"/>
            </div>
            <div className="ml-2 md:ml-10"> 
                <p className="text-5xl font-semibold">{toTitleCase(user?.user?.name)}</p>
            </div>
        </div>
        <div>
            <div>
                {/* <p className="text-center font-semibold text-xl mt-5 border-border-color border-b-2 mx-60">Second brain of Tester41</p> */}
            </div>
            <div>
                 <Masonry
                        breakpointCols={breakpoints}
                        className="flex w-full gap-4 p-6"
                        columnClassName="masonry-column"
                      >
                        {isLoading && <>Loading</>}
                        {isSuccess && data.posts?.map((i:any, index:number) => (
                          <div key={index} className="break-inside-avoid mb-4">
                          <Cards data={i} />
                        </div>
                        ))}
                      </Masonry>
            </div>
        </div>
    </div>
       ))}
    </>
}