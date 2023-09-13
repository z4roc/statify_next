"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  router.push("/");
  return <h1>This worked!</h1>;
}
