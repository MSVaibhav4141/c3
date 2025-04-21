import { useRef, useState } from "react";

export const Mid = () => {
  const isMobile = window.innerWidth <=768;
  const fileRef = useRef<HTMLImageElement>(null)
  const [effects , setEffect] = useState<string>('noHover')
  const [isClick, setClick] = useState(false)
  const hoverStyle:Record<string, string> = {
    'hover':` md:top-[90px]  rotate-10 `,
    'noHover':` md:top-[220px] -rotate-30 `,
    'true':`top-[24vmax] md:top-[90px]  rotate-10`,
    'false':`top-[45vmax] md:top-[220px] -rotate-30 `,
  }
  return (
    <>
      <div className="p-2 md:p-6">
        <div onClick={() => isMobile && setClick(prev => !prev)} onMouseEnter={() => !isMobile && setEffect('hover')} onMouseLeave={() => !isMobile && setEffect('noHover')} className="w-full max-h-[700px] md:max-h-[620px] md:min-h-[548px] px-1 bg-purple-500 h-[calc(100vh-150px)] rounded-2xl  overflow-hidden relative flex-col md:flex-row flex items-center">
          <div className="w-full h-[50%] md:w-[60%] md:h-auto">
            <p className="text-grey-50 text-[4.2vmax] text-center font-bold md:leading-[1.1] leading-[1.25] text-start md:ml-20 flex flex-col  items-center md:items-start mt-13">
              <p className="text-center md:text-start">BrainlySB</p>
              <p className="text-center md:text-start">digs up your buried</p>
              <p className="text-center md:text-start">data like it</p>
              <p className="text-center md:text-start">happened yesterday.</p>
            </p>
            
          </div>
          <div className="w-full md:w-[40%] h-[50%] md:h-full overflow-hidden re">
          <img
          ref={fileRef}
              src="/assets/yy.png"
            className={`absolute w-[180px] left-1/2 -translate-x-1/2 md:left-[80%] origin-center -rotate-30  transition-all duration-800 ease-in-out ${hoverStyle[effects]} ${isMobile && hoverStyle[isClick.toString()]}`}
              alt=""
            />
            <img
              src="/assets/ayy.png"
              className="absolute min-w-2xl md:w-xl z-[10] bottom-[-160px] md:-bottom-[50px] left-[50%] -translate-x-1/2 md:left-[80%] "
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};
