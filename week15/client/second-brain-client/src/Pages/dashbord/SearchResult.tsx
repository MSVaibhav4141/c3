import Masonry from "react-masonry-css"
import { breakpoints } from "./Home"
import { useAuth } from "../../context/AuthContent";
import { useQuery } from "@tanstack/react-query";
import { getContent } from "../../api/getContent";
import { Cards } from "../../Components/ui/Cards";
import { useParams } from "react-router-dom";

export const SearchResult = () => {

    const {username} = useAuth()

    const {id} = useParams()

    const { data, isSuccess,isLoading } = useQuery({
      queryKey: ["user-content", username],
      queryFn: () => getContent(username),
      staleTime:2 * 60 * 1000,
      enabled: !!username, 
    });
  
   
    return <>
     <Masonry
            breakpointCols={breakpoints}
            className="flex w-full gap-4 p-6"
            columnClassName="masonry-column"
          >
            {isLoading && <>Loading</>}
            {isSuccess && data.content?.filter((i:any) => i._id === id)?.map((i:any, index:number) => (
              <div key={index} className="break-inside-avoid mb-4">
              <Cards data={i} />
            </div>
            ))}
          </Masonry>
    </>
}