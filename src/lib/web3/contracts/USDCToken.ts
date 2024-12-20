import { ethers } from 'ethers';
import { USDC_DECIMALS } from '../constants';

const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)"
];

export class USDCToken {
  private contract: ethers.Contract;
  private decimals: number = USDC_DECIMALS;

  constructor(address: string, provider: ethers.Provider) {
    if (!ethers.isAddress(address)) {
      throw new Error('Invalid USDC contract address');
    }
    this.contract = new ethers.Contract(address, ABI, provider);
  }

  async getBalance(address: string): Promise<string> {
    try {
      if (!ethers.isAddress(address)) {
        throw new Error('Invalid wallet address');
      }
      const balance = await this.contract.balanceOf(address);
      return ethers.formatUnits(balance, this.decimals);
    } catch (error) {
      console.error('Error fetching USDC balance:', error);
      return '0';
    }
  }

  async getAllowance(owner: string, spender: string): Promise<string> {
    if (!ethers.isAddress(owner) || !ethers.isAddress(spender)) {
      throw new Error('Invalid address provided for allowance check');
    }
    const allowance = await this.contract.allowance(owner, spender);
    return ethers.formatUnits(allowance, this.decimals);
  }

  async approve(spender: string, amount: string, signer: ethers.Signer): Promise<ethers.TransactionResponse> {
    if (!ethers.isAddress(spender)) {
      throw new Error('Invalid spender address');
    }
    const contract = this.contract.connect(signer);
    const parsedAmount = ethers.parseUnits(amount, this.decimals);
    return contract.approve(spender, parsedAmount);
  }
}