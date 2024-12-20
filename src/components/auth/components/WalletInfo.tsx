interface WalletInfoProps {
  address: string;
}

export function WalletInfo({ address }: WalletInfoProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600">Connected Wallet</p>
      <p className="font-mono text-sm">{address}</p>
    </div>
  );
}