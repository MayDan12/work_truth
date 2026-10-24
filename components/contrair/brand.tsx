import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Brand({
  inverted = false,
  onClick,
}: {
  inverted?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      aria-label="GistHQ home"
      className={cn("brand", inverted && "brand-inverted")}
      href="/"
      onClick={onClick}
    >
      <Image
        alt=""
        className="brand-mark"
        height={36}
        src="/gisthq_logo.png"
        width={36}
      />
      <span>
        Gist<span className="text-primary">HQ</span>
      </span>
    </Link>
  );
}
