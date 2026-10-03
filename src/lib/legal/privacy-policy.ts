import type { LegalDocument } from "@/lib/legal";

export const privacyPolicy: LegalDocument = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  lastUpdated: "February 26, 2025",
  body: `## Introduction

Welcome to AliasVault, an open-source password and email alias manager designed to help you securely manage your online accounts and email aliases. Your privacy and security are our top priorities.

## Data Collection

We only require your username for authentication purposes. Your username can be a self-chosen name or your email address. We do not collect or store any additional personal data.

## End-to-End Encryption

All data stored within your vault, including all received emails, is end-to-end encrypted using your own master password. This ensures that only you can access and decrypt your data. Please note that if you lose your master password, we cannot help you retrieve your vault contents.

## Email Aliases

When you create email aliases on our official cloud service located at app.aliasvault.com, only the alias name is stored on our servers for handling purposes. All incoming emails are encrypted before being saved, ensuring that no one but you can read their contents.

## Service Options

AliasVault is available as both a cloud service and a self-hosted solution. Our cloud offering is hosted on our own servers in Germany, Finland, the Netherlands, and France, within the EU. Geographically separated to cover single points of failure, and fully compliant with GDPR. If you prefer complete control over your data, you can choose to self-host AliasVault on your own server.

## Cookies and Tracking

We may use cookies to enhance your user experience, but no personally identifiable information is collected. We do not use any third-party services to track your usage or collect data. For analytics purposes, we use a self-hosted instance of Plausible.io, which is a privacy-friendly analytics tool that does not track users across websites. All data collected by Plausible is anonymized and cannot be used to identify individual users, additionally all data is stored on our own servers.

## Data Deletion

You have full control over your data and can delete your account at any time through the official AliasVault hosted client at app.aliasvault.com. Upon account deletion, all associated data, including stored emails, will be permanently removed from our servers. Any email aliases you have created will be anonymized and orphaned, which means they will no longer work and no one else will be able to use them in the future. If you prefer to have your data removed by our team, you can submit a deletion request via email to our support team. For detailed instructions and what happens to your data, see our [Account Deletion](/account-deletion) page.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page along with an updated revision date. We encourage you to review this policy periodically.

## Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at: [support@aliasvault.com](mailto:support@aliasvault.com) or visit our [Contact page](/contact).
`,
};
