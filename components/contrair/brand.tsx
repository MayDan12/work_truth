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
      aria-label="Worktruth home"
      className={cn("brand", inverted && "brand-inverted")}
      href="/"
      onClick={onClick}
    >
      <span aria-hidden="true" className="brand-mark">
        c
      </span>
      <span>Contrair</span>
    </Link>
  );
}

