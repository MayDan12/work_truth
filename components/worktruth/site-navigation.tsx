"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigationLinks = [
  { href: "/companies", label: "Explore Companies" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/community-guidelines", label: "Community Guidelines" },
]

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false)
      toggleRef.current?.focus()
    }
  }

  function closeOnMobileNavigation() {
    setIsOpen(false)
  }

  return (
    <nav
      aria-label="Main navigation"
      className="site-navigation"
      data-menu-open={isOpen}
      onKeyDown={handleKeyDown}
    >
      <button
        aria-controls="primary-navigation-links"
        aria-expanded={isOpen}
        className="site-navigation-toggle"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
      >
        {isOpen ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
        <span>{isOpen ? "Close menu" : "Menu"}</span>
      </button>

      <div className="site-navigation-panel" id="primary-navigation-links">
        <div className="primary-nav">
          {navigationLinks.map((link) => (
            <Link
              className="nav-link"
              href={link.href}
              key={link.label}
              onClick={closeOnMobileNavigation}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          className={cn(buttonVariants({ size: "lg" }), "header-cta")}
          href="/write-review"
          onClick={closeOnMobileNavigation}
        >
          Write a Review
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </nav>
  )
}
