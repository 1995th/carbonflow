import { ethers } from 'ethers';

const ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)"
];

export class CarbonToken {
  private contract: ethers.Contract;

  constructor(address: string, provider: ethers.Provider) {
    this.contract = new ethers.Contract(address, ABI, provider);
  }

  async getBalance(address: string): Promise<string> {
    const balance = await this.contract.balanceOf(address);
    return ethers.formatUnits(balance, 18);
  }

  async approve(spender: string, amount: string, signer: ethers.Signer): Promise<ethers.TransactionResponse> {
    const contract = this.contract.connect(signer);
    return contract.approve(spender, ethers.parseUnits(amount, 18));
  }
}