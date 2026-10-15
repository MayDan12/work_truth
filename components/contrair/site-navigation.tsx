"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Brand } from "@/components/contrair/brand"
import { cn } from "@/lib/utils"

const navigationLinks = [
  { href: "/companies", label: "Explore Companies" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/community-guidelines", label: "Community Guidelines" },
]

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = originalOverflow
      }
    }
  }, [isOpen])

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
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="site-navigation-toggle"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
      >
        <Menu aria-hidden="true" className="size-5" />
        <span>Menu</span>
      </button>

      {/* Backdrop overlay for mobile drawer */}
      <div
        aria-hidden="true"
        className="site-navigation-backdrop"
        onClick={() => setIsOpen(false)}
      />

      {/* Navigation panel: slides in from the right on mobile, inline on desktop */}
      <div
        aria-label="Navigation drawer"
        className="site-navigation-panel"
        id="primary-navigation-links"
      >
        <div className="site-navigation-drawer-header">
          <Brand onClick={closeOnMobileNavigation} />
          <button
            aria-label="Close menu"
            className="site-navigation-close"
            onClick={() => {
              setIsOpen(false)
              toggleRef.current?.focus()
            }}
            type="button"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

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
