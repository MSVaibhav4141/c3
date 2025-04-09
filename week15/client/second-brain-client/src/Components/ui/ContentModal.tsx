import React, { ChangeEvent, useState } from "react";
import { Button } from "./Button";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { createContent } from "../../api/createContent";

export const ContentModal = () => {
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

  const tagInpuShape = {
    link: "",
    notes: "",
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

  const [payloadLink, setPayloadLink] = useState<linkPayload>(initialLink);
  const [payloadNotes, setPayloadNotes] = useState<notesPayload>(initialNotes);
  const [contentType, setType] = useState<"link" | "notes">("link");
  const [tagArray, setTag] = useState<string[]>([]);
  const [tagInput, setInput] = useState(tagInpuShape);
  const [isZodError, setZodError] = useState('')
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

  //Updating tags array and payload's tag accordingly
  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setInput((prev) => ({ ...prev, [contentType]: value }));
    if (tagInput[contentType].split(" ").length > 1) {
      const tags = e.currentTarget.value?.split(" ");
      setTag((prev) => [...prev, tags[0].trim()]); //Updating payload tags to be in sync with actual tags array
      contentType === "link"
        ? setPayloadLink((prev) => ({
            ...prev,
            tags: [...tagArray, tags[0].trim()],
          }))
        : setPayloadNotes((prev) => ({
            ...prev,
            tags: [...tagArray, tags[0].trim()],
          }));
      setInput((prev) => ({ ...prev, [contentType]: "" }));
    }
  };

  const removeTags = (index: number) => {
    const tagArrayCopy = [...tagArray];
    tagArrayCopy.splice(index, 1);
    setTag(tagArrayCopy); //Updating payload tags to be in sync with actual tags array
    contentType === "link"
      ? setPayloadLink((prev) => ({ ...prev, tags: tagArrayCopy }))
      : setPayloadNotes((prev) => ({ ...prev, tags: tagArrayCopy }));
  };

  //Hadnling input changes == setting payloads
  const handleModaInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  //ccheckng for valid link
  const checkInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const zodLink = z.string().url({message:"Enter a valid link"})
    const isError =  zodLink.safeParse(e.currentTarget.value)
    console.log(isError)
  }

  const createPost = useMutation({
    mutationFn: createContent,
  });

  const handleSubmit = () => {
    // createPost.mutate(payloadLink)
  };
  return (
    <div className="pt-4 max-w-1/3 bg-modal  rounded-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8">
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
            onChange={handleModaInputChage}
            type="text"
            placeholder="Link"
            name="link"
            className={`${inputStyle.style}`}
          />
        </div>
      )}
      <div>
        <input
        onBlur={checkInput}
          name="title"
          onChange={handleModaInputChage}
          type="text"
          placeholder="title"
          className={`${inputStyle.style}`}
        />
        <input
          name="tags"
          value={tagInput[contentType]}
          onChange={(e) => {
            handleTags(e);
          }}
          type="text"
          placeholder="tags"
          className={`${inputStyle.style}`}
          disabled={tagArray.length > 2}
        />
        <div className="flex flex-wrap">
          {tagArray.map((i, index) => (
            <div
              className="bg-green-500/30 rounded-sm hover:bg-red-300 mr-1 px-2 py-1 text-xs mt-2"
              key={index}
              onClick={() => removeTags(index)} 
            >
              {i}
            </div>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          size="md"
          title="Add"
          variant="primary"
          className="w-full p-3 mt-4 text-purple-500"
        />
      </div>
    </div>
  );
};
