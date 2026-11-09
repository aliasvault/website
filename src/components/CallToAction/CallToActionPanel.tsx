import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { buttonClasses } from "@/components/Common/Button";
import { GlowOrb, Waves } from "@/components/Common/Decor";

interface CallToActionPanelProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description: ReactNode;
  buttonText: ReactNode;
  href?: string;
  logoAlt?: string;
  className?: string;
}

/**
 * Shared surface for all call-to-action panels.
 */
const CallToActionPanel = ({
  eyebrow,
  title,
  description,
  buttonText,
  href = "https://app.aliasvault.com",
  logoAlt = "AliasVault logo",
  className = "",
}: CallToActionPanelProps) => (
  <section className={`mt-8 lg:mt-20 ${className}`}>
    <div className="container relative overflow-hidden rounded-2xl border border-primary/20 bg-white bg-gradient-to-br from-primary/[0.14] to-primary/[0.04] p-10 shadow-three dark:border-primary/25 dark:bg-gray-dark dark:from-primary/[0.07] dark:to-transparent dark:shadow-none md:p-12 lg:p-16 lg:px-32">
      <GlowOrb tone="orange" size="44rem" className="-right-64 -top-72 opacity-25 dark:hidden" />
      <Waves className="pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full opacity-40 dark:opacity-25 md:h-28" />
      <div className="relative flex flex-col items-center justify-between gap-8 lg:flex-row">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          {eyebrow && (
            <p className="mb-4 inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-sm font-medium text-primary-700 dark:border-primary/30 dark:bg-primary/15 dark:text-primary">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="mb-6 text-lg text-gray-700 dark:text-white/80">{description}</p>
          <Link href={href} className={buttonClasses({ variant: "primaryStrong", size: "lg" })}>
            {buttonText}
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        <div className="hidden w-full justify-center lg:flex lg:w-1/2 lg:justify-end">
          <Image src="/images/logo/logo.svg" alt={logoAlt} width={200} height={200} />
        </div>
      </div>
    </div>
  </section>
);

export default CallToActionPanel;
