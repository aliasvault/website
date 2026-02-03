const LegalNotice = () => {
  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Website Operator
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
            AliasVault is a product of XIVISOFT<br />
            Sole proprietorship operated by <a href="https://github.com/lanedirt" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Leendert de Borst</a>
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Business Registration
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              KVK (Chamber of Commerce): 51592193<br />
              Country of registration: Netherlands
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Hosting & Data Protection
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Our cloud-hosted service runs on dedicated servers located in Germany, hosted by{" "}
              <a
                href="https://www.hetzner.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Hetzner
              </a>
              . We are fully compliant with European GDPR regulations. All user data is end-to-end encrypted and stored within the EU.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Contact
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Email:{" "}
              <a
                href="mailto:contact@support.aliasvault.net"
                className="text-primary hover:underline"
              >
                contact@support.aliasvault.net
              </a>
              <br />
              Phone: +31 85 1249531 (no support via phone)
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Responsible for Content
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Leendert de Borst<br />
              Address available upon request
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Dispute Resolution
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We believe in open communication and resolving issues directly. If you have any concerns, please reach out to us first; we&apos;re happy to help.
              <br /><br />
              For EU consumers, the European Commission provides a platform for online dispute resolution (ODR):{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Content Responsibility
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              We take responsibility for our own content on this website. As AliasVault is a platform where users store their own encrypted data, we cannot access or monitor user-stored content. If you notice any issues with our website content, please let us know.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              External Links
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              Our website includes links to external resources that we find helpful. While we review these links when adding them, we don&apos;t control their content and can&apos;t be responsible for external websites. If you find a broken or problematic link, please let us know so we can review it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalNotice;
