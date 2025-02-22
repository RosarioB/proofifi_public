# Proofifi_project

## Frontend
```bash
cd frontend
```

1. Clone the repository
2. Install dependencies:

```bash
pnpm i
```

3. Set up your environment variables:

Create a `.env.local` file in the root directory with:

```
NEXT_PUBLIC_HOST=
NEXT_PUBLIC_PRIVY_APP_ID=
NEXT_PUBLIC_PINATA_JWT=
NEXT_PUBLIC_PINATA_GATEWAY_URL=
NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA=
NEXT_PUBLIC_BACKEND_URL=
NEXT_PUBLIC_ERC721_ADDRESS=
NEXT_PUBLIC_ERC721_OWNER=
NEXT_PUBLIC_ERC721_OWNER_PK=
```

4. Run the development server:

```bash
pnpm run dev
```

## Backend
```bash
cd backend
```

1. Clone the repository
2. Install dependencies:

```bash
pnpm i
```

3. Create a file `.env` in the root directory with:
```
DATABASE_URL="mongodb://root:prisma@localhost:27017/proofifi?authSource=admin&retryWrites=false"
SSL_CERTIFICATE_KEY_PATH=
SSL_CERTIFICATE_PATH=
```
4. Run the server

```bash
pnpm run dev
```

## API Endpoints - Labels
### Create a New Label
POST http://localhost:3001/labels
```
{
    "id": "qualcosa.proofifi.eth",
    "name": "il mio nome",
    "description": "la mia descrizione",
    "nftId":"0",
    "ipfsHash": "bafkreifoxfthxbfd6yhw62yzpubb64ug2aruula2qbdcgaxatab6ktjp2e",
    "idPrivy": "did:privy:cm1wdlgcc061614ftjjao2iey",
    "embeddedWallet": "0x164fb75040A0622Cd89D607C247d0932Ecb08482",
    "smartWallet": "0x698Ac142767693Ea76b64202b618655858215289",
    "base64Image": ""
}
```

### Get All Labels
GET http://localhost:3001/labels

### Get a Label by ID
GET http://localhost:3001/labels/qualcosa.proofifi.eth

### Delete a Label by ID
DELETE http://localhost:3001/labels/qualcosa.proofifi.eth

### Update a Label by ID
PUT http://localhost:3001/labels/qualcosa.proofifi.eth
```
{
    "id": "qualcosa.proofifi.eth",
    "name": "nome aggiornato",
    "description": "la mia descrizione",
    "nftId":"0",
    "ipfsHash": "bafkreifoxfthxbfd6yhw62yzpubb64ug2aruula2qbdcgaxatab6ktjp2e",
    "idPrivy": "did:privy:cm1wdlgcc061614ftjjao2iey",
    "embeddedWallet": "0x164fb75040A0622Cd89D607C247d0932Ecb08482",
    "smartWallet": "0x698Ac142767693Ea76b64202b618655858215289",
    "base64Image": ""
}
```

### Check if SmartWallet Exists
GET http://localhost:3001/labels/check-smartwallet/0x698Ac142767693Ea76b64202b618655858215289

```
{
    "status": true,
    "message": "SmartWallet found",
    "data": {
        "labelId": "6723516539e494d7cf578741"
    }
}
```

### Get Labels By Smart Wallet
GET http://localhost:3001/labels/smartwallet/0x698Ac142767693Ea76b64202b618655858215289

## API Endpoints - Allowed Contracts
### Get All Allowed Contracts
GET http://localhost:3001/allowed-contracts

### Create a New Allowed Contract
POST http://localhost:3001/allowed-contracts/
```
{
    "id": "0x698Ac142767693Ea76b64202b618655858215282"
}
```

### Delete an Allowed Contract
DELETE http://localhost:3001/allowed-contracts/0x698Ac142767693Ea76b64202b618655858215289

## Docker Test
Creates a mongodb to test locally.
`cd docker/test` 

1. Run the docker-compose file:

```bash
docker-compose up -d
```
2. (Not Mandatory) Create a database `proofifi` and the collection `Label` with mongo

3. Generate Prisma client by running : `npx prisma generate`. 

Note: Each time you modify `prisma/schema.prisma` run `pnpm run prisma` or `npx prisma generate`

### Useful commands:

```
docker exec -it mongo mongo -u root -p prisma --authenticationDatabase admin 

use proofifi

show collections

db.Label.insertOne({ subdomain: "qualcosa.proofifi.eth", name: "il mio nome", description: "la mia descrizione", nftdId: "1",
"ipfsHash": "bafkreifoxfthxbfd6yhw62yzpubb64ug2aruula2qbdcgaxatab6ktjp2e", idPrivy: "did:privy:cm1wdlgcc061614ftjjao2iey", embeddedWallet: "0x164fb75040A0622Cd89D607C247d0932Ecb08482", smartWallet:"0x698Ac142767693Ea76b64202b618655858215289" })

db.Label.find()

db.Label.drop()

``` 

## Docker Prod
Creates the images of the `backend` and `nextjs` projects.

`cd docker/prod`

Then to run-stop the docker container execute:

```
docker-compose up --build -d
docker-compose down
```

To execute a custom docker-compose file with a custom name execute:
```
docker-compose -f custom-compose.yml up --build -d
```

You need to set the URL of MongoDB Atlas in the environment variable `DATABASE_URL` of backend - environment checkout [this](https://github.com/prisma/docs/issues/5562).


# Hardhat
`cd hardhat`

In the root create a `.env` files with:
```
RPC_URL_BASE_SEPOLIA=
OWNER_PRIVATE_KEY=
OWNER_ADDRESS=
```

- To compile the smart contracts run `npx hardhat compile`

- To deploy the smart contract run `npx hardhat ignition deploy ./ignition/modules/Proofifi.ts` 

After you deploy a new contract remember to add the contract address in the allow list of the Coinbase Pymaster page.