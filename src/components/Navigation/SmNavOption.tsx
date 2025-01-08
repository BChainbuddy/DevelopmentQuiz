import Link from "next/link";

interface SmNavOption {
  href: string;
  name: string;
}

export default function SmNavOption({ href, name }: SmNavOption) {
  return (
    <Link href={href}>
      <p className="text-white font-inter">{name}</p>
    </Link>
  );
}
