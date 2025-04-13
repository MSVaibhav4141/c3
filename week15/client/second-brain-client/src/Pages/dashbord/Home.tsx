import { useQuery } from "@tanstack/react-query";
import { Cards } from "../../Components/ui/Cards";
import Masonry from "react-masonry-css";
import { getContent } from "../../api/getContent";
import { useAuth } from "../../context/AuthContent";

export const breakpoints = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const DashboardHome = () => {

 
  const {id} = useAuth()

  const { data } = useQuery({
    queryKey: ["user-content", id],
    queryFn: () => getContent(id),
    staleTime:2 * 60 * 1000,
    enabled: !!id, 
  });

 
// console.log(userContent.data.content)

  return (
    <>
      <Masonry
        breakpointCols={breakpoints}
        className="flex w-full gap-4 p-6"
        columnClassName="masonry-column"
      >
        {data && data.content?.map((i:any, index:number) => (
          <div key={index} className="break-inside-avoid mb-4">
          <Cards data={i} />
        </div>
        ))}
      </Masonry>
    </>
  );
};
