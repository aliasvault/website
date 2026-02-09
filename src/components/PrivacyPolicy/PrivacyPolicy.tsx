import Link from "next/link";

const PrivacyPolicy = () => {
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
              Welcome to AliasVault, an open-source password and email alias manager designed to help you securely manage your online accounts and email aliases. Your privacy and security are our top priorities.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Data Collection
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We only require your username for authentication purposes. Your username can be a self-chosen name or your email address. We do not collect or store any additional personal data.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              End-to-End Encryption
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              All data stored within your vault, including all received emails, is end-to-end encrypted using your own master password. This ensures that only you can access and decrypt your data. Please note that if you lose your master password, we cannot help you retrieve your vault contents.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Email Aliases
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              When you create email aliases on our official cloud service located at app.aliasvault.net, only the alias name is stored on our servers for handling purposes. All incoming emails are encrypted before being saved, ensuring that no one but you can read their contents.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Service Options
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              AliasVault is available as both a cloud service and a self-hosted solution. Our cloud offering is hosted on our own servers in Germany, within the EU, and is fully compliant with GDPR. If you prefer complete control over your data, you can choose to self-host AliasVault on your own server.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Cookies and Tracking
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We may use cookies to enhance your user experience, but no personally identifiable information is collected. We do not use any third-party services to track your usage or collect data. For analytics purposes, we use a self-hosted instance of Plausible.io, which is a privacy-friendly analytics tool that does not track users across websites. All data collected by Plausible is anonymized and cannot be used to identify individual users, additionally all data is stored on our own servers.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Data Deletion
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              You have full control over your data and can delete your account at any time through the official AliasVault hosted client at app.aliasvault.net. Upon account deletion, all associated data, including stored emails, will be permanently removed from our servers. Any email aliases you have created will be anonymized and orphaned, which means they will no longer work and no one else will be able to use them in the future. If you prefer to have your data removed by our team, you can submit a deletion request via email to our support team. For detailed instructions and what happens to your data, see our{" "}
              <Link
                href="/account-deletion"
                className="text-primary hover:underline"
              >
                Account Deletion
              </Link>
              {" "}page.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Changes to This Privacy Policy
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page along with an updated revision date. We encourage you to review this policy periodically.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Contact Us
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
              <a
                href="mailto:contact@support.aliasvault.net"
                className="text-primary hover:underline"
              >
                contact@support.aliasvault.net
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

export default PrivacyPolicy;
