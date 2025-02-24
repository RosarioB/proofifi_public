"use client";

import { Button } from "@heroui/react";
import { usePrivy, WalletWithMetadata } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import React from "react";
import { proofifiAbi } from "@/lib/proofifiAbi";
import { useReadContract } from "wagmi";
import { config } from "@/lib/config";
import { account } from "@/lib/viem";
import SubdomainForm from "./subdomainForm";
import LabelForm from "./labelForm";
import { useRouter } from "next/navigation";

export default function LabelCreatePage() {
  const { ready, authenticated, logout, user } = usePrivy();
  const { client } = useSmartWallets();
  const router = useRouter();

  const [errorSubdomainName, setErrorSubdomainName] = useState("");
  const [loadingSubdomain, setLoadingSubdomain] = useState(false);
  const [isSubdomainValid, setIsSubdomainValid] = useState(false);
  const [subdomainName, setSubdomainName] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loadingLabel, setLoadingLabel] = useState(false);
  const [errorLabel, setErrorLabel] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState("");

  const [smartWalletAddress, setSmartWalletAddress] = useState("");
  const [embeddedWalletAddress, setEmbeddedWalletAddress] = useState("");

  const { data: totalSupply, refetch: refetchTotalSupply } = useReadContract({
    account,
    abi: proofifiAbi,
    address: config.erc_721_address,
    functionName: "totalSupply",
  });

  const { data: isAllowListed, refetch: refetchIsAllowListed } =
    useReadContract({
      account,
      abi: proofifiAbi,
      address: config.erc_721_address,
      functionName: "isAllowlisted",
      args: [smartWalletAddress as `0x${string}`],
    });

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    if (client?.account.address) {
      setSmartWalletAddress(client.account.address);
      refetchIsAllowListed();
    }
  }, [client, refetchIsAllowListed]);

  useEffect(() => {
    if (user?.linkedAccounts) {
      const embeddedWallet = user?.linkedAccounts.filter(
        (account) =>
          account.type === "wallet" && account.connectorType === "embedded"
      )[0] as WalletWithMetadata;
      setEmbeddedWalletAddress(embeddedWallet.address);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div>
      <div className="p-4 flex gap-2">
        {ready && authenticated && (
          <Button radius="sm" color="danger" onPress={handleLogout}>
            Logout
          </Button>
        )}
        <Button
          radius="sm"
          color="secondary"
          onPress={() => router.push("/labels")}
        >
          My Labels
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        {isAllowListed === true && !isSubdomainValid && (
          <SubdomainForm
            smartWalletAddress={smartWalletAddress}
            loadingSubdomain={loadingSubdomain}
            setLoadingSubdomain={setLoadingSubdomain}
            subdomainName={subdomainName}
            setSubdomainName={setSubdomainName}
            errorSubdomainName={errorSubdomainName}
            setErrorSubdomainName={setErrorSubdomainName}
            setIsSubdomainValid={setIsSubdomainValid}
          />
        )}
        {isAllowListed === true && isSubdomainValid && (
          <LabelForm
            subdomainName={subdomainName}
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            loadingLabel={loadingLabel}
            setLoadingLabel={setLoadingLabel}
            errorLabel={errorLabel}
            setErrorLabel={setErrorLabel}
            smartWalletAddress={smartWalletAddress}
            totalSupply={totalSupply as number}
            embeddedWallet={embeddedWalletAddress}
            image={image}
            setImage={setImage}
            base64Image={base64Image}
            setBase64Image={setBase64Image}
            refetchTotalSupply={refetchTotalSupply}
          />
        )}
      </div>
    </div>
  );
}
