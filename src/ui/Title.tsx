export default function Title({ title }: { title: string }) {
  return <p className="md:text-2xl text-lg text-[var(--foreground)] text-center">{title}</p>;
}
