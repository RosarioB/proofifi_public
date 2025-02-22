"use client";

import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { Button, Card, CardHeader, CardBody, Image } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { getLabelsBySmartWallet } from "@/api/labels";
import { Label } from "@/api/Label";
import { account } from "@/lib/viem";
import {
  createAllowedContract,
  isAllowedContract,
} from "../../api/allowedContracts";
import { config } from "@/lib/config";
import { proofifiAbi } from "@/lib/proofifiAbi";
import { useWriteContract } from "wagmi";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { log } from "@/lib/utils";

export default function LabelsPage() {
  const { ready, authenticated, logout } = usePrivy();
  const [labels, setLabels] = useState<Label[]>([]);
  const [smartWallet, setSmartWallet] = useState("");
  const router = useRouter();
  const { client } = useSmartWallets();
  const { writeContract } = useWriteContract();

  useEffect(() => {
    const fetchSmartWallet = async () => {
      if (client && client.account.address) {
        setSmartWallet(client.account.address);
      }
    };
    fetchSmartWallet();
  }, [client]);

  useEffect(() => {
    const fetchLabels = async () => {
      if (smartWallet) {
        const labels = await getLabelsBySmartWallet(smartWallet);
        if (labels) {
          setLabels(labels);
        }
      }
    };
    fetchLabels();
  }, [smartWallet]);

  useEffect(() => {
    if (ready && !authenticated) {
      router.push("/");
    }
  }, [ready, authenticated, router]);

  useEffect(() => {
    const setAllowedSmartAccount = async () => {
      if (smartWallet) {
        const isAllowedSmartAccount = await isAllowedContract(smartWallet);
        log(`Is allowed smart account ${isAllowedSmartAccount}`);
        if (!isAllowedSmartAccount) {
          writeContract({
            account,
            address: config.erc_721_address,
            abi: proofifiAbi,
            functionName: "addToAllowlist",
            args: [smartWallet as `0x${string}`],
          });
          log(`Allowing smart account  ${smartWallet}`);
          await createAllowedContract(smartWallet);
          log(`Writing to backend ${smartWallet}`);
        }
      }
    };
    setAllowedSmartAccount();
  }, [smartWallet, writeContract]);

  const renderedLabels = labels.map((label) => (
    <div key={label.id} onClick={() => router.push(`/labels/${label.id}`)}>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{label.id}</h4>
          {/* <p className="text-tiny uppercase font-bold">{label.name}</p> */}
          {/* <p className="text-default-500">{label.description}</p> */}
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={label.base64Image}
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  ));

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div>
      <div className="p-4 flex gap-2">
        {ready && authenticated && (
          <Button radius="sm" color="danger" onClick={handleLogout}>
            Logout
          </Button>
        )}
        <Button
          radius="sm"
          color="secondary"
          onClick={() => router.push("/labels/new")}
        >
          Create Label
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 space-y-10">
        <div className="flex justify-center items-center">
          <span className="text-6xl font-bold">My Labels</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-4">
          {renderedLabels}
        </div>
      </div>
    </div>
  );
}
