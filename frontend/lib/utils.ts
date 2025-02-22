export const shortenAddress = (address?: string) => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const isLoggingEnabled = process.env.NEXT_PUBLIC_ENABLE_LOGS === "true";

export const log = (text: string) => {
  if(isLoggingEnabled){
    console.log(text);
  }
}

export const logError = (text: string, error : unknown) => {
  if(isLoggingEnabled){
    console.error(text, error);
  }
}