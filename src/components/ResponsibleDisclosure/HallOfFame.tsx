import Link from "next/link";

const HALL_OF_FAME_EN = {
  title: "Hall of Fame",
  description:
    "This Hall of Fame consists of security researchers who have helped make AliasVault more secure by responsibly disclosing vulnerabilities in the past. We recognize and thank these researchers for their valuable contributions:",
  viewAdvisory: "View Advisory",
  severityHardening: "Security hardening",
  hardeningDescription: "{issue} {versionPhrase} as part of security hardening.",
  hardeningVersionSingle: "It was fixed in version {version}",
  hardeningVersionMultiple: "It was fixed in versions {version}",
} as const;

interface Vulnerability {
  id: string;
  researcher: string;
  /** Optional X (Twitter) profile URL; shown as icon after name */
  xUrl?: string;
  /** Optional Mastodon profile URL; shown as icon after name */
  mastodonUrl?: string;
  affiliation?: string;
  date: string;
  severity: "critical" | "high" | "medium" | "low" | "hardening";
  /** Optional; omitted for security hardening entries */
  cve?: string;
  ghsa?: string;
  advisoryUrl?: string;
  /** Short description; for hardening entries this is the "issue" in the template */
  summary: string;
  /** For hardening entries: version in which the fix was shipped (e.g. "0.27.0") */
  fixedInVersion?: string;
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function MastodonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.327 8.566c0-4.339-2.843-5.61-2.843-5.61-1.224-.775-2.436-.785-3.662-.785-2.483 0-3.539 1.011-4.018 1.756-.634-.21-1.622-.375-2.256-.375-2.727 0-4.772 2.016-4.772 5.49v6.376H2.081V8.576c0-4.339 2.843-5.61 2.843-5.61 1.224-.775 2.436-.785 3.662-.785 2.483 0 3.539 1.011 4.018 1.756.634-.21 1.622-.375 2.256-.375 2.727 0 4.772 2.016 4.772 5.49v13.377h4.772v-6.643c0-1.048.084-2.073.247-3.067.739 1.756 2.566 2.925 4.772 2.925 2.566 0 4.772-2.016 4.772-5.49V8.576c0-4.339-2.843-5.61-2.843-5.61-1.224-.775-2.436-.785-3.662-.785-2.483 0-3.539 1.011-4.018 1.756-.634-.21-1.622-.375-2.256-.375-2.727 0-4.772 2.016-4.772 5.49v6.376H2.081V8.576z" />
    </svg>
  );
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
  {
    id: "stored-self-xss-notes-alias-2026",
    researcher: "Rohit Tiwari",
    xUrl: "https://x.com/dedrknex",
    date: "2026-01-30",
    severity: "hardening",
    summary: "An issue was reported with stored self-XSS (safe rendering of decrypted vault content).",
    fixedInVersion: "0.26.0",
  },
  {
    id: "android-backup-biometric-2026",
    researcher: "Neil Mark",
    affiliation: "Mobilehackinglab.com",
    date: "2026-02-01",
    severity: "hardening",
    summary: "Issues were reported with Android backup and Android biometric unlock/keystore configuration.",
    fixedInVersion: "0.26.0 and 0.26.2",
  },
];

const severityColors: Record<Vulnerability["severity"], string> = {
  critical: "bg-red-500 text-white",
  high: "bg-orange-500 text-white",
  medium: "bg-yellow text-black",
  low: "bg-blue-500 text-white",
  hardening: "bg-gray-400 text-white dark:bg-gray-600 dark:text-gray-200",
};

const HallOfFame = () => {
  return (
    <div className="mt-16">
      <h3 className="mb-8 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        {HALL_OF_FAME_EN.title}
      </h3>

      <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
        {HALL_OF_FAME_EN.description}
      </p>

      <div className="space-y-6">
        {[...vulnerabilities]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((vuln) => {
          const isHardening = vuln.severity === "hardening" && !vuln.advisoryUrl && !vuln.cve;
          const severityLabel = vuln.severity === "hardening"
            ? HALL_OF_FAME_EN.severityHardening
            : vuln.severity;

          return (
            <div
              key={vuln.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-md transition-all hover:shadow-lg dark:border-gray-700 dark:bg-gray-dark"
            >
              <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h4 className="flex flex-wrap items-center gap-x-2 text-base font-semibold text-black dark:text-white">
                    <span>{vuln.researcher}</span>
                    {vuln.affiliation && (
                      <span className="text-sm font-normal text-body-color dark:text-body-color-dark">
                        ({vuln.affiliation})
                      </span>
                    )}
                    {(vuln.xUrl || vuln.mastodonUrl) && (
                      <span className="inline-flex items-center gap-1">
                        {vuln.xUrl && (
                          <a
                            href={vuln.xUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                            title="X (Twitter)"
                          >
                            <XIcon className="h-4 w-4" />
                          </a>
                        )}
                        {vuln.mastodonUrl && (
                          <a
                            href={vuln.mastodonUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                            title="Mastodon"
                          >
                            <MastodonIcon className="h-4 w-4" />
                          </a>
                        )}
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-body-color dark:text-body-color-dark">
                    {new Date(vuln.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span
                    className={`inline-block rounded px-3 py-1 text-xs font-semibold uppercase ${
                      severityColors[vuln.severity]
                    }`}
                  >
                    {severityLabel}
                  </span>
                  {vuln.cve && (
                    <span className="inline-block rounded bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                      {vuln.cve}
                    </span>
                  )}
                </div>
              </div>

              <div className="text-sm text-body-color dark:text-body-color-dark">
                {isHardening && vuln.fixedInVersion ? (
                  <>
                    <p className="mb-2">
                      {HALL_OF_FAME_EN.hardeningDescription
                        .replace(
                          "{issue}",
                          vuln.summary
                        )
                        .replace(
                          "{versionPhrase}",
                          vuln.fixedInVersion.includes(" and ")
                            ? HALL_OF_FAME_EN.hardeningVersionMultiple.replace(
                                "{version}",
                                vuln.fixedInVersion
                              )
                            : HALL_OF_FAME_EN.hardeningVersionSingle.replace(
                                "{version}",
                                vuln.fixedInVersion
                              )
                        )}
                    </p>
                  </>
                ) : (
                  <p className={vuln.advisoryUrl || vuln.ghsa ? "mb-4" : undefined}>
                    {vuln.summary}
                  </p>
                )}
              </div>

              {(vuln.advisoryUrl || vuln.ghsa) && (
                <div className="flex flex-wrap gap-4">
                  {vuln.advisoryUrl && (
                    <Link
                      href={vuln.advisoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {HALL_OF_FAME_EN.viewAdvisory}
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HallOfFame;