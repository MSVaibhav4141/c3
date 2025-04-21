import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../context/AuthContent"
import { getContent } from "../../api/getContent";
import { Cards } from "../../Components/ui/Cards";
import Masonry from "react-masonry-css";
import { breakpoints } from "./Home";

export const Bookmarks = () => {

    const {username} = useAuth();

    const {data, isSuccess} =  useQuery({
        queryKey:["user-content", username],
        queryFn:() => getContent(username)
    })



    return<>
       <Masonry
            breakpointCols={breakpoints}
            className="flex w-full gap-4 p-6"
            columnClassName="masonry-column"
          >
    {isSuccess &&  data.content?.filter((i:any) => i.isBookMark).map((i:any,index:number) => (
         <div key={index} className="break-inside-avoid mb-4">
                        <Cards data={i} />
                      </div>
    )) }
    </Masonry>
    </>
}