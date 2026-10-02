import { Link } from "@/i18n/navigation";
import { getStatusPageUrl } from "@/lib/status-banner";

const TermsAndConditions = () => {
  const statusUrl = getStatusPageUrl();

  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Last updated: October 2, 2026
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Introduction
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              By using AliasVault, you agree to the following terms.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault is an open-source password manager with built-in email aliases that helps protect your privacy by creating a unique digital identity for every website you use.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              1. Definitions
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              For the purposes of these Terms and Conditions, the following definitions apply:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">AliasVault</strong>, <strong className="font-semibold text-black dark:text-white">we</strong>, <strong className="font-semibold text-black dark:text-white">us</strong>, or <strong className="font-semibold text-black dark:text-white">our</strong> refers to AliasVault, which is owned and operated by XIVISOFT, a sole proprietorship registered with the Netherlands Chamber of Commerce (KVK) under number 51592193. Where these Terms refer to AliasVault as a party to these Terms, or to its rights, obligations, or liability, this means XIVISOFT.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Cloud Service</strong> means the hosted version of AliasVault operated and managed by AliasVault.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Self-hosted Instance</strong> means an installation of the AliasVault software that is deployed, operated, and maintained by the User or a third party, and not by AliasVault.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Account</strong> means a user account used to access the AliasVault Cloud Service.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Vault</strong>{" "}means the encrypted storage containing a User&apos;s passwords, email aliases, passkeys, notes, and other data managed through AliasVault.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Email Alias</strong>{" "}means an email address created or managed through AliasVault that can be used to receive email without using the User&apos;s primary email address.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Services</strong> means the AliasVault Cloud Service, website, applications, and any related features or functionality provided by AliasVault.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">User</strong>, <strong className="font-semibold text-black dark:text-white">you</strong>, or <strong className="font-semibold text-black dark:text-white">your</strong> means any individual or entity accessing or using the Services.
              </li>
              <li className="ml-6 list-disc">
                <strong className="font-semibold text-black dark:text-white">Terms</strong> means these Terms and Conditions, as amended from time to time.
              </li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              These Terms apply to the Services provided and operated by AliasVault. They do not govern the operation of a Self-hosted Instance, except where expressly stated. Users operating a Self-hosted Instance are responsible for the deployment, operation, security, maintenance, and compliance of their own installation.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              2. Account Eligibility
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To use the AliasVault Cloud Service, you must:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Be at least 16 years of age, or the minimum age required to enter into a legally binding agreement in your jurisdiction, whichever is higher.</li>
              <li className="ml-6 list-disc">Have the legal capacity and authority to accept these Terms.</li>
              <li className="ml-6 list-disc">If you are using the Services on behalf of a company or other legal entity, represent and warrant that you have the authority to bind that entity to these Terms. In such cases, references to &quot;you&quot; and &quot;your&quot; refer to both you and the entity you represent.</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              By creating an Account or using the Services, you confirm that you meet these eligibility requirements.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              3. Account Responsibilities
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If you create an Account for the AliasVault Cloud Service, you are responsible for maintaining the security of your Account and for all activities that occur under it.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You agree to:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Keep your Account credentials (username and master password) confidential and take reasonable measures to protect them from unauthorized access.</li>
              <li className="ml-6 list-disc">
                Notify AliasVault promptly at{" "}
                <a
                  href="mailto:support@aliasvault.com"
                  className="text-primary hover:underline"
                >
                  support@aliasvault.com
                </a>
                {" "}if you become aware of any unauthorized use of your Account or any other security incident affecting your Account.
              </li>
              <li className="ml-6 list-disc">Ensure that your use of Email Aliases complies with the terms of service of the websites and platforms where you use them.</li>
              <li className="ml-6 list-disc">Not use multiple Accounts to circumvent usage limits, including by distributing usage across multiple Accounts to exceed limits that would otherwise apply to you.</li>
              <li className="ml-6 list-disc">Not sell, rent, lease, transfer, or otherwise provide your Account to another person or entity.</li>
            </ul>

            <h4 className="mb-2 mt-6 text-lg font-semibold text-black dark:text-white">
              Self-hosted Instances
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If you use a Self-hosted Instance, you are responsible for deploying, configuring, securing, maintaining, backing up, and updating that instance.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault is not responsible for data loss, unauthorized access, downtime, misconfiguration, email delivery issues, server security, backups, or legal compliance arising from the operation of a Self-hosted Instance that is not operated by AliasVault.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              This does not limit any rights you may have under applicable open-source licenses or consumer protection laws.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              4. Third-Party Services
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Certain features of the Services may depend on or integrate with third-party services, such as app stores, web browsers, payment processors, or other external platforms and services.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              These third-party services operate independently from AliasVault and may have their own terms and privacy policies that explain how they provide and manage their services.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault cannot guarantee the availability, security, or continued operation of third-party services and is not responsible for their acts, omissions, policies, or other matters outside AliasVault&apos;s reasonable control.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              5. Acceptable Use
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You agree to use the Services responsibly and in accordance with all applicable laws and regulations.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You will not use the Services to:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Commit fraud, financial scams, phishing, identity theft, or impersonate another person or organization.</li>
              <li className="ml-6 list-disc">Send spam, unsolicited commercial communications, or distribute malware or other harmful content.</li>
              <li className="ml-6 list-disc">Create or use Email Aliases for illegal, abusive, or malicious purposes.</li>
              <li className="ml-6 list-disc">Store or distribute unlawful content through the Services.</li>
              <li className="ml-6 list-disc">Attempt to gain unauthorized access to AliasVault, other Accounts, or related systems.</li>
              <li className="ml-6 list-disc">Attack, disrupt, or interfere with the availability, security, or normal operation of the Services, including through denial-of-service attacks or other malicious activity.</li>
              <li className="ml-6 list-disc">Use automated tools, bots, scripts, or scraping techniques to create Accounts, collect information, or interact with the Services in a manner not expressly permitted by AliasVault.</li>
              <li className="ml-6 list-disc">Circumvent or attempt to circumvent any Account, usage, rate, security, or service limitations implemented by AliasVault.</li>
              <li className="ml-6 list-disc">Abuse or intentionally overload AliasVault&apos;s support channels or personnel.</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              These Terms do not limit your rights under the open-source license applicable to the AliasVault software.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We reserve the right to investigate suspected violations of these Terms and to suspend or terminate Accounts where reasonably necessary to protect AliasVault, its users, or third parties.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              6. Fair Use Policy
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To prevent abuse and ensure quality service for all users, we apply a fair use policy to Accounts using the AliasVault Cloud Service. Reasonable limits may apply to Accounts, including but not limited to the number of Email Aliases, storage, API usage, and other service resources.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To protect the Services, we may monitor usage and activity patterns that may indicate automation, abuse, misuse, attempts to circumvent usage limits, or excessive consumption of service resources.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              This monitoring is limited to service metadata, such as the number of Email Aliases, request rates, and email volume. It never involves the contents of your Vault, which is end-to-end encrypted and cannot be read by AliasVault. More information about the data we process is available in our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The features and limits included with each service plan are described on the AliasVault{" "}
              <Link href="/pricing" className="text-primary hover:underline">
                pricing page
              </Link>
              {" "}or within the Services, where applicable.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We may introduce, modify, or remove reasonable limits to maintain the stability, security, availability, and fair use of the Services.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              7. Account Restrictions and Termination
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault may temporarily restrict or suspend an Account where we reasonably suspect misuse, abuse, or a violation of these Terms. AliasVault may terminate an Account where a violation is sufficiently serious or where reasonably necessary to protect the Services, other users, or third parties.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Such actions may be taken in circumstances including, but not limited to:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Reports from external parties (such as websites, platforms, service providers, or authorities) regarding abusive use of Email Aliases.</li>
              <li className="ml-6 list-disc">Email Aliases being used in phishing attempts, scams, spam campaigns, or other malicious activities.</li>
              <li className="ml-6 list-disc">Activity patterns that significantly exceed normal usage and trigger abuse-prevention systems.</li>
              <li className="ml-6 list-disc">Attempts to circumvent fair-use limits or Account restrictions.</li>
              <li className="ml-6 list-disc">Any other violation of these Terms.</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Restrictions may include temporary limitations on Email Alias creation, incoming email delivery, or other Account functionality while a review is conducted.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If an Account is restricted as a result of automated checks, you may contact support and provide additional information regarding your use of the Services. AliasVault may remove the restriction if, after review, the activity is determined to be legitimate and consistent with these Terms.
            </p>

            <h4 className="mb-2 mt-6 text-lg font-semibold text-black dark:text-white">
              Requests from Authorities and Third Parties
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Because Vault data is end-to-end encrypted, AliasVault cannot access, decrypt, or disclose the contents of your Vault, including in response to requests from authorities or other third parties. AliasVault will only disclose the limited non-encrypted information it holds, such as Account and Email Alias metadata, where it is required to do so by applicable law.
            </p>

            <h4 className="mb-2 mt-6 text-lg font-semibold text-black dark:text-white">
              Inactive Accounts
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To protect user privacy, reduce the retention of unused data, and maintain the security and reliability of the Services, AliasVault may delete Free Accounts that have remained inactive for a continuous period of twelve (12) months.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              For the purposes of this section, Account activity means an authenticated, user-initiated action through the AliasVault web application, mobile application, browser extension, or another supported AliasVault client. Such actions may include:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">signing in to or unlocking the Account;</li>
              <li className="ml-6 list-disc">viewing, creating, editing, deleting, importing, or exporting a Vault item;</li>
              <li className="ml-6 list-disc">using the Services to autofill or save account information;</li>
              <li className="ml-6 list-disc">creating, modifying, disabling, or using an Email Alias;</li>
              <li className="ml-6 list-disc">opening or managing an email within the Services; or</li>
              <li className="ml-6 list-disc">performing another authenticated action that demonstrates continued use of the Account.</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The passive receipt of an email, automatic background synchronization, the existence of stored data, or the continued operation of an existing Email Alias does not by itself constitute Account activity.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              8. Cancellation by User
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You may delete your Account at any time.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Details about how to delete your Account and what happens to your data are available on our{" "}
              <Link href="/account-deletion" className="text-primary hover:underline">
                Account Deletion Request
              </Link>
              {" "}page.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Deleting your Account is permanent. Once your Account has been deleted, you will no longer have access to the Services, and your Account, Vault, Email Aliases, and other associated data cannot be recovered.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              9. Password Recovery
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault uses end-to-end encryption to protect your data. We do not have access to your master password, encryption keys, or the contents of your Vault.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              As a result, AliasVault cannot recover or reset your master password or access your encrypted data on your behalf. If you lose your username or master password, you may permanently lose access to your Account and everything stored in it.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              As set out in Section 3, you are responsible for securely storing your username and master password.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              10. Security and Encryption
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault uses security measures designed to protect the Services and your data, including end-to-end encryption for Vault data.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              In addition to protecting your Account credentials as set out in Section 3, you are responsible for the security of the devices you use to access the Services.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              No security system can guarantee complete protection against all threats. You should keep your devices and software up to date and follow reasonable security practices when using the Services.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              11. Electronic Communications
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Official communications from AliasVault relating to the Services, your Account, or these Terms will be provided electronically through the Services or, where you have contacted us by email, by email.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              12. Intellectual Property
            </h3>

            <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">
              Open-Source Software
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault software that is expressly made available under the{" "}
              <a
                href="https://github.com/aliasvault/aliasvault/blob/main/LICENSE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GNU Affero General Public License v3.0 (AGPL-3.0)
              </a>
              {" "}is licensed in accordance with the terms of that license. Your rights to use, copy, modify, and distribute such software are governed by the AGPL-3.0 and are not restricted by these Terms.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The AGPL-3.0 applies only to software and other materials that are expressly made available under that license.
            </p>

            <h4 className="mb-2 mt-6 text-lg font-semibold text-black dark:text-white">
              AliasVault Intellectual Property
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Except for software or other materials expressly made available under the AGPL-3.0 or another license, AliasVault and its licensors retain all rights, title, and interest in intellectual property owned or licensed by them, including the AliasVault trademarks and brand assets.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              This includes, as applicable, the AliasVault name, trademarks, logos, icons, branding, website content, documentation, articles, text, graphics, illustrations, photographs, videos, social-media content and assets, marketing and promotional materials, and other content or materials provided by AliasVault.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The inclusion of such materials in the AliasVault software, a source-code repository, documentation, website, application, or other publicly accessible location does not, by itself, mean that those materials are licensed under the AGPL-3.0.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Except as expressly permitted by AliasVault, under an applicable license, or by applicable law, you may not reproduce, modify, distribute, sell, license, or use AliasVault&apos;s protected content or brand assets.
            </p>

            <h4 className="mb-2 mt-6 text-lg font-semibold text-black dark:text-white">
              Trademarks
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The AliasVault name, logos, and other distinctive brand identifiers may be protected by trademark and other applicable laws.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The AGPL-3.0 does not grant permission to use AliasVault trademarks or branding.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Use of AliasVault trademarks and brand identifiers is subject to the AliasVault{" "}
              <a
                href="https://github.com/aliasvault/aliasvault/blob/main/TRADEMARKS.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Trademark Policy
              </a>
              {" "}and applicable law.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Nothing in these Terms grants you the right to represent or imply that AliasVault sponsors, endorses, certifies, approves, or is affiliated with you or your product, service, project, or organization without prior authorization.
            </p>

            <h4 className="mb-2 mt-6 text-lg font-semibold text-black dark:text-white">
              Hosted Services
            </h4>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Subject to these Terms, AliasVault grants you a limited, non-exclusive, non-transferable, and revocable license to access and use the hosted Services for their intended purpose.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              This license applies only to your use of the hosted Services and is separate from any rights granted under the AGPL-3.0 or another open-source license.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Termination or suspension of your access to the hosted Services does not, by itself, modify rights you may have under an applicable open-source license.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              13. Service Limitations
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              The Services are currently in beta and under active development. They may contain bugs, errors, or other limitations, and features or functionality may change without notice. AliasVault may modify, add, remove, or restrict beta features where necessary to improve the Services, protect users, prevent abuse, or maintain service reliability.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You should not rely on the Services as your sole method of storing or accessing critical information without maintaining your own backups or exports.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              While the Services are designed to enhance your privacy and security, no system is completely foolproof, and you use the Services at your own risk.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Users may choose to create or use Email Aliases with public email domains. Public email domains operate differently from AliasVault&apos;s private email domains. Email received through public email domains may be publicly accessible and does not provide the same privacy protections as email received through AliasVault&apos;s private email domains. Public email domains should not be used for sensitive or confidential communications. More information about the differences between private and public email domains is available in our{" "}
              <a
                href="https://docs.aliasvault.com/installation/docs/private-vs-public-email/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Private vs Public Email Domains documentation
              </a>
              .
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              While AliasVault strives to provide reliable and secure Services, we do not guarantee that the Services will always be available, uninterrupted, error-free, or meet your expectations. We also do not guarantee protection against all possible threats or that every issue or bug will be identified or corrected. Users should always exercise caution and follow security best practices.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              14. Limitation of Liability
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To the fullest extent permitted by applicable law, AliasVault and its owners and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, revenue, business opportunities, goodwill, data, or other intangible losses arising out of or relating to your use of, or inability to use, the Services.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To the fullest extent permitted by applicable law, AliasVault&apos;s total liability for any claim arising out of or relating to the Services or these Terms shall not exceed the total amount you paid to AliasVault for the Services during the twelve (12) months immediately preceding the event giving rise to the claim.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              15. Changes to These Terms
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault may update these Terms from time to time. Any changes will be posted on this page along with an updated revision date.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If we make material changes, we will provide reasonable notice through the Services before the changes take effect, unless immediate or earlier changes are required by law or reasonably necessary to address security, legal, or operational issues.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Minor changes, including corrections, clarifications, or administrative updates that do not materially affect your rights or obligations, may take effect immediately.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Your continued use of the Services after the updated Terms take effect will be subject to the updated Terms. If you do not agree to the changes, you must stop using the Services and, if applicable, delete your Account.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              16. Governing Law and Jurisdiction
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              These Terms are governed by the laws of the Netherlands, excluding its conflict of law rules.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Any dispute arising out of or relating to these Terms or the Services shall be submitted to the competent courts of the Netherlands, unless applicable law provides otherwise.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Nothing in these Terms limits any mandatory consumer rights or protections that apply under applicable law.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              17. Maintenance Window
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault reserves a weekly maintenance window for its cloud infrastructure every Sunday from 05:00 to 07:00 UTC. This window may be used for activities such as operating system updates, security updates, infrastructure maintenance, or server upgrades.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Most maintenance is performed without downtime, but temporary interruptions or reduced service availability may occur.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              When maintenance is expected to have a noticeable impact on the availability of the Services, we will make reasonable efforts to announce it in advance through the official AliasVault{" "}
              <a
                href={statusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                status page
              </a>
              {" "}and, where appropriate, a notice on the AliasVault website.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Application updates are deployed continuously and are designed to minimize disruption. Emergency maintenance may be performed at any time without prior notice when necessary to protect the security, stability, or availability of the Services.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              18. Severability and No Waiver
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If we do not enforce a provision of these Terms right away, this does not mean we give up our right to enforce it later.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              19. Force Majeure
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault is not liable for any failure or delay in performing its obligations under these Terms where that failure or delay is caused by circumstances beyond its reasonable control. These include natural disasters, epidemics, war, terrorism, civil unrest, government actions, power or internet outages, failures of hosting, network, or other third-party providers, and cyberattacks that could not reasonably have been prevented.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault&apos;s affected obligations are suspended for as long as such circumstances continue. AliasVault will make reasonable efforts to limit their impact and to restore the Services as soon as reasonably possible.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              20. Assignment
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault may transfer these Terms, including its rights and obligations under them, to a successor entity, for example in connection with a change of legal form, merger, acquisition, or transfer of the business. Such a transfer will not reduce your rights under these Terms. If you do not agree with a transfer, you may stop using the Services and delete your Account at any time.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You may not transfer your rights or obligations under these Terms without AliasVault&apos;s prior written consent.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              21. Entire Agreement
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              These Terms, the{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              , and any other policies or documents referenced in these Terms (including the Trademark Policy and the plan features and limits described on the pricing page) constitute the entire agreement between you and AliasVault regarding your use of the Services and supersede any prior agreements, understandings, or communications relating to the Services.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Contact Us
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If you have any questions or concerns about these Terms, please contact us at:{" "}
              <a
                href="mailto:support@aliasvault.com"
                className="text-primary hover:underline"
              >
                support@aliasvault.com
              </a>
              {" "}or visit our{" "}
              <Link
                href="/contact"
                className="text-primary hover:underline"
              >
                Contact page
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
