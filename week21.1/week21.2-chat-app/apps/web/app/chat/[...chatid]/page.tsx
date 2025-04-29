import { Input } from "@repo/ui/input";

export default function Chat(){
    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            justifyContent:'space-between'
        }}>

            <div>ChatroOM</div>
            <div><Input placeholder='Type chat'/></div>
        </div>
    )
}