"use client";

import { useState, useCallback } from "react";

interface CopyLinkIconProps {
  /** ID of the section (without #). The link will be {currentPath}#{sectionId} */
  sectionId: string;
  /** Accessible label for the button */
  label?: string;
  className?: string;
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function CopyLinkIcon({ sectionId, label = "Copy link", className = "" }: CopyLinkIconProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
    void navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [sectionId]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded p-1 text-body-color hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-primary dark:text-body-color-dark dark:hover:bg-gray-700 dark:hover:text-white ${className}`}
      aria-label={copied ? "Link copied" : label}
      title={copied ? "Link copied" : label}
    >
      {copied ? (
        <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
      ) : (
        <LinkIcon className="h-4 w-4" />
      )}
    </button>
  );
}
