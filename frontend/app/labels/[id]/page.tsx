"use client";

import { Label } from "@/api/Label";
import { getLabelById } from "@/api/labels";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useQRCode } from "next-qrcode";
import { config } from "@/lib/config";

export default function LabelPage() {
  const { ready, authenticated, logout } = usePrivy();
  const pathname = usePathname();
  const labelId = pathname.split("/").pop();
  const [label, setLabel] = useState<Label | null>(null);
  const router = useRouter();
  const { Canvas } = useQRCode();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchLabel = async () => {
      if (labelId) {
        setLabel(await getLabelById(labelId));
      }
    };
    fetchLabel();
  }, [labelId]);

  const renderedLabel = label && (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{label.id}</h4>
        <p className="text-tiny uppercase font-bold">{label.name}</p>
        <p className="text-default-500">{label.description}</p>
      </CardHeader>
      <CardBody className="overflow-visible py-2 flex justify-center items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={label.base64Image}
          width={270}
        />
      </CardBody>
    </Card>
  );

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
          onClick={() => router.push("/labels")}
        >
          My Labels
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center mt-10 space-y-4">
        {/* <div className="flex justify-center items-center">
          <span className="text-6xl font-bold">{label?.id}</span>
        </div> */}
        {/* <div className="flex flex-row justify-center items-center gap-4"> */}
        {renderedLabel}

        <Button color="secondary" onPress={onOpen}>
          QR Code
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody>
                  <Canvas
                    text={`${config.host}${pathname}`} //{'https://github.com/bunlong/next-qrcode'}
                    options={{
                      errorCorrectionLevel: "M",
                      margin: 3,
                      scale: 4,
                      width: 400,
                      color: {
                        dark: "#000000ff",
                        light: "#ffffffff",
                      },
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* </div> */}
      </div>
    </div>
  );
}
