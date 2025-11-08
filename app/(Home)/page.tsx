import Continer from "@/components/global/Continer";
import HeroSection from "@/components/home/HeroSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-[200vh]">
      <HeroSection />
      <Continer>
        <Suspense></Suspense>
      </Continer>
    </div>
  );
}
