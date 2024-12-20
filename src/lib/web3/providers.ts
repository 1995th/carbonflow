import { ethers } from 'ethers';

export async function getProvider(): Promise<ethers.BrowserProvider> {
  if (!window.ethereum) {
    throw new Error('No Web3 provider found. Please install MetaMask.');
  }
  return new ethers.BrowserProvider(window.ethereum);
}

export async function getSigner(): Promise<ethers.Signer> {
  const provider = await getProvider();
  return provider.getSigner();
}