'use client'
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { useRouter } from "next/navigation";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {

  const router = useRouter()
  
  return (
   <div>
    <Input placeholder=" " />
    <Button appName="web" onClick={() => router.push('/chat/123')}>
      Join
    </Button>
   </div>
  );
}
