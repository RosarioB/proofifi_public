import { PinataSDK } from "pinata-web3";
import { DOMAIN } from "./constants";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.NEXT_PUBLIC_PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
});

export const uploadImage = async (file: File) => {
  const {IpfsHash: imageHash} = await pinata.upload.file(file);
  return imageHash;
};

export const uploadJson = async (
  name: string,
  description: string,
  subdomain: string,
  imageHash: string
) => {
  const { IpfsHash: jsonHash } = await pinata.upload.json({
    name: name,
    description: description,
    subdomain: `${subdomain}.${DOMAIN}`,
    image: `ipfs://${imageHash}`,
  });
  return jsonHash;
};
