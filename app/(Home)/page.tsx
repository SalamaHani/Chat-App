import Continer from "@/components/global/Continer";
import HeroSection from "@/components/home/HeroSection";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="h-[100vh]">
      <HeroSection />
      <Continer>
        <Suspense></Suspense>
      </Continer>
    </div>
  );
}
