import Link from "next/link";
import CopyLinkIcon from "@/components/Common/CopyLinkIcon";

type SocialPlatform = "x" | "mastodon" | "github";

interface Social {
  platform: SocialPlatform;
  url: string;
}

interface Vulnerability {
  id: string;
  researcher: string;
  /** Optional social profile links; shown as icons after the name */
  socials?: Social[];
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

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const socialMeta: Record<SocialPlatform, { Icon: ({ className }: { className?: string }) => JSX.Element; label: string }> = {
  x: { Icon: XIcon, label: "X (Twitter)" },
  mastodon: { Icon: MastodonIcon, label: "Mastodon" },
  github: { Icon: GitHubIcon, label: "GitHub" },
};

const vulnerabilities: Vulnerability[] = [
  {
    id: "passkey-origin-rp-validation-extension-2026",
    researcher: "Amar Begovic",
    socials: [
      { platform: "github", url: "https://github.com/AmarBego" },
    ],
    date: "2026-06-04",
    severity: "high",
    cve: "CVE-2026-55587",
    ghsa: "GHSA-f99p-jfhr-6ffc",
    advisoryUrl: "https://github.com/aliasvault/aliasvault/security/advisories/GHSA-f99p-jfhr-6ffc",
    summary: "AliasVault browser extension versions 0.29.3 and earlier did not fully validate origin and relying party (RP) information during passkey (WebAuthn) requests. A malicious website could forge these values so that, if the user approved the prompt, the extension generated a valid WebAuthn assertion for a different website, weakening phishing resistance. Fixed in version 0.29.4 on 2026-06-04.",
  },
  {
    id: "stored-xss-email-rendering-2026",
    researcher: "Jorian Woltjer",
    affiliation: "Aikido Security",
    date: "2026-03-01",
    severity: "critical",
    cve: "CVE-2026-26266",
    ghsa: "GHSA-f65p-p65r-g53q",
    advisoryUrl: "https://github.com/aliasvault/aliasvault/security/advisories/GHSA-f65p-p65r-g53q",
    summary: "Stored cross-site scripting (XSS) in the email rendering feature of AliasVault Web Client versions 0.25.3 and lower. Email HTML content was not sufficiently sanitized or isolated before rendering. Fixed in version 0.26.0 (on 2026-01-30) with HTML sanitization (DOMPurify) and iframe sandboxing.",
  },
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
    socials: [{ platform: "x", url: "https://x.com/dedrknex" }],
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
    <div className="mt-16 scroll-mt-24" id="hall-of-fame">
      <h3 className="mb-8 flex items-center gap-2 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
        Hall of Fame
        <CopyLinkIcon sectionId="hall-of-fame" label="Copy link to Hall of Fame" />
      </h3>

      <p className="mb-8 text-base text-body-color dark:text-body-color-dark">
        This Hall of Fame consists of security researchers who have helped make AliasVault more secure by responsibly disclosing vulnerabilities in the past. We recognize and thank these researchers for their valuable contributions:
      </p>

      <div className="space-y-6">
        {[...vulnerabilities]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((vuln) => {
          const isHardening = vuln.severity === "hardening" && !vuln.advisoryUrl && !vuln.cve;
          const severityLabel = vuln.severity === "hardening" ? "Security hardening" : vuln.severity;

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
                    {vuln.socials && vuln.socials.length > 0 && (
                      <span className="inline-flex items-center gap-1">
                        {vuln.socials.map((social) => {
                          const { Icon, label } = socialMeta[social.platform];
                          return (
                            <a
                              key={social.platform}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary"
                              title={label}
                            >
                              <Icon className="h-4 w-4" />
                            </a>
                          );
                        })}
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
                  <p className="mb-2">
                    {vuln.summary}{" "}
                    {vuln.fixedInVersion.includes(" and ")
                      ? `It was fixed in versions ${vuln.fixedInVersion}`
                      : `It was fixed in version ${vuln.fixedInVersion}`}{" "}
                    as part of security hardening.
                  </p>
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
                      View Advisory
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