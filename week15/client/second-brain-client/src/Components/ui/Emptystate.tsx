interface EmptyStateProps {
  message: string;
  subtext?: string;
}

export const EmptyState = ({ message, subtext }: EmptyStateProps) => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-16 mb-12 text-center px-4">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-700">{message}</h2>
      {subtext && <p className="text-gray-500 mt-2">{subtext}</p>}
    </div>
  );
};
