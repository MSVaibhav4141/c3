import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContent";
import { getContent } from "../../api/getContent";
import Masonry from "react-masonry-css";
import { Cards } from "../../Components/ui/Cards";
import { breakpoints } from "./Home";

export const YoutubePage = () => {

    const {username} = useAuth()

    const { data,isSuccess } = useQuery({
        queryKey: ["user-content", username],
        queryFn: () => getContent(username),
        staleTime:2 * 60 * 1000,
        enabled: !!username, 
      });
    

    return<>
     <Masonry
           breakpointCols={breakpoints}
           className="flex w-full gap-4 p-6"
           columnClassName="masonry-column"
         >
           {isSuccess && (data.content?.filter((i:any) => i.type === 'YouTube')).map((i:any,index:number) => (
            <div key={index} className="break-inside-avoid mb-4">
             <Cards data={i} />
           </div>
           ))}
         </Masonry>
       </>
   
}