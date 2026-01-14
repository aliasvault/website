import { useTranslations } from "next-intl";
import Link from "next/link";

interface Vulnerability {
  id: string;
  researcher: string;
  affiliation?: string;
  date: string;
  severity: "critical" | "high" | "medium" | "low";
  cve?: string;
  ghsa?: string;
  advisoryUrl?: string;
  summary: string;
}

const vulnerabilities: Vulnerability[] = [
  {
    id: "passkey-validation-android-2025",
    researcher: "Oscar Arnflo",
    affiliation: "Security Office",
    date: "2026-01-14",
    severity: "medium",
    cve: "CVE-2026-22694",
    ghsa: "GHSA-mvg4-wvjv-332q",
    advisoryUrl: "https://github.com/aliasvault/aliasvault/security/advisories/GHSA-mvg4-wvjv-332q",
    summary: "AliasVault Android versions 0.24.0 through 0.25.2 contained an issue in how passkey requests from Android apps were validated. Under certain local conditions, a malicious app could attempt to obtain a passkey response for a site it was not authorized to access.",
  },
  {
    id: "ssrf-favicon-2025",
    researcher: "Filippo Decortes",
    affiliation: "Bitcube Security",
    date: "2025-09-19",
    severity: "high",
    cve: "CVE-2025-59344",
    ghsa: "GHSA-f253-f7xc-w7pj",
    advisoryUrl: "https://github.com/aliasvault/aliasvault/security/advisories/GHSA-f253-f7xc-w7pj",
    summary: "Server-Side Request Forgery (SSRF) vulnerability in favicon extraction feature allowing internal network scanning and limited data exfiltration in AliasVault API versions ≤0.23.0",
  },
];

const severityColors = {
  critical: "bg-red-500 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow text-black",
  low: "bg-blue-500 text-white",
};

const HallOfFame = () => {
  const t = useTranslations();

  return (
    <div className="mt-16">
      <h3 className="mb-8 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        {t('responsibleDisclosure.hallOfFame.title')}
      </h3>

      <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
        {t('responsibleDisclosure.hallOfFame.description')}
      </p>

      <div className="space-y-6">
        {vulnerabilities.map((vuln) => (
          <div
            key={vuln.id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-dark"
          >
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
                  {vuln.researcher}
                  {vuln.affiliation && (
                    <span className="ml-2 text-sm font-normal text-body-color dark:text-body-color-dark">
                      ({vuln.affiliation})
                    </span>
                  )}
                </h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  {new Date(vuln.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span
                  className={`inline-block rounded px-3 py-1 text-xs font-semibold uppercase ${
                    severityColors[vuln.severity]
                  }`}
                >
                  {vuln.severity}
                </span>
                {vuln.cve && (
                  <span className="inline-block rounded bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {vuln.cve}
                  </span>
                )}
              </div>
            </div>

            <p className="mb-4 text-base text-body-color dark:text-body-color-dark">
              {vuln.summary}
            </p>

            <div className="flex flex-wrap gap-4">
              {vuln.advisoryUrl && (
                <Link
                  href={vuln.advisoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t('responsibleDisclosure.hallOfFame.viewAdvisory')}
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              )}
              {vuln.ghsa && (
                <span className="text-sm text-body-color dark:text-body-color-dark">
                  {vuln.ghsa}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HallOfFame;