interface AuthErrorProps {
  message: string;
}

export function AuthError({ message }: AuthErrorProps) {
  return message ? (
    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
      {message}
    </div>
  ) : null;
}