import { LinkedinIcon, MailIcon, XIcon } from "../../Components/ui/Icons"

export const Footer = () => {

    return <>
 <div className="p-2 md:p-6 text-grey-400 border-border-color border-t-2">
 <div  className={`bg-mode h-[400px] rounded-xl flex flex-col justify-between md:flex-row md:items-center px-5 w-full md:justify-between  md:px-10 py-6 md:py-0 sm:px-10 border-border-color shadow-xl  md`}>
    <div className="flex items-center">
    <p className="text-3xl font-bold ">Brainly<span className="text-purple-400">SB</span> <br/><span className="font-light text-sm">Save. Search. Smile. Brainly SB</span></p>
    </div>

    <div className="flex md:flex-col items-center">
        <img src="/assets/user.jpg" className="w-[100px] h-[100px] rounded-full mb-2 mr-2 md:mr-0"/>
        <p className="font-bold text-3xl">Vaibhav<span className="text-purple-500">MS</span></p>
        <div className="flex text-lg font-semibold w-full hidden md:flex">
        <span className="mx-10 mt-6 hover:text-purple-400 transition-all duration-200 ease-in-out cursor-pointer"><p>About</p></span>
        <span className="mx-10 mt-6 hover:text-purple-400 transition-all duration-200 ease-in-out cursor-pointer"><p>Project</p></span>
        <span className="mx-10 mt-6 hover:text-purple-400 transition-all duration-200 ease-in-out cursor-pointer"><p>Contact</p></span>
        </div>
        </div>

        <div className="mt-4">
        {/* <p className="font-bold text-3xl text-grey-400"> <span className="text-purple-400">Lets</span> Connect</p> */}
        <div className="flex mt-2 w-full justify-start md:justify-end">
        <a href="https://x.com/vaibhav41411?t=bDvffbjZiuE1c8JuFHEKHQ&s=09" target="_blank" rel="noopener noreferrer">
  <XIcon className="mx-3 cursor-pointer hover:text-purple-400 duration-300 transition bg-purple-200/50 rounded-full !w-12 !h-12 p-2 !m-0"/>
</a>

<a href="mailto:vaibhavsingh4141@gmail.com">
  <MailIcon className="mx-5 cursor-pointer hover:text-purple-400 duration-300 transition bg-purple-200/50 rounded-full !w-12 !h-12 p-2" stroke={2}/>
</a>

<a href="https://in.linkedin.com/in/vaibhavms4141" target="_blank" rel="noopener noreferrer">
  <LinkedinIcon className="mx-3 cursor-pointer hover:text-purple-400 duration-300 transition bg-purple-200/50 rounded-full !w-12 !h-12 p-2 !ml-0"/>
</a>

        </div>
            <p className="mt-6 ">BrainlySB made with 🩷 by VaibhavMS</p>

    </div>
    </div>
 
</div>
    
        </>
}