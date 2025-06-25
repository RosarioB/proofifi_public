# Proofifi_public

This project aims to enable people to create their own labels for real-world objects like cars, wines, or other items as NFTs on the blockchain.

- The frontend is a Next.js application that uses Privy to log in the user and wagmi to interact with the blockchain
- The backend is an Express application containing various REST APIs to store the data in a MongoDB database and serve the data to the frontend
- Hardhat is the tool used for developing the Solidity smart contract

## Table of Contents
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)
- [Smart Contract Development](#smart-contract-development)

## Demo
You can find a demo of this project on [YouTube](https://www.youtube.com/watch?v=-lPHbA9CEeY)

## Prerequisites
- Node.js (v18 or higher)
- pnpm
- Docker (for local development)
- MongoDB (local or Atlas)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd proofifi_public
```

## Frontend Setup

```bash
cd frontend
```

1. Install dependencies:
```bash
pnpm install
```

2. Set up your environment variables:

Create a `.env.local` file in the `frontend` directory with:

```env
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

3. Run the development server:
```bash
pnpm run dev
```

## Backend Setup

```bash
cd backend
```

1. Install dependencies:
```bash
pnpm install
npx prisma generate
```

2. Create a `.env` file in the `backend` directory with:
```env
DATABASE_URL="mongodb://root:prisma@localhost:27017/proofifi?authSource=admin&retryWrites=false"
```

3. Run the server:
```bash
pnpm run dev
```

## API Endpoints

### Labels

#### Create a New Label
**POST** `http://localhost:3001/labels`

```json
{
    "id": "{label-id}",
    "name": "My Label Name",
    "description": "My label description",
    "nftId": "0",
    "ipfsHash": "bafkreifoxfthxbfd6yhw62yzpubb64ug2aruula2qbdcgaxatab6ktjp2e",
    "idPrivy": "did:privy:cm1wdlgcc061614ftjjao2iey",
    "embeddedWallet": "0x164fb75040A0622Cd89D607C247d0932Ecb08482",
    "smartWallet": "0x698Ac142767693Ea76b64202b618655858215289",
    "base64Image": ""
}
```

#### Get All Labels
**GET** `http://localhost:3001/labels`

#### Get a Label by ID
**GET** `http://localhost:3001/labels/{label-id}`

#### Delete a Label by ID
**DELETE** `http://localhost:3001/labels/{label-id}`

#### Update a Label by ID
**PUT** `http://localhost:3001/labels/{label-id}`

```json
{
    "id": "{label-id}",
    "name": "Updated Label Name",
    "description": "Updated description",
    "nftId": "0",
    "ipfsHash": "bafkreifoxfthxbfd6yhw62yzpubb64ug2aruula2qbdcgaxatab6ktjp2e",
    "idPrivy": "did:privy:cm1wdlgcc061614ftjjao2iey",
    "embeddedWallet": "0x164fb75040A0622Cd89D607C247d0932Ecb08482",
    "smartWallet": "0x698Ac142767693Ea76b64202b618655858215289",
    "base64Image": ""
}
```

#### Check if SmartWallet Exists
**GET** `http://localhost:3001/labels/check-smartwallet/{smart-wallet-address}`

**Response:**
```json
{
    "status": true,
    "message": "SmartWallet found",
    "data": {
        "labelId": "6723516539e494d7cf578741"
    }
}
```

#### Get Labels By Smart Wallet
**GET** `http://localhost:3001/labels/smartwallet/{smart-wallet-address}`

### Allowed Contracts

#### Get All Allowed Contracts
**GET** `http://localhost:3001/allowed-contracts`

#### Create a New Allowed Contract
**POST** `http://localhost:3001/allowed-contracts/`

```json
{
    "id": "{contract-address}"
}
```

#### Delete an Allowed Contract
**DELETE** `http://localhost:3001/allowed-contracts/{contract-address}`

## Docker Setup

### Local Development (Test Environment)

Creates a MongoDB instance for local testing.

```bash
cd docker/test
```

1. Run the docker-compose file:
```bash
docker-compose up -d
```

2. (Optional) Create a database `proofifi` and the collection `Label` with MongoDB

3. Generate Prisma client:
```bash
npx prisma generate
```

**Note:** Each time you modify `prisma/schema.prisma`, run `npx prisma generate`

#### Useful MongoDB Commands

```bash
# Connect to MongoDB
docker exec -it mongo mongo -u root -p prisma --authenticationDatabase admin

# Use the database
use proofifi

# Show collections
show collections

# Insert a test document
db.Label.insertOne({ 
    subdomain: "{label-id}", 
    name: "My Label Name", 
    description: "My label description", 
    nftId: "1",
    "ipfsHash": "bafkreifoxfthxbfd6yhw62yzpubb64ug2aruula2qbdcgaxatab6ktjp2e", 
    idPrivy: "did:privy:cm1wdlgcc061614ftjjao2iey", 
    embeddedWallet: "0x164fb75040A0622Cd89D607C247d0932Ecb08482", 
    smartWallet: "0x698Ac142767693Ea76b64202b618655858215289" 
})

# Find all documents
db.Label.find()

# Drop the collection
db.Label.drop()
```

### Production Environment

Creates Docker images for the `backend` and `nextjs` projects.

```bash
cd docker/prod
```

#### Run/Stop Docker Containers

```bash
# Start containers
docker-compose up --build -d

# Stop containers
docker-compose down
```

#### Custom Docker Compose

To execute a custom docker-compose file with a custom name:
```bash
docker-compose -f custom-compose.yml up --build -d
```

**Important:** Set the MongoDB Atlas URL in the `DATABASE_URL` environment variable for the backend. For more information, check [this issue](https://github.com/prisma/docs/issues/5562).

## Smart Contract Development

```bash
cd hardhat
```

1. Create a `.env` file in the `hardhat` directory with:
```env
RPC_URL_BASE_SEPOLIA=
OWNER_PRIVATE_KEY=
OWNER_ADDRESS=
```

2. Compile the smart contracts:
```bash
npx hardhat compile
```

3. Deploy the smart contract:
```bash
npx hardhat ignition deploy ./ignition/modules/Proofifi.ts
```

**Important:** After deploying a new contract, remember to add the contract address to the allow list on the Coinbase Pymaster page.
