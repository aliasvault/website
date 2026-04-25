import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface ImportCallToActionProps {
  /** Translation namespace, e.g. "alternative1Password.import" */
  namespace: string;
  href?: string;
  className?: string;
}

const ImportCallToAction = ({ namespace, href = "https://app.aliasvault.net", className = "" }: ImportCallToActionProps) => {
  const t = useTranslations();

  return (
    <section className={`mt-8 lg:mt-20 ${className}`}>
      <div className="container bg-gradient-to-br from-primary-400 dark:from-primary-700 dark:to-gray-900 rounded-2xl p-10 md:p-12 lg:p-16 lg:px-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              {t(`${namespace}.title`)}
            </h2>
            <p className="mb-6 text-lg text-gray-700 dark:text-white/90">
              {t(`${namespace}.description`)}
            </p>
            <Link
              href={href}
              className="relative flex items-center justify-center bg-primary-600 px-8 py-4 font-semibold text-white transition-all duration-200 hover:bg-primary-700 hover:scale-105"
            >
              {t(`${namespace}.cta`)}
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="hidden lg:flex w-full lg:w-1/2 justify-center lg:justify-end">
            <Image
              src="/images/logo/logo.svg"
              alt="AliasVault logo"
              width={200}
              height={200}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportCallToAction;

