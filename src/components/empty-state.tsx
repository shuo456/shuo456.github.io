type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="emptyState">
      <span aria-hidden="true">—</span>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
