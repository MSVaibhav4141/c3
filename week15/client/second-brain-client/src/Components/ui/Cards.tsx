import { TwitterTweetEmbed } from "react-twitter-embed";
import { BKIcon, LoaderBlinker, MenuDots, ShareIcon } from "./Icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "../../api/createBookmark";
import { toast } from "react-toastify";
import { throwAxiosError } from "../../handleAxioserr";
import { useAuth } from "../../context/AuthContent";

interface CardProps {
  data:any
}
export const Cards = (props: CardProps) => {

  const [loading, setLoading] = useState(true);

  const {id} = useAuth()
  const {link, tags,body, title, type,userId, _id,isBookMark} = props.data

  const queryClient = useQueryClient()

  const bookMarkMutation = useMutation({
    mutationFn:createBookmark,
    onSuccess:(data) => {
      queryClient.invalidateQueries({queryKey:["user-content", id]})
      toast.success(data.message)
    },
    onError:throwAxiosError
  })

  const handleBookmark = (id:string) => {
    bookMarkMutation.mutate({
      id
    })

  } 
  return (
    <>
      <div
        className={`p-3 w-full bg-purple-50 border-2 border-border-color border-[0.8px] text-grey-400 inset-shadow-sm rounded-lg mb-3  hover:bg-save-card hover:shadow-lg hover:translate-1 trasition duration-150`}
      >
        <div className="flex justify-between h-15 font-semibold text-sm lg:text-md xl:text-[1.1rem]  items-center">
          <p className="w-[90%]">{title.length > 50 ? (<>{title.substring(0,50)}...</>) : <>{title}</>}</p>
          <MenuDots className="w-[10%] text-lg" stroke={3} />
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
                  onLoad={() => setLoading(false)}
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
            <span onClick={() => handleBookmark(_id)}>
              {bookMarkMutation.isPending ? <LoaderBlinker /> : <BKIcon fill={`${isBookMark ? 'currentColor' : 'none'}`} stroke={1.5} className={`text-grey-400 hover:text-purple-400 transition duration-150 ${isBookMark ? 'text-purple-400' : ''}`}/>}
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
