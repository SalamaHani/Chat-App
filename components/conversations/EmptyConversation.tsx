import React from "react";
import HedConversation from "./HedConversation";
import Body from "./Body";

function EmptyConversation() {
  return (
    <div className=" relative  pr-4  w-full  rounded-xl ">
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4"></div>
      </header>
      <div className="flex flex-1 w-full  p  pt-0">
        <div className="flex flex-1  ">
          <div className=" w-full h-full">
            <header className="flex rounded-t-xl rounded-tl-none    bg-white dark:bg-neutral-900 h-18  shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16">
              <div className="flex items-center gap-2 px-4">
                
                <div>
                  <div className="text-sm font-semibold">
                 
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                    
                  </div>
                </div>
                {/* <div className="text-sm font-light text-neutral-500">{textstust}</div> */}
              </div>
            </header>
            <div className=" flex  rounded-xl w-full ">
              <div className="w-full h-full overflow-hidden  ">
                <div className="max-h-125 min-h-125   overflow-y-auto  ">
                  
                </div>
                <div className="flex h-[52px]  flex-1  justify-center items-center">
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyConversation;
