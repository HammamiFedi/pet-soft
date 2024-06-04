export default function InputError({
  children,
}: {
  children: React.ReactNode;
}) {
  return <p className="ml-2 text-xs font-medium text-red-500">{children}</p>;
}
