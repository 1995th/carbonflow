import { ethers } from 'ethers';

const ABI = [
  "function purchaseCredits(uint256 creditId, uint256 amount) returns (bool)",
  "function retireCredits(uint256 creditId, uint256 amount) returns (bool)",
  "event CreditsPurchased(address indexed buyer, uint256 indexed creditId, uint256 amount)",
  "event CreditsRetired(address indexed owner, uint256 indexed creditId, uint256 amount)"
];

export class CarbonMarket {
  private contract: ethers.Contract;

  constructor(address: string, provider: ethers.Provider) {
    this.contract = new ethers.Contract(address, ABI, provider);
  }

  async purchaseCredits(
    creditId: string, 
    amount: string, 
    signer: ethers.Signer
  ): Promise<ethers.TransactionResponse> {
    const contract = this.contract.connect(signer);
    return contract.purchaseCredits(creditId, ethers.parseUnits(amount, 18));
  }

  async retireCredits(
    creditId: string, 
    amount: string, 
    signer: ethers.Signer
  ): Promise<ethers.TransactionResponse> {
    const contract = this.contract.connect(signer);
    return contract.retireCredits(creditId, ethers.parseUnits(amount, 18));
  }
}