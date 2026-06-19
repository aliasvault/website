import Link from "next/link";

const Documentation = () => {
  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <div className="space-y-8">
          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Technical Documentation
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              For technical documentation about installing and configuring AliasVault on your own server, visit our documentation website at{" "}
              <a
                href="https://docs.aliasvault.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                docs.aliasvault.com
              </a>.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              General Questions & Support
            </h3>
            <p className="mb-4 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
              For questions about using AliasVault or general support:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-base font-medium text-body-color dark:text-body-color-dark">
              <li>
                Check our{" "}
                <Link
                  href="/contact"
                  className="text-primary hover:underline"
                >
                  Contact page
                </Link>{" "}
                for support options
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Documentation;
