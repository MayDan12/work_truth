"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
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
      <motion.button
        aria-controls="primary-navigation-links"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="site-navigation-toggle"
        onClick={() => setIsOpen((open) => !open)}
        ref={toggleRef}
        type="button"
        whileTap={{ scale: 0.94 }}
      >
        <Menu aria-hidden="true" className="size-5" />
        <span>Menu</span>
      </motion.button>

      {/* Backdrop overlay for mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-hidden="true"
            className="site-navigation-backdrop"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            transition={{ duration: 0.22, ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      {/* Navigation panel: slides in from the right on mobile, inline on desktop */}
      <div
        aria-label="Navigation drawer"
        className="site-navigation-panel"
        id="primary-navigation-links"
      >
        <div className="site-navigation-drawer-header">
          <Brand onClick={closeOnMobileNavigation} />
          <motion.button
            aria-label="Close menu"
            className="site-navigation-close"
            onClick={() => {
              setIsOpen(false)
              toggleRef.current?.focus()
            }}
            type="button"
            whileHover={{ rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.16 }}
          >
            <X aria-hidden="true" className="size-5" />
          </motion.button>
        </div>

        <div className="primary-nav">
          {navigationLinks.map((link, index) => (
            <motion.div
              animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
              className="w-full md:w-auto"
              initial={false}
              key={link.label}
              transition={{
                duration: 0.22,
                delay: isOpen ? 0.08 + index * 0.04 : 0,
                ease: "easeOut",
              }}
            >
              <Link
                className="nav-link"
                href={link.href}
                onClick={closeOnMobileNavigation}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div className="w-full md:w-auto" whileTap={{ scale: 0.97 }}>
          <Link
            className={cn(buttonVariants({ size: "lg" }), "header-cta")}
            href="/write-review"
            onClick={closeOnMobileNavigation}
          >
            Write a Review
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </motion.div>
      </div>
    </nav>
  )
}
