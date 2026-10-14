import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function CompanySearchForm({
  initialQuery = "",
  className,
}: {
  initialQuery?: string
  className?: string
}) {
  return (
    <form
      action="/companies"
      className={cn("company-search", className)}
      method="get"
      role="search"
    >
      <label className="sr-only" htmlFor="company-search">
        Search companies with approved reviews
      </label>
      <div className="company-search-field">
        <Search aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
        <Input
          autoComplete="organization"
          className="company-search-input"
          defaultValue={initialQuery}
          id="company-search"
          name="q"
          placeholder="Search companies with approved reviews..."
          type="search"
        />
      </div>
      <Button className="company-search-submit" size="lg" type="submit">
        Search companies
        <Search aria-hidden="true" className="size-4" />
      </Button>
    </form>
  )
}
