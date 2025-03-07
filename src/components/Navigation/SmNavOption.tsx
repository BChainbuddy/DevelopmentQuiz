import Link from "next/link";

interface SmNavOption {
  href: string;
  name: string;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export default function SmNavOption({
  href,
  name,
  setIsMenuOpen,
}: SmNavOption) {
  return (
    <Link href={href} onClick={() => setIsMenuOpen(false)}>
      <p className="text-white font-inter">{name}</p>
    </Link>
  );
}
