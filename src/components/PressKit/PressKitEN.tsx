"use client";
import Image from "next/image";
import Statistics from "@/components/Statistics/Statistics";
import PressKitAbout from "@/components/PressKit/components/PressKitAbout";
import PressKitLogos from "@/components/PressKit/components/PressKitLogos";
import PressKitScreenshots from "@/components/PressKit/components/PressKitScreenshots";
import PressKitQuotes from "@/components/PressKit/components/PressKitQuotes";
import PressKitContact from "@/components/PressKit/components/PressKitContact";

const PressKitEN = () => {

  return (
    <>
      {/* Press Kit - About AliasVault */}
      <PressKitAbout />

      {/* Statistics Section */}
      <Statistics />

      {/* What Makes AliasVault Different */}
      <div className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">What Makes AliasVault Unique</h2>
          <p className="mb-8 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
            AliasVault goes beyond traditional password managers by offering a complete privacy-first identity management toolkit. Built for users who care about control, security, and anonymity, AliasVault combines password storage, email aliasing, and identity generation in one open-source solution. See an overview of all unique features below.
          </p>
          <div className="mx-auto max-w-6xl mt-20">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">End-to-End Encryption</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  All data is encrypted locally using strong, zero-knowledge encryption (Argon2id + AES-256-GCM). Your master password never leaves your device.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Built-in Email Aliases</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Generate unique email addresses for every website or app to protect your real inbox and reduce spam or phishing risks.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Automatic Identity Generation</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Instantly create randomized identity profiles (name, birthdate, username, email) for anonymous sign-ups and accounts.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Self-Hosting Capability</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Run AliasVault entirely on your own PC or server using Docker. NAS and Raspbery Pi are also supported. No dependencies on third-party services or cloud providers.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Cross-Platform Availability</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Use AliasVault on the web, mobile (iOS & Android) and browser extensions (Chrome, Firefox, Edge, Safari, Brave) on the desktop.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Developed in the EU (Netherlands)</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                AliasVault is built in the Netherlands and designed to comply with European data protection values and GDPR principles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About the Founder */}
      <div className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">About the Founder</h2>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/20">
                  <Image
                    src="/images/founder/founder.jpg"
                    alt="Leendert de Borst, Founder of AliasVault"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">Leendert de Borst</h3>
              <p className="text-lg text-body-color dark:text-body-color-dark mb-6">Founder and creator of AliasVault</p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              <p>
                Leendert de Borst is a Dutch software developer and privacy advocate with over a decade of experience creating tools to protect digital identity. In 2013, he launched asdasd.nl, later evolving into SpamOK.com, a multilingual platform used by tens of thousands to guard against spam and data collection.
              </p>
              <p>
                In 2024, he began building AliasVault: an open-source, self-hostable password and alias manager that combines secure password storage, email aliasing, and identity generation in one privacy-first tool. Since its beta release in December 2024, AliasVault has added browser extensions for over five browsers, mobile apps, two-factor authentication, and import tools for more than ten password managers. Fully open source, self-funded, and free to use, the project will offer optional premium cloud features in the future to sustain long-term development.
              </p>
              <p>
                When asked why he created AliasVault, Leendert puts it plainly: &ldquo;I&apos;ve been fighting spam and building privacy tools for over a decade. AliasVault is the privacy platform I always wished existed.&rdquo; From the start, it has been about combining password management and privacy protection in a single, open-source platform, where the user decides what they share and with whom. It&apos;s also been about solving the problems people face with other password managers and giving them something they can truly trust. Because it&apos;s open source and everything can be hosted on your own server, users stay in control of their data with no hidden business model or data harvesting. Many have already moved over from big-name password managers, and that&apos;s something Leendert is proud of. AliasVault is built for people who value privacy and control, and it keeps evolving based on their feedback.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Press Kit - Founder Quotes */}
      <PressKitQuotes />

      {/* User Testimonials */}
      <div className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            User Testimonials
          </h2>
          <p className="mb-8 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
            What users are saying about AliasVault
          </p>
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                <blockquote className="text-base italic text-body-color dark:text-body-color-dark">
                  &ldquo;Awesome solution to a huge problem!&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center">
                  <Image src="/images/media/reddit.svg" alt="Reddit" width={20} height={20} className="mr-2" />
                  <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
                    Reddit r/selfhosted
                  </cite>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                <blockquote className="text-base italic text-body-color dark:text-body-color-dark">
                  &ldquo;The idea of the project is just pure fire…&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center">
                  <Image src="/images/media/hacker-news.svg" alt="Hacker News" width={20} height={20} className="mr-2" />
                  <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
                    Hacker News
                  </cite>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                <blockquote className="text-base italic text-body-color dark:text-body-color-dark">
                  &ldquo;First password vault that actually works like how I want a password vault to work!&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center">
                  <Image src="/images/media/discord.svg" alt="Discord" width={20} height={20} className="mr-2" />
                  <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
                    Discord user
                  </cite>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700 bg-white dark:bg-gray-800">
                <blockquote className="text-base italic text-body-color dark:text-body-color-dark">
                  &ldquo;The only password manager that is also an alias manager and identity generator!&rdquo;
                </blockquote>
                <div className="mt-3 flex items-center">
                  <Image src="/images/media/firefox.svg" alt="Firefox" width={20} height={20} className="mr-2" />
                  <cite className="text-sm font-medium text-gray-600 dark:text-gray-400 not-italic">
                    Firefox Add-on Reviews
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <PressKitLogos />

      {/* Screenshots Section */}
      <PressKitScreenshots />

      {/* Media Coverage */}
      <div className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Media Coverage
          </h2>
          <p className="mb-12 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
            AliasVault in the press and media
          </p>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">

              {/* YouTube Videos Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    <Image src="/images/media/youtube.svg" alt="YouTube" width={24} height={24} className="inline-block mt-[-5px]" /> Video Reviews
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://www.youtube.com/watch?v=BYlDoSGieaM"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          AliasVault - Don&apos;t wait any longer and protect your passwords
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Installation and demonstration of use (Spanish)
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">April 2025</span>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://www.youtube.com/watch?v=T7IqvNj5b2M"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          AliasVault: The Ultimate Open Source Tool for Secure Passwords and Private Identities
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          In-depth walkthrough and demonstration
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News & Tech Media Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    📰 News & Tech Media
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://tweakers.net/downloads/74638/aliasvault-0240.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Tweakers.nl: AliasVault 0.24.0
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Dutch tech web site
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">November 2025</span>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://opensourcedaily.blog/aliasvault-the-self-hosted-password-manager/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Open Source Daily: AliasVault - The Self-Hosted Password Manager
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          News about open source software
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">June 2025</span>
                    </div>
                  </div>
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://noted.lol/aliasvault/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Noted.lol: Self Hosted Password Manager with Built-In Email Server
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Independent home lab, self hosting and security blog
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">March 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Forums Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    💬 Community Discussions
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://discuss.privacyguides.net/t/aliasvault-open-source-e2ee-password-email-alias-manager/24436"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          PrivacyGuides Forum
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          AliasVault introduction and discussion
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">August 2025</span>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://www.reddit.com/r/selfhosted/comments/1hvrat0/aliasvault_opensource_password_email_alias/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Reddit r/selfhosted
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Self-hosting community discussion
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Jan 2025</span>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://www.reddit.com/r/privacy/comments/1hci4jx/i_built_an_opensource_password_and_alias_manager/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Reddit r/privacy
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Technical discussion and feedback
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Dec 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directory Listings Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    🔗 Directory Listings
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://github.com/pluja/awesome-privacy?tab=readme-ov-file#password-managers"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Awesome Privacy
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Awesome Privacy is a curated list of privacy-focused tools and services.
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">April 2025</span>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://awesome-selfhosted.net/tags/password-managers.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          Awesome Self-Hosted
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Curated list of self-hosted software
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">March 2025</span>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <a
                          href="https://alternativeto.net/software/aliasvault/about"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary hover:underline"
                        >
                          AlternativeTo
                        </a>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          Listed as alternative to 1Password, Bitwarden, and SimpleLogin
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Jan 2025</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Add more coverage note */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Have you covered AliasVault? <a href="mailto:contact@support.aliasvault.net" className="text-primary hover:underline">Let us know</a> to be featured here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <PressKitContact />
    </>
  );
};

export default PressKitEN;