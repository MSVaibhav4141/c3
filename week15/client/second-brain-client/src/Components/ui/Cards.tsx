import { TwitterTweetEmbed } from "react-twitter-embed";
import { BKIcon, ShareIcon } from "./Icons";
import { useState } from "react";

interface CardProps {
  data:any
}
export const Cards = (props: CardProps) => {

  const [loading, setLoading] = useState(true);


  const {link, tags,body, title, type,userId} = props.data
  return (
    <>
      <div
        className={`p-3 w-full bg-purple-50 border-2 border-border-color border-[0.8px] text-grey-400 inset-shadow-sm rounded-lg mb-3  hover:bg-save-card hover:shadow-lg hover:translate-1 trasition duration-150`}
      >
        <div className="flex justify-between h-15 font-semibold text-lg items-center">
          <p>{title.length > 60 ? (<>{title.substring(0,60)}...</>) : <>{title}</>}</p>
        </div>
        {props.data.type === "X (formerly Twitter)" && (
          <>
            {loading && (
        <div className="mb-2 text-gray-500 animate-pulse">
          Loading tweet...
        </div>
      )}
           <TwitterTweetEmbed 
           onLoad={() => setLoading(false)}
           tweetId={link}/>
          </>
        )   
       }
       {props.data.type === 'YouTube' && (
          (
            <>
              <div className="h-45 mt-1">
                <a href={`https://www.youtube.com/watch?v=${link}`} target="_blank">
                <iframe
                  className="w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${link}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe></a>
              </div>
            </>
          )
       )} 
        {body && <div className="rounded-md bg-purple-200/50 p-2">{body}</div>}
        <div className="flex justify-between w-full h-10 items-center">
          <p className="text-grey-100 text-thin">Added 2 days ago</p>
          <div className="flex items-center ">
            <span className="mr-2">
              <ShareIcon stroke={1.5} className="text-grey-400" />
            </span>
            <span>
              <BKIcon stroke={1.5} className="text-grey-400"/>
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
