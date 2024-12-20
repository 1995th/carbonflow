interface EmptyStateProps {
  message: string;
  description?: string;
}

export function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}