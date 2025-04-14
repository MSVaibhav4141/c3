import { useQuery } from "@tanstack/react-query"
import { getSharedPost } from "../../api/getSharedPost"
import Masonry from "react-masonry-css"
import { breakpoints } from "./Home"
import { Cards } from "../../Components/ui/Cards"

export const SharedPost = () => {

    const {data, isSuccess, isLoading} = useQuery({
        queryKey:['all','share','post'],
        queryFn:getSharedPost
    })

    return<>
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
    </>
}