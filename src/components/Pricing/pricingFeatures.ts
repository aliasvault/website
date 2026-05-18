import { PricingFeatureRow } from "./types";

/** Feature rows aligned with the features page and alternative-to comparisons. */
export const pricingFeatureRows: PricingFeatureRow[] = [
  { id: "passwordsPasskeys", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "builtIn2FA", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "emailAliases", selfHosted: "yes", cloudFree: "fairUse", cloudPremium: "premium" },
  { id: "secureNotesAttachments", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "vaultStorage", selfHosted: "yes", cloudFree: "fairUse", cloudPremium: "premium" },
  { id: "backups", selfHosted: "yes", cloudFree: "fairUse", cloudPremium: "premium" },
  { id: "fullOfflineMode", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "browserExtensions", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "mobileApps", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "importExport", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "identityGenerator", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "endToEndEncryption", selfHosted: "yes", cloudFree: "yes", cloudPremium: "yes" },
  { id: "customDomain", selfHosted: "yes", cloudFree: "na", cloudPremium: "comingSoon" },
  { id: "premiumAliasDomains", selfHosted: "na", cloudFree: "na", cloudPremium: "premium" },
  { id: "temporaryPhoneNumbers", selfHosted: "na", cloudFree: "na", cloudPremium: "future" },
  { id: "openSourceSelfHost", selfHosted: "yes", cloudFree: "na", cloudPremium: "na" },
];
