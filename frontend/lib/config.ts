export const config = {
    "rpc_url_base_sepolia": process.env.NEXT_PUBLIC_RPC_URL_BASE_SEPOLIA as string,
    "erc_721_address": process.env.NEXT_PUBLIC_ERC721_ADDRESS as `0x${string}`,
    "erc_721_owner_private_key": process.env.NEXT_PUBLIC_ERC721_OWNER_PK as `0x${string}`,
    "erc_721_owner_address": process.env.NEXT_PUBLIC_ERC721_OWNER as `0x${string}`,
    "host": process.env.NEXT_PUBLIC_HOST as string,
    "backed_url": process.env.NEXT_PUBLIC_BACKEND_URL as string,
};