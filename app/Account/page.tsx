
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");
  return (
    <div className=" relative  pr-4 bg-background w-full  rounded-xl">
      <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4"></div>
      </header>
      <div className="flex  w-full  rounded-xl gap-4 p-4 pt-0">
        <div className="flex flex-1 rounded-xl ">
          <div className="bg-[#1768db] rounded-xl  w-full h-full">
    
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
