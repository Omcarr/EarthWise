"use client";
import React from "react";
import { Boxes } from "../../ui/background-boxes";
import { cn } from "../../lib/utils";

export function Begin() {
  return (
    <div className="h-screen  relative w-full overflow-hidden bg-teal-900 flex flex-col items-center justify-center ">
      {/* <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" /> */}
      <div className="h-screen-3/4">
        <Boxes />
      </div>
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Eco Something
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Description jo bhi hai
      </p>
    </div>
  );
}
