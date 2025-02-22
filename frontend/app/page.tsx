"use client";

import { useRouter } from "next/navigation";
import { Button, Image } from "@heroui/react";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();
  const { login } = useLogin();

  useEffect(() => {
    if (ready && authenticated) {
      router.push("/labels");
    }
  }, [ready, authenticated, router]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
      <div className="text-6xl font-bold">Proofifi</div>
      <Image
        src="/images/logo_proofifi.png"
        width={200}
        height={200}
        alt="Proofifi Logo"
      />
      {ready && !authenticated && (
        <Button radius="sm" color="secondary" onClick={() => login()}>
          Login
        </Button>
      )}
    </div>
  );
}
