export interface Label {
  id: string;
  name: string;
  description: string;
  nftId: string;
  ipfsHash?: string;
  idPrivy?: string;
  embeddedWallet?: string;
  smartWallet?: string;
  base64Image?: string;
}
