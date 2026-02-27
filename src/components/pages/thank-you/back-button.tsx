"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function ThankYouBackButton() {
  const router = useRouter();
  return (
    <Button variant={"outline-primary"} onClick={() => router.back()}>
      Schließen
    </Button>
  );
}

