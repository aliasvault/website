"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";

const SIZES = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
} as const;

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  icon?: ReactNode;
  footer?: ReactNode | null;
  size?: keyof typeof SIZES;
  children: ReactNode;
};

/**
 * Modal component.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  icon,
  footer,
  size = "md",
  children,
}: Props) {
  const t = useTranslations();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[1000000]"
    >
      <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm dark:bg-black/70" />
      <div className="fixed inset-0 overflow-y-auto">
        <div
          className="flex min-h-full items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div
            className={`relative w-full ${SIZES[size]} rounded-lg border border-gray-200 bg-white text-left shadow-xl dark:border-gray-600 dark:bg-gray-800 dark:shadow-2xl`}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className="absolute right-4 top-4 rounded-md sm:right-5 sm:top-5 p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="px-5 pb-5 pt-6 sm:p-8">
              <h3
                id={titleId}
                className="flex items-center gap-3 pr-8 text-xl font-bold leading-7 sm:text-2xl sm:leading-8 text-gray-900 dark:text-white"
              >
                {icon && (
                  <span className="flex-shrink-0 text-primary">{icon}</span>
                )}
                {title}
              </h3>
              <div className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-300 sm:mt-6">
                {children}
              </div>

              {footer !== null && (
                <div className="mt-6 gap-2 sm:mt-8 sm:flex sm:flex-row-reverse">
                  {footer ?? (
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex w-full justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 sm:w-auto"
                    >
                      {t("common.close")}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
