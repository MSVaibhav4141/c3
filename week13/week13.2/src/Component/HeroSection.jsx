import { EventsDates } from "./EventsDates"
import { ProfileCard } from "./ProfileCard"
import { WebinarManager } from "./WebinarManager"

export const HeroSection = () => {
    return <>
    <div className="w-full h-[84%] bg-blue-200 grid grid-cols-30">
        <div className="col-span-8 px-4 relative ">
            <ProfileCard img={'/girl.png'} name={"Prabhleen Kaur"} mobNo={9899999882} email={"prabhleen@gmail.com"} address={"Delhi, India"}/>
        </div>
        <div className="col-span-13 ">
            <EventsDates numbers={4} />
        </div>
        <div className="col-span-9  px-2">
        <WebinarManager number={3}/>
        </div>
    </div>
    </>
}