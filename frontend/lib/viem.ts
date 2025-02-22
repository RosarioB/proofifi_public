import { privateKeyToAccount } from 'viem/accounts'
import { config } from './config';

export const account = privateKeyToAccount(config.erc_721_owner_private_key as `0x${string}`);