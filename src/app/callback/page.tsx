"use client";

import { Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    
    router.push("/");

  }, [])
  
  return (
    <div className="flex flex-col h-screen w-full items-center gap-4 justify-center">
      <h1 className="text-4xl">Loading Account Info...</h1>
      <Spinner/>
    </div>
  )
}
