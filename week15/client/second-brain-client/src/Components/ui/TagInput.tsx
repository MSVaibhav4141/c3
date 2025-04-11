import { Dispatch, SetStateAction, useEffect, useRef } from "react";

type tagInputType = {
    setInput: Dispatch<SetStateAction<string>>,
    tagArray: string[],
    setTag:Dispatch<SetStateAction<string[]>>
    tagInput:string,
    limit?:number,
    inputClassName?:string,
    tagsClassName?:string
}



export const TagInput = (props : tagInputType) => {

      const {inputClassName, tagsClassName,tagArray, tagInput, setInput, setTag, limit} = props
          const valueAfterBackspace = useRef<string>('');
        
      const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    
        const value = e.currentTarget.value;
        setInput(value);
    
        if(tagArray.length === 2 && value.split(' ')[1] === '' && value.trim().length > 0){
          setTag(prev => [...prev,value.split(" ")[0]])
          setInput('')
          return;
        }
        
        if (value.trim().split(" ").length > 1) {
          const tags = e.currentTarget.value?.split(" ");
          setTag((prev) => [...prev, tags[0].trim()]);      //Updating payload tags to be in sync with actual tags array

          setInput(tags[1] );
        }
      };
    
      
      const handleBackSpace = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.currentTarget;
        const tagArrayCopy = [...tagArray]
        const tagArrayLength = tagArrayCopy.length;
        console.log(tagArrayLength)
        if(value.length === 0 ){
          valueAfterBackspace.current = '';
        }
        if(value.length === 0 && tagArrayLength > 0){
          const lastTagValue = tagArray[tagArrayLength - 1]
          tagArrayCopy.splice(tagArrayLength - 1,1)
          setTag(tagArrayCopy)
        //   valueAfterBackspace.current = lastTagValue;
          setInput(lastTagValue);
        }
      }
    
    
      const removeTags = (index: number) => {
        const tagArrayCopy = [...tagArray];
        tagArrayCopy.splice(index, 1);
        setTag(tagArrayCopy); //Updating payload tags to be in sync with actual tags array
      };
    
      useEffect(() => {
        limit && tagArray.splice(limit,1)
      },[tagArray])

    return <>
    
    <div className= {`!flex !items-center ${inputClassName}`}>
        <div className="flex items-center">
          {tagArray.map((i, index) => (
            <div
              className={`bg-green-500/30 rounded-sm hover:bg-red-300 mr-1 px-2 py-1 text-xs ${tagsClassName}`}
              key={index}
              onClick={() => removeTags(index)}
            >
              {i}
            </div>
          ))}
        </div>
        <input
          name="tags"
          value={tagInput}
          onChange={(e) => {
            handleTags(e);
            handleBackSpace(e)
            
          }}
          type="text"
          placeholder={tagArray.length > 0 ? "" : "tags"}
          className={`outline-none border-0 max-w-auto`}
          disabled={tagArray.length > 2}
        />
        
        </div>
    </>
}