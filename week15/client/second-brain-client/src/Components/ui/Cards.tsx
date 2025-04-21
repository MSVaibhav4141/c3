import { TwitterTweetEmbed } from "react-twitter-embed";
import { ArchiveIcon, BinIcon, BKIcon, LoaderBlinker, ShareIcon } from "./Icons";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBookmark } from "../../api/createBookmark";
import { toast } from "react-toastify";
import { throwAxiosError } from "../../handleAxioserr";
import { useAuth } from "../../context/AuthContent";
import { getShareLink } from "../../api/getSharerableLink";
import { disableSharing } from "../../api/disableSharing";
import { deletePost } from "../../api/deletingPost";

interface CardProps {
  data:any,
  ytHeight?:string
}
export const Cards = (props: CardProps) => {

  const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

  const [loading, setLoading] = useState(true);

  console.log(props.data)
  const {id, username} = useAuth()
  const {link, tags,body, title, type,userId, _id,isBookMark, isShared} = props.data

  const queryClient = useQueryClient()

  const bookMarkMutation = useMutation({
    mutationFn:createBookmark,
    onSuccess:(data) => {
      queryClient.invalidateQueries({queryKey:["user-content"]})
      queryClient.invalidateQueries({queryKey:["user-content"]})
      queryClient.invalidateQueries({queryKey:['all','share','post']})
      toast.success(data.message)
    },
    onError:throwAxiosError
  })
  
  const getShareableLink = useMutation({
    mutationFn:getShareLink,
    onSuccess:async(data) => {
      await navigator.clipboard.writeText(`${FRONTEND_URL}/share/${data.link}`)
      queryClient.invalidateQueries({queryKey:["user-content"]})
      toast.success('Link is copied to clipboard')
    },
    onError:throwAxiosError
  })
  
  const disableSharingMutation = useMutation({
    mutationFn:disableSharing,
    onSuccess: () => {
      toast.success("This post is now private")
      queryClient.invalidateQueries({queryKey:["user-content"]})
      queryClient.invalidateQueries({queryKey:['all','share','post']})
    },
    onError:throwAxiosError
  })
  
  const deletePostMutation = useMutation({
    mutationFn:deletePost,
    onSuccess:() => {
      queryClient.invalidateQueries({queryKey:["user-content"]})
      queryClient.invalidateQueries({queryKey:['all','share','post']})
      toast.success('Post Deleted!!')
    },
    onError:throwAxiosError
  })
  const handleBookmark = (id:string) => {
    bookMarkMutation.mutate({
      id
    })
  } 

  const handleSharePost = (id:string) => {
    getShareableLink.mutate({
      id
    })
  }

  const disableSharingFn = (id:string) => {
    disableSharingMutation.mutate(id)
  }

  const handleDeletePost = (id:string) => {
    deletePostMutation.mutate(id)
  }


  return (
    <>
      <div
        className={`p-3 w-full bg-purple-50 border-2 border-border-color border-[0.8px] text-grey-400 inset-shadow-sm rounded-lg mb-3  hover:bg-save-card hover:shadow-lg hover:translate-1 trasition duration-150`}
      >
        <div className="flex justify-between h-15 font-semibold text-sm lg:text-md xl:text-[1.1rem]  items-center">
          <p className="w-[90%]">{title.length > 50 ? (<>{title.substring(0,50)}...</>) : <>{title}</>}</p>
          <span onClick={() => handleDeletePost(_id)}>
          <BinIcon className="text-grey-400 hover:text-red-400 transition duration-150 !w-5" stroke={1} />
          </span>
        </div>
        {props.data.type === "X (formerly Twitter)" && (
          <>
          <div className="w-100vw">
            {loading && (
        <div className="mb-2 text-gray-500 animate-pulse">
          Loading tweet...
        </div>
      )}
           <TwitterTweetEmbed 
           options={
            {
              width:'100%',
              margin:'0 auto'
            }
           }
           onLoad={() => setLoading(false)} 
           tweetId={link}/>
           </div>
          </>
        )   
       }
       {props.data.type === 'YouTube' && (
          (
            <>
              <div className={`h-45 mt-1 ${props.ytHeight}`}>
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
          <div className="flex items-center">
           {isShared ? (
            <span title="Unshare this post" onClick={() => disableSharingFn(_id)} className="mr-2 relative">
            {disableSharingMutation.isPending ? <LoaderBlinker className="top-0 left-1/2 -translate-x-1/2"/> :  
            <ArchiveIcon stroke={1.5} className="text-grey-400 hover:text-purple-400 transition duration-150" />}
           </span>
           ) : (
            <span title="Share this post" onClick={() => handleSharePost(_id)} className="mr-2 relative">
             {getShareableLink.isPending ? <LoaderBlinker className="top-0 left-1/2 -translate-x-1/2"/> :  
             <ShareIcon stroke={1.5} className="text-grey-400 hover:text-purple-400 transition duration-150" />}
            </span>
           )} 
           {userId === id && (
            <span onClick={() => handleBookmark(_id)} className="relative">
            {bookMarkMutation.isPending ? <LoaderBlinker className="top-0"/> : 
            <BKIcon fill={`${isBookMark ? 'currentColor' : 'none'}`} stroke={1.5} className={`text-grey-400 hover:text-purple-400 transition duration-150 ${isBookMark ? 'text-purple-400' : ''}`}/>}
          </span>
           )} 
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
