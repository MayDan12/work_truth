import type { ComponentProps } from "react"
import { cn } from "@/lib/utils"

export function TypographyH1({
  className,
  ...props
}: ComponentProps<"h1">) {
  return <h1 className={cn("text-display", className)} {...props} />
}

export function TypographyH2({
  className,
  ...props
}: ComponentProps<"h2">) {
  return <h2 className={cn("text-section", className)} {...props} />
}

export function TypographyH3({
  className,
  ...props
}: ComponentProps<"h3">) {
  return <h3 className={cn("text-subsection", className)} {...props} />
}

export function TypographyP({
  className,
  ...props
}: ComponentProps<"p">) {
  return <p className={cn("text-copy", className)} {...props} />
}
