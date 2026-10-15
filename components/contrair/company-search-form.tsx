"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Search, X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const SAMPLE_COMPANIES = [
  "Paystack",
  "Flutterwave",
  "Moniepoint",
  "Piggyvest",
  "Kuda Bank",
  "Andela",
  "Interswitch",
  "Nomba",
  "Carbon",
  "Opay",
];

const POPULAR_TAGS = [
  "Paystack",
  "Flutterwave",
  "Moniepoint",
  "Piggyvest",
  "Kuda",
];

export function CompanySearchForm({
  initialQuery = "",
  className,
  showSuggestions = false,
}: {
  initialQuery?: string;
  className?: string;
  showSuggestions?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter animation: types company names and backspaces them
  useEffect(() => {
    // Pause if user is typing or has entered a query
    if (query || isFocused) return;

    const targetCompany = SAMPLE_COMPANIES[currentWordIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentText === targetCompany) {
      // Finished typing word, wait before deleting
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1900);
    } else if (isDeleting && currentText === "") {
      // Finished deleting word, pause before typing next
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % SAMPLE_COMPANIES.length);
      }, 280);
    } else {
      // Typing or deleting one character
      const speed = isDeleting ? 36 : 70;
      timeout = setTimeout(() => {
        setCurrentText((prev) =>
          isDeleting
            ? targetCompany.slice(0, prev.length - 1)
            : targetCompany.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, query, isFocused]);

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        action="/companies"
        className={cn("company-search", className)}
        method="get"
        role="search"
      >
        <label className="sr-only" htmlFor="company-search">
          Search companies with approved reviews
        </label>

        {/* Search icon */}
        <div className="flex items-center pl-1 sm:pl-2 shrink-0">
          <Search
            aria-hidden="true"
            className="size-4 sm:size-5 text-muted-foreground transition-colors group-focus-within:text-primary"
          />
        </div>

        {/* Search Input Field & Animated Typewriter Placeholder */}
        <div className="relative flex-1 flex items-center min-w-0 py-2 sm:py-2.5">
          {!query && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-sm sm:text-base select-none truncate text-muted-foreground/80"
            >
              <span>Search</span>
              <span className="mx-1.5 font-medium text-foreground tracking-tight">
                &ldquo;{currentText}&rdquo;
              </span>
              <span className="inline-block w-0.5 h-4 bg-primary animate-pulse" />
            </div>
          )}

          <input
            aria-label="Search companies with approved reviews"
            autoComplete="organization"
            className="company-search-input"
            id="company-search"
            name="q"
            onBlur={() => setIsFocused(false)}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            ref={inputRef}
            type="text"
            value={query}
          />

          {/* Quick clear button */}
          {query ? (
            <button
              aria-label="Clear search input"
              className="mr-1.5 rounded-full p-1 text-muted-foreground/70 hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
              onClick={handleClear}
              type="button"
            >
              <X aria-hidden="true" className="size-3.5" />
            </button>
          ) : null}
        </div>

        {/* Modern submit button inside the pill */}
        <motion.button
          className="company-search-submit"
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          <span>Search</span>
          <ArrowRight aria-hidden="true" className="size-3.5" />
        </motion.button>
      </form>

      {/* Popular suggestions quick tags */}
      {showSuggestions && (
        <div className="mt-3.5 flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <span className="font-medium text-foreground/60 mr-0.5">Popular:</span>
          {POPULAR_TAGS.map((company) => (
            <Link
              className="rounded-full border border-border/70 bg-card/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground hover:border-primary/40 hover:bg-card hover:text-foreground hover:shadow-xs transition-all"
              href={`/companies?q=${encodeURIComponent(company)}`}
              key={company}
            >
              {company}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
