import { useQuery } from "@tanstack/react-query";
import { Cards } from "../../Components/ui/Cards";
import Masonry from "react-masonry-css";
import { getContent } from "../../api/getContent";
import { useAuth } from "../../context/AuthContent";
import { EmptyState } from "../../Components/ui/Emptystate";

export const breakpoints = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const DashboardHome = () => {

 
  const {username} = useAuth()

  const { data, isSuccess,isLoading } = useQuery({
    queryKey: ["user-content", username],
    queryFn: () => getContent(username),
    staleTime:2 * 60 * 1000,
    enabled: !!username, 
  });

  const home = data?.content;
  return (
     <>
        {isLoading ? (
          <div className="w-full h-[70vh] flex items-center justify-center text-xl text-gray-500">
            Loading cards...
          </div>
        ) : home?.length > 0 ? (
          <Masonry
            breakpointCols={breakpoints}
            className="flex w-full gap-4 p-6"
            columnClassName="masonry-column"
          >
            {home.map((i: any, index: number) => (
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
  );
};
