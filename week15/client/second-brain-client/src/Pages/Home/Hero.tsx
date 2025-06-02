import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect, useRef, useState } from "react"

export const Hero = () => {

    const brainRef = useRef<HTMLImageElement>(null)
    const heroRef = useRef<HTMLHeadingElement>(null)
    const heroRef1 = useRef<HTMLHeadingElement>(null)
    const heroH2Ref = useRef<HTMLHeadingElement>(null)
    const heroH2Ref2 = useRef<HTMLHeadingElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)
    const spanRef_1 = useRef<HTMLSpanElement>(null)
    const spanRef1 = useRef<HTMLSpanElement>(null)
    const spanRef1_1 = useRef<HTMLSpanElement>(null)
    const spanRef2 = useRef<HTMLSpanElement>(null)
    const spanRef2_1 = useRef<HTMLSpanElement>(null)

    useGSAP(() => {
        gsap.to(brainRef.current, {
            y: -12,                  
            duration: 0.9,          
            ease: "power1.inOut",    
            yoyo: true,              
            repeat: -1               
          });
    })
    
    const isMobile = window.innerWidth <= 768;
    const isTab = window.innerWidth <= 1200;
    const isWindow = window.innerWidth <= 1320;
    const exceptionWidth = window.innerWidth >= 400 && window.innerWidth <= 640 ;
    const handleMouseEnter = () => {
      
        gsap.to(brainRef.current, {
            scale:1.2,                 
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroRef.current, {
            y: -1000,                  
            duration: 0.1,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroH2Ref.current, {
            y: -1000,                  
            duration: 0.2,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroH2Ref2.current, {
            y: -1000,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroRef1.current, {
            y: 450,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef.current, {
            y:isMobile?-680: -740,
            x:isMobile? -90 :(isTab ? -200 : (isWindow ?-300 :-390)) ,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef_1.current, {
          y:isMobile?-680: -740,
          x:isMobile? 90 :(isTab ? 200 :(isWindow ?300 :390)),
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef1.current, {
            y: -580,
            x:isWindow ?-450 : -500,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef1_1.current, {
            y: -580,
            x:isWindow ? 450 : 500,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef2.current, {
            y: -410,
            x:-470,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef2_1.current, {
            y: -410,
            x:470,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
    }
    const handleMouseLeave = () => {
        gsap.to(brainRef.current, {
            scale:1,                 
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroRef.current, {
            y: 0,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroH2Ref.current, {
            y: 0,                  
            duration: 0.2,          
            ease: "power1.inOut",                  
          });
        gsap.to(heroH2Ref2.current, {
            y: 0,                  
            duration: 0.2,          
            ease: "power1.inOut",                  
          });
          gsap.to(heroRef1.current, {
            y: 0,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
          gsap.to(spanRef.current, {
            y: 0,
            x: 0,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef_1.current, {
            y: 0,
            x:0,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef1.current, {
            y: 0,
            x: 0,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef1_1.current, {
            y:0,
            x:0,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef2.current, {
            y: 0,
            x: 0,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          });
        gsap.to(spanRef2_1.current, {
            y: 0,
            x: 0,
            opacity:1,                  
            duration: 0.3,          
            ease: "power1.inOut",                  
          }); 
    }

    const defaultStyle ={
     style:`absolute left-[50%] -translate-1/2  -bottom-100 border-2 border-purple-500 w-35 md:w-60 rounded-lg  px-2 py-3 text-sm md:text-lg lg:text-xl xl:text-2xl font-semibold hidden xl:block`
    }

    const defaultStyling = {
      style:'text-center font-bold leading-[1.1] text-3xl md:text-[4.5vmax]'
  }

  const [isClicked, setClick] = useState(false)

  useEffect(() => {
    isClicked ? handleMouseEnter() : handleMouseLeave()
  },[isClicked])
      return(
        <>
        <div className="p-2 md:p-6">
        <div  className={`w-full max-h-[500px] md:max-h-[800px] md:min-h-[650px] bg-purple-100 h-[calc(100vh-70px)] rounded-2xl pt-10 overflow-hidden relative text-grey-400  ${defaultStyling.style}`}>
            <h1  ref={heroRef} className="text-purple-300 text-4xl md:text-[5vmax] ">Introducing Brain</h1>
            <h2  ref={heroH2Ref} >Never miss content you</h2>
            <h2  ref={heroH2Ref2} >meant to revisit!</h2>
            <img ref={brainRef} onClick={() => isMobile && setClick(prev => !prev)} onMouseEnter={() => !isMobile && handleMouseEnter()} onMouseLeave={() => !isMobile && handleMouseLeave()}className={`absolute left-[50%] -bottom-30 sm:-bottom-60 md:-bottom-70 -translate-x-1/2 w-lg h-lg  md:w-xl lg:w-2xl md:h-xl lg:h-2xl ${exceptionWidth ? '-bottom-60' : ''}` } src="/assets/brain.png" alt="" />
            <h1  ref={heroRef1}  className="absolute w-full  -top-100 left-[50%] -translate-x-1/2 text-purple-300 text-3xl md:text-[5vmax] ">Is there any solution?</h1>
            <span ref={spanRef} className={`${defaultStyle.style} !block`}>I can't remeber the title!!!</span>
            <span ref={spanRef_1}className={`${defaultStyle.style} !block`}>I can't remeber the title!!!</span>
            <span ref={spanRef1} className={defaultStyle.style}>I can't remeber the title!!!</span>
            <span ref={spanRef1_1} className={defaultStyle.style}>I can't remeber the title!!!</span>
            <span ref={spanRef2}className={defaultStyle.style}>I can't remeber the title!!!</span>
            <span ref={spanRef2_1} className={defaultStyle.style}>I can't remeber the title!!!</span>
        </div>
        </div>
        </>
    )
} 