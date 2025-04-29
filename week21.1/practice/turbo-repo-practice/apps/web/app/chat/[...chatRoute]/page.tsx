import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";

export default function ChatRoom(){

    return(
        <div>
            <Input placeholder="Enter Chat" />
            <Button appName="web">
                Send
            </Button>
        </div>
    )
}