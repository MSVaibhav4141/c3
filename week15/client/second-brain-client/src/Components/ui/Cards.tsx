import { BKIcon, ShareIcon } from "./Icons";

interface CardProps {
  type: string;
}
export const Cards = (props: CardProps) => {
  return (
    <>
      <div
        className={`p-3 w-full bg-purple-50 border-2 border-border-color border-[0.8px] inset-shadow-sm rounded-lg mb-3  hover:bg-save-card hover:shadow-lg hover:translate-1 trasition duration-150`}
      >
        <div className="flex justify-between h-15 font-semibold text-lg items-center">
          <p>Title of this yt video will appear here</p>
        </div>
        {props.type === "X" ? (
          <>
            <blockquote className="twitter-tweet w-full">
              {" "}
              <a href="https://twitter.com/elonmusk/status/1908025106795823436?ref_src=twsrc%5Etfw"></a>
            </blockquote>
          </>
        ) : (
          <>
            <div className="h-45 mt-1">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/T-2jliitju4"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          </>
        )}

        <div className="flex justify-between w-full h-10 items-center">
          <p className="text-gray-500 text-thin">Added 2 days ago</p>
          <div className="flex items-center ">
            <span className="mr-2">
              <ShareIcon stroke={1.5} />
            </span>
            <span>
              <BKIcon stroke={1.5} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
{
  /* <blockquote className="twitter-tweet"> <a href="https://twitter.com/elonmusk/status/1908025106795823436?ref_src=twsrc%5Etfw"></a></blockquote> 
<blockquote className="twitter-tweet"> <a href="https://twitter.com/elonmusk/status/1908025106795823436?ref_src=twsrc%5Etfw"></a></blockquote> 
<blockquote className="twitter-tweet"> <a href="https://twitter.com/elonmusk/status/1908025106795823436?ref_src=twsrc%5Etfw"></a></blockquote> 
<blockquote className="twitter-tweet"> <a href="https://twitter.com/elonmusk/status/1908025106795823436?ref_src=twsrc%5Etfw"></a></blockquote>  */
}
