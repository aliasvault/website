import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Last updated: February 26, 2025
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
              <li className="ml-6 list-disc">Keeping your master password secure and confidential</li>
              <li className="ml-6 list-disc">Monitoring the use of your aliases for any unauthorized activity</li>
              <li className="ml-6 list-disc">Reporting any suspicious activity or potential security breaches</li>
              <li className="ml-6 list-disc">Ensuring that your use of aliases complies with the terms of service of the platforms you use them on</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              3. Fair Use Policy
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              For free accounts, we implement a fair use policy to prevent abuse and ensure quality service for all users. This policy includes:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">Reasonable limits on the number of aliases created within a given time period</li>
              <li className="ml-6 list-disc">Monitoring for unusual activity patterns that may indicate automation or abuse</li>
              <li className="ml-6 list-disc">Review of accounts that create a large number of aliases (e.g., hundreds) in a short period</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Premium paid plans will be introduced in the coming months, to which the fair use policy will not apply.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              4. Account Termination
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault reserves the right to terminate your account if we suspect any misuse or violation of these terms. This may occur in the following circumstances:
            </p>
            <ul className="mt-4 space-y-2 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              <li className="ml-6 list-disc">An account is reported by external parties (e.g., websites, platforms, or official authorities) for mass-account creation fraud using AliasVault&apos;s alias system</li>
              <li className="ml-6 list-disc">Aliases are being used in phishing attempts or scams</li>
              <li className="ml-6 list-disc">Activity patterns suggest misuse, including violations of the fair-use policy for free accounts</li>
              <li className="ml-6 list-disc">Any other violation of these terms and conditions</li>
            </ul>
            <p className="mt-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If an account is blocked as a result of automated checks, users are welcome to contact support to clarify any unusual activity and explain their intended use case, after which a block can be removed.
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
              6. Changes to These Terms
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