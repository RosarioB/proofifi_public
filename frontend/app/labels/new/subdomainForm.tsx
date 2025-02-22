import React from "react";
import { Button, Input } from "@heroui/react";
import { isSubdomainExistent } from "@/api/labels";
import { log } from "@/lib/utils";

interface SubdomainFormProps {
  smartWalletAddress: string | undefined;
  loadingSubdomain: boolean;
  setLoadingSubdomain: React.Dispatch<React.SetStateAction<boolean>>;
  subdomainName: string;
  setSubdomainName: React.Dispatch<React.SetStateAction<string>>;
  errorSubdomainName: string;
  setErrorSubdomainName: React.Dispatch<React.SetStateAction<string>>;
  setIsSubdomainValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const isValidSubdomain = (subdomainName: string) => {
  if (subdomainName === "") {
    return true;
  }
  return /^[a-zA-Z0-9]+$/.test(subdomainName);
};

export default function SubdomainForm({
  smartWalletAddress,
  loadingSubdomain,
  setLoadingSubdomain,
  subdomainName,
  setSubdomainName,
  errorSubdomainName,
  setErrorSubdomainName,
  setIsSubdomainValid,
}: SubdomainFormProps) {
  const handleSubmitSubdomain = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingSubdomain(true);
    setErrorSubdomainName("");
    e.preventDefault();
    if (subdomainName === "") {
      setErrorSubdomainName("Subdomain name cannot be empty");
      setLoadingSubdomain(false);
      return;
    }

    if (!smartWalletAddress) {
      log("Smart wallet address is undefined");
      setLoadingSubdomain(false);
      return;
    }

    const isExistent = await isSubdomainExistent(subdomainName);
    if (isExistent) {
      setErrorSubdomainName("Subdomain already exists. Choose another name");
      setLoadingSubdomain(false);
      return;
    }
    setIsSubdomainValid(true);
    setLoadingSubdomain(false);
  };

  return (
    <form
      className="flex flex-col items-center gap-4 w-full"
      onSubmit={handleSubmitSubdomain}
    >
      <span className="text-6xl font-bold mb-6">Choose Subdomain</span>
      <Input
        size="sm"
        label="Subdomain Name"
        className="w-1/4"
        value={subdomainName}
        isRequired
        isClearable
        isInvalid={!isValidSubdomain(subdomainName)}
        color={!isValidSubdomain(subdomainName) ? "danger" : "default"}
        errorMessage="Only alphanumeric characters are allowed"
        onValueChange={setSubdomainName}
      />
      {errorSubdomainName && (
        <div className="text-red-500 text-md text-center">
          {errorSubdomainName}
        </div>
      )}
      <Button
        type="submit"
        radius="sm"
        color="secondary"
        disabled={loadingSubdomain || subdomainName === ""}
        isLoading={loadingSubdomain}
      >
        Set Subdomain
      </Button>
    </form>
  );
}
