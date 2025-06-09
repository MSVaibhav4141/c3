import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthContent";
import { getContent } from "../../api/getContent";
import Masonry from "react-masonry-css";
import { Cards } from "../../Components/ui/Cards";
import { breakpoints } from "./Home";
import { EmptyState } from "../../Components/ui/Emptystate";

export const YoutubePage = () => {

    const {username} = useAuth()

    const { data,isLoading } = useQuery({
        queryKey: ["user-content", username],
        queryFn: () => getContent(username),
        staleTime:2 * 60 * 1000,
        enabled: !!username, 
      });
    
    const youtube = data.content?.filter((i:any) => i.type === 'YouTube');
    return(
          <>
              {isLoading ? (
                <div className="w-full h-[70vh] flex items-center justify-center text-xl text-gray-500">
                  Loading cards...
                </div>
              ) : youtube?.length > 0 ? (
                <Masonry
                  breakpointCols={breakpoints}
                  className="flex w-full gap-4 p-6"
                  columnClassName="masonry-column"
                >
                  {youtube.map((i: any, index: number) => (
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