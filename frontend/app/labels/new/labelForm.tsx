import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { baseSepolia } from "wagmi/chains";
import { uploadImage, uploadJson } from "@/lib/pinata";
import { config } from "@/lib/config";
import { encodeFunctionData } from "viem";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { proofifiAbi } from "@/lib/proofifiAbi";
import { createLabel } from "@/api/labels";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/lib/constants";
import { log, logError } from "@/lib/utils";

interface LabelFormProps {
  subdomainName: string;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  loadingLabel: boolean;
  setLoadingLabel: React.Dispatch<React.SetStateAction<boolean>>;
  errorLabel: string;
  setErrorLabel: React.Dispatch<React.SetStateAction<string>>;
  smartWalletAddress: string;
  totalSupply: number | undefined;
  embeddedWallet: string;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  base64Image: string | undefined;
  setBase64Image: React.Dispatch<React.SetStateAction<string>>;
  refetchTotalSupply: () => void;
}

const LabelForm: React.FC<LabelFormProps> = ({
  subdomainName,
  name,
  setName,
  description,
  setDescription,
  loadingLabel,
  setLoadingLabel,
  errorLabel,
  setErrorLabel,
  smartWalletAddress,
  totalSupply,
  embeddedWallet,
  image,
  setImage,
  base64Image,
  setBase64Image,
  refetchTotalSupply,
}) => {
  const { client } = useSmartWallets();
  const { user } = usePrivy();
  const router = useRouter();
  const [imageError, setImageError] = useState("");

  const mintNftTransaction = async (ipfsHash: string) => {
    return await client?.sendTransaction({
      chain: baseSepolia,
      to: config.erc_721_address,
      value: BigInt(0),
      data: encodeFunctionData({
        abi: proofifiAbi,
        functionName: "safeMint",
        args: [smartWalletAddress as `0x${string}`, `ipfs://${ipfsHash}`],
      }),
    });
  };

  const handleSubmitLabel = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingLabel(true);
    setErrorLabel("");
    e.preventDefault();
    try {
      let imageHash: string = "";
      if (image) {
        imageHash = await uploadImage(image);
        log(`Image hash: ${imageHash}`);
      }

      const jsonHash = await uploadJson(
        name,
        description,
        subdomainName,
        imageHash!
      );
      log(`Json hash: ${jsonHash}`);

      const idPrivy = user?.id || "";

      const tx = await mintNftTransaction(jsonHash);
      log(`Transaction hash minting NFT: ${tx}`);
      refetchTotalSupply();
      
      await createLabel(
        subdomainName,
        name,
        description,
        totalSupply!.toString(),
        jsonHash,
        idPrivy,
        embeddedWallet,
        smartWalletAddress,
        base64Image
      );
      log(`Label created in the backed`);
      router.push(`/labels/${subdomainName}.${DOMAIN}`);
    } catch (error) {
      logError("Error creating label", error);
      setErrorLabel("An error occurred while creating the label");
      setLoadingLabel(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageError("");
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Validate file size
      const maxSizeMB = 1;
      if (file.size > maxSizeMB * 1024 * 1024) {
        setImageError("Image size must be less than 1 MB.");
        setImage(null);
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setBase64Image(reader.result as string);
      };
    }
  };

  return (
    <form
      className="flex flex-col items-center gap-4 w-full"
      onSubmit={handleSubmitLabel}
    >
      <span className="text-6xl font-bold mb-6">Create New Label</span>
      <span className="text-2xl font-bold mb-6">
        {subdomainName}.proofifi.eth
      </span>
      <Input
        size="sm"
        label="Name"
        className="w-1/4"
        value={name}
        isRequired
        isClearable
        onValueChange={setName}
      />
      <Input
        size="sm"
        label="Description"
        className="w-1/4"
        value={description}
        isRequired
        isClearable
        onValueChange={setDescription}
      />
      <Input
        size="sm"
        label="Picture"
        className="w-1/4"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      {imageError && (
        <div className="text-red-500 text-md text-center">{imageError}</div>
      )}
      <Button
        type="submit"
        radius="sm"
        color="secondary"
        disabled={loadingLabel}
        isLoading={loadingLabel}
      >
        Create Label
      </Button>
      {errorLabel && (
        <div className="text-red-500 text-md text-center">{errorLabel}</div>
      )}
    </form>
  );
};

export default LabelForm;
