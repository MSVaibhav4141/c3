import { useQuery } from "@tanstack/react-query"
import { getSharedPost } from "../../api/getSharedPost"
import Masonry from "react-masonry-css"
import { breakpoints } from "./Home"
import { Cards } from "../../Components/ui/Cards"
import { EmptyState } from "../../Components/ui/Emptystate"

export const SharedPost = () => {

    const {data, isLoading} = useQuery({
        queryKey:['all','share','post'],
        queryFn:getSharedPost
    })

    const sharedpost = data?.posts;
    console.log(data)
    return(
          <>
              {isLoading ? (
                <div className="w-full h-[70vh] flex items-center justify-center text-xl text-gray-500">
                  Loading cards...
                </div>
              ) : sharedpost?.length > 0 ? (
                <Masonry
                  breakpointCols={breakpoints}
                  className="flex w-full gap-4 p-6"
                  columnClassName="masonry-column"
                >
                  {sharedpost.map((i: any, index: number) => (
                    <div key={index} className="break-inside-avoid mb-4">
                      <Cards data={i} />
                    </div>
                  ))}
                </Masonry>
              ) : (
                <EmptyState
                  message="Oops! No content found."
                  subtext="Try saving content from the card's bookmark button."
                />
              )}
            </>
    )
}