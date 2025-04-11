import { useQuery } from "@tanstack/react-query";
import { Cards } from "../../Components/ui/Cards";
import Masonry from "react-masonry-css";

const breakpoints = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

export const DashboardHome = () => {

  useQuery({
    queryKey:['add','content'],
    queryFn
  })
  return (
    <>
      <Masonry
        breakpointCols={breakpoints}
        className="flex w-full gap-4 p-6"
        columnClassName="masonry-column"
      >
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="YT" />
        </div>
        <div className="break-inside-avoid mb-4">
          <Cards type="X" />
        </div>
      </Masonry>
    </>
  );
};
