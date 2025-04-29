'use client'
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useRouter } from "next/navigation";
import { useRef } from "react";
export default function Home(){

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  return(
    <div>
      <Input reference={inputRef} placeholder="Enter the room id"/>
      <Button appName="web" onClick={() => router.push(`/chat/123${inputRef.current?.value}`)}>
        Join the room
      </Button>
    </div>
  )
}