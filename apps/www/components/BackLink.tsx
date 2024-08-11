import Link from "next/link";

export function BackLink() {
  return (
    <Link className="space-x-1 text-white/40 hover:text-white/80" href="/">
      <span>←</span>
      <span>Back</span>
    </Link>
  );
}
