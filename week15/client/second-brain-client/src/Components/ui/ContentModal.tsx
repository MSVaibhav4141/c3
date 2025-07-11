import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Button } from "./Button";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContent } from "../../api/createContent";
import { toast } from "react-toastify";
import { throwAxiosError } from "../../handleAxioserr";
import { getTypes } from "../../api/getType";
import { TagInput } from "./TagInput";
import { ToggleSwitch } from "./ToggleSwitch";
import { useAuth } from "../../context/AuthContent";


type thisModalProp = {
  setOpen:Dispatch<SetStateAction<boolean>>
  isGemini:boolean
}
export const ContentModal = (props:thisModalProp) => {

  const {username} = useAuth()
  //Inital value for payloads
  const initialLink = {
    link: "",
    title: "",
    tags: [""],
  };
  const initialNotes = {
    title: "",
    tags: [""],
  };


  //Define payloads schema
  const payloadSchemaLink = z.object({
    link: z.string(),
    title: z.string(),
    tags: z.array(z.string()),
  });
  const payloadSchemaNotes = z.object({
    title: z.string(),
    tags: z.array(z.string()),
  });

  // Infering there types
  type linkPayload = z.infer<typeof payloadSchemaLink>;
  type notesPayload = z.infer<typeof payloadSchemaNotes>;

  const queryClient = useQueryClient()


  const [payloadLink, setPayloadLink] = useState<linkPayload>(initialLink);
  const [payloadNotes, setPayloadNotes] = useState<notesPayload>(initialNotes);
  const [contentType, setType] = useState<"link" | "notes">("link");
  const [tagArray, setTag] = useState<string[]>([]);
  const [tagArrayNotes, setTagNotes] = useState<string[]>([]);
  const [tagInput, setInput] = useState('');
  const [notes , setNotes] = useState(false)
  const [type, settype] = useState<string>();
  const [typeNotes, settypeNotes] = useState<string>();
  const suggestedTag = useRef<Record<string, string>[]>([])

  const defaultButtonStyle = {
    style: `w-[48%] border-1 border-gray-200 rounded-md flex items-center justify-center p-4  cursor-pointer hover:border-purple-500 transition duration-150 font-medium`,
  };

  const inputStyle = {
    style:
      "w-full p-3 h-12 mt-4 focus:outline-none focus:border-gray-600 border-1 rounded-md border-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed",
  };
  const buttonEnabledState: Record<string, string> = {
    link: "border-purple-500 border-2 bg-purple-200",
    notes: "border-purple-500 border-2 bg-purple-200",
  };


  //When types are getting changed
  const handleTypeChange = (type: "link" | "notes") => {
    setType(type);
  };




  //Hadnling input changes == setting payloads
  const handleModaInputChage = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    if (contentType === "link") {
      const { name, value } = e.currentTarget;
      if (name !== "tags") {
        setPayloadLink((prev) => ({ ...prev, [name]: value }));
      }
    }
    if (contentType === "notes") {
      const { name, value } = e.currentTarget;
      if (name !== "tags") {
        setPayloadNotes((prev) => ({ ...prev, [name]: value }));
      }
    }
  };


  // Mutation for creating post

  const createPost = useMutation({
    mutationFn: createContent,
    onSuccess:(data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({queryKey:["user-content", username]})
      props.setOpen(false)
    },
    onError:throwAxiosError
  });


  const getType = useMutation({
    mutationFn:getTypes,
    onSuccess:(data) => {
      setTag(data.message.topTags.map(i => i?.name))
      contentType === 'link' ?  settype(data.message.category) :settypeNotes(data.message.category)
      setPayloadLink(prev => ({...prev,title:data.message.title}))
      suggestedTag.current = data.message.suggested
    },
    onError:throwAxiosError
  })

  const handleSubmit = () => {
    contentType === 'link' ?
    type && createPost.mutate({data:{...payloadLink, type:type},token:localStorage.getItem('authorization') }) :
    createPost.mutate({data:{...payloadNotes, type:typeNotes!},token:localStorage.getItem('authorization') })
  };


  useEffect(() => {
    setPayloadLink(prev => ({...prev,tags:tagArray}))
  } ,[tagArray])

// Handling blur on Link

const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {

  if((e.currentTarget.value.length > 0 && (!type || !typeNotes))){
  const data = contentType === 'link' ?  {
    link:e.currentTarget.value,
    token: localStorage.getItem('authorization')
  } :
  {
    title:e.currentTarget.value,
    token: localStorage.getItem('authorization')
  }
  getType.mutate(data)
}
}


  return (
    <form className="pt-4 bg-modal md:w-lg w-[calc(100vw-15px)] rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
      <div className="w-full flex justify-between">
        <div
          onClick={() => handleTypeChange("link")}
          className={`${defaultButtonStyle.style} ${
            contentType === "link" && buttonEnabledState[contentType]
          }`}
        >
          Link
        </div>
        <div
          onClick={() => handleTypeChange("notes")}
          className={`${defaultButtonStyle.style} ${
            contentType === "notes" && buttonEnabledState[contentType]
          }`}
        >
          Notes
        </div>
      </div>
      {contentType === "link" && (
        <div>
          <input
            disabled={getType.isSuccess}
            onChange={handleModaInputChage}
            onBlur={(e) => {props.isGemini && handleBlur(e)}}
            type="text"
            placeholder="Link"
            name="link"
            className={`${inputStyle.style}`}
            />
        </div>
      )}
      <div>
        <input
          name="title"
          onChange={handleModaInputChage}
          onBlur={(e) => {contentType === 'notes' && props.isGemini && handleBlur(e)}}
          type="text"
          value={contentType === 'link' ? payloadLink.title : payloadNotes.title}
          placeholder="title"
          className={`${inputStyle.style}`}
        />
        {contentType === 'notes' && (
          <div>
            <div className="flex mt-4">
                <label className="mr-2" htmlFor="check">Wants to notes more?</label>
                  <ToggleSwitch onChange={() => setNotes(prev => !prev)} w={40} h={25}  />
                  </div>
          {notes && (
                      <textarea name="body" onChange={handleModaInputChage} rows={6} className={`${inputStyle.style} h-auto`} placeholder="Write Here"></textarea>
          )}
          </div>
        )}
        {contentType === 'link' ? 
          <TagInput tagArray={tagArray} tagInput={tagInput} setInput={setInput} setTag={setTag} inputClassName={inputStyle.style} limit={3}/>

        :(
          <TagInput tagArray={tagArrayNotes} tagInput={tagInput} setInput={setInput} setTag={setTagNotes} inputClassName={inputStyle.style} limit={3}/>
        )}

        {suggestedTag.current.length > 0 && (
          <div className="flex flex-wrap items-center text-sm mt-4">
          <span>Suggested:</span>
          {suggestedTag.current.map((i, index) => (
            <div
              className="bg-gray-500/30 rounded-sm hover:bg-green-500/30 mr-1 px-2 py-1 text-xs"
              key={index}
              onClick={() => contentType==='link' ? setTag(prev => [...prev,i.name]) : setTagNotes(prev => [...prev,i.name])}
            >
              {i.name}
            </div>
          ))}
        </div>
        )}

        <Button
          onClick={handleSubmit}
          loading={createPost.isPending}
          disabled={getType.isPending}
          size="md"
          title="Add"
          variant="primary"
          className="w-full p-3 mt-4 text-purple-500"
        />
      </div>
    </form>
  );
};
