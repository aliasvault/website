import Link from "next/link";
import { getStatusPageUrl } from "@/lib/status-banner";

const TermsAndConditions = () => {
  const statusUrl = getStatusPageUrl();

  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Last updated: July 9, 2026
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Introduction
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault is designed to enhance your online security and protect your privacy. With AliasVault, you can create unique identities and email aliases for your various online accounts, helping you maintain control over your personal information and reduce the risk of identity theft.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Terms and Conditions
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              By using AliasVault, you agree to the following terms:
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              1. Prohibited Uses
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You will not use AliasVault for any illegal purposes, including but not limited to:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Fraud or financial scams</li>
              <li className="ml-6 list-disc">Identity theft or impersonating real individuals</li>
              <li className="ml-6 list-disc">Phishing attempts or malicious activities</li>
              <li className="ml-6 list-disc">Mass account creation for abusive purposes</li>
              <li className="ml-6 list-disc">Spam or unsolicited commercial communications</li>
              <li className="ml-6 list-disc">Any activity that violates applicable laws or regulations</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              2. Account Responsibility
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You are responsible for maintaining the confidentiality of your account and any aliases created through AliasVault. This includes:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Keeping your username and master password secure and confidential</li>
              <li className="ml-6 list-disc">Monitoring the use of your aliases for any unauthorized activity</li>
              <li className="ml-6 list-disc">Reporting any suspicious activity or potential security breaches</li>
              <li className="ml-6 list-disc">Ensuring that your use of aliases complies with the terms of service of the platforms you use them on</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Because AliasVault uses end-to-end encryption, we never have access to your master password, encryption keys, or the contents of your vault.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              This means we cannot recover or reset your credentials, or restore access to your data. If you lose your username or master password, you may permanently lose access to your account and everything stored in it.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              3. Fair Use Policy
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              To prevent abuse and ensure reliable service for all users, AliasVault applies a fair-use policy.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Fair-use monitoring may consider factors including, but not limited to:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">The total number of aliases created</li>
              <li className="ml-6 list-disc">The rate at which aliases are created</li>
              <li className="ml-6 list-disc">Alias lifecycle patterns, such as large numbers of aliases being disabled shortly after creation</li>
              <li className="ml-6 list-disc">Usage across multiple accounts</li>
              <li className="ml-6 list-disc">Other unusual activity patterns that may indicate automation, abuse, or misuse of the service</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              When automated systems detect usage that significantly exceeds normal levels or presents an elevated risk of abuse, we may temporarily limit account functionality pending review.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Paid plans are subject to higher usage limits. However, all accounts remain subject to abuse-prevention measures and these Terms and Conditions.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              4. Account Restrictions and Termination
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault reserves the right to temporarily restrict, suspend, or terminate accounts if we reasonably suspect misuse, abuse, or violations of these Terms.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Such actions may occur in circumstances including, but not limited to:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Reports from external parties (such as websites, platforms, service providers, or authorities) regarding abusive use of AliasVault aliases</li>
              <li className="ml-6 list-disc">Aliases being used in phishing attempts, scams, spam campaigns, or other malicious activities</li>
              <li className="ml-6 list-disc">Activity patterns that significantly exceed normal usage and trigger abuse-prevention systems</li>
              <li className="ml-6 list-disc">Attempts to circumvent fair-use limits or account restrictions</li>
              <li className="ml-6 list-disc">Any other violation of these Terms and Conditions</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Restrictions may include temporary limitations on alias creation, incoming email delivery, or other account functionality while a review is conducted.
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If an account is restricted as a result of automated checks, users are welcome to contact support and provide additional information regarding their use case. AliasVault may remove restrictions if, after review, the activity is determined to be legitimate and consistent with these Terms.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              5. Service Limitations
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You understand that while AliasVault enhances your privacy and security, no system is completely foolproof, and you use the service at your own risk. AliasVault provides:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">End-to-end encryption for your data</li>
              <li className="ml-6 list-disc">Privacy protection through alias generation</li>
              <li className="ml-6 list-disc">Secure password management</li>
              <li className="ml-6 list-disc">Built-in email server functionality</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              However, we cannot guarantee protection against all possible threats, and users should always exercise caution and follow security best practices.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              6. Maintenance Window
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We reserve a weekly maintenance window for our cloud infrastructure (servers) every Sunday from 05:00 to 07:00 UTC, used for work such as operating system and security updates or server upgrades. Most work causes no downtime, but short interruptions may occur. Maintenance with expected user impact is announced in advance on our{" "}
              <a
                href={statusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                status page
              </a>
              .
            </p>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Updates to the application itself are rolled out continuously with minimal disruption. Emergency maintenance may occur outside this window when necessary.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              7. Changes to These Terms
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We may update these Terms and Conditions from time to time. Any changes will be posted on this page along with an updated revision date. We encourage you to review these terms periodically to stay informed about how we expect users to use our service.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Contact Us
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If you have any questions or concerns about these Terms and Conditions, please contact us at:{" "}
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