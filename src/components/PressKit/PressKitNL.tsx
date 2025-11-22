"use client";
import Image from "next/image";
import Statistics from "@/components/Statistics/Statistics";
import PressKitAbout from "@/components/PressKit/components/PressKitAbout";
import PressKitLogos from "@/components/PressKit/components/PressKitLogos";
import PressKitScreenshots from "@/components/PressKit/components/PressKitScreenshots";
import PressKitQuotes from "@/components/PressKit/components/PressKitQuotes";
import PressKitContact from "@/components/PressKit/components/PressKitContact";

const PressKitNL = () => {

  return (
    <>
      {/* Press Kit - About AliasVault */}
      <PressKitAbout />

      {/* Statistics Section */}
      <Statistics />

      {/* Wat Maakt AliasVault Anders */}
      <div className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">Wat maakt AliasVault uniek</h2>
          <p className="mb-8 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
            AliasVault gaat verder dan traditionele wachtwoordmanagers door een complete privacy-first identiteitsbeheertoolkit aan te bieden. Gebouwd voor gebruikers die geven om controle, beveiliging en anonimiteit, combineert AliasVault wachtwoordopslag, e-mailaliasing en pseudoniemgeneratie in één open-source oplossing. Bekijk hieronder een overzicht van alle unieke functies.
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
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">End-to-end versleuteling</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Dankzij de zero-knowledge architectuur worden alle gegevens lokaal versleuteld met sterke versleuteling (Argon2id + AES-256-GCM). Je hoofdwachtwoord verlaat nooit je apparaat.
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
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Ingebouwde e-mailaliassen</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Genereer unieke e-mailadressen voor elke website of app om je echte inbox te beschermen tegen spam en phishingrisico&apos;s te verminderen.
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
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Random pseudoniemen</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Maak direct willekeurige pseudoniemen/schuilnamen (naam, geboortedatum, gebruikersnaam, e-mail) voor anonieme aanmeldingen en accounts.
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
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Self-hosting mogelijkheid</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Host AliasVault volledig op je eigen PC of server met Docker. NAS en Raspberry Pi worden ook ondersteund. Geen afhankelijkheid van externe diensten of cloudproviders.
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
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Cross-platform beschikbaarheid</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                  Gebruik AliasVault op het web, mobiel (iOS & Android) en browserextensies (Chrome, Firefox, Edge, Safari, Brave) op de desktop.
                </p>
              </div>

              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Image src="/images/flags/nl.svg" alt="Nederland" width={24} height={24} className="inline-block mt-[-5px]" />
                  </div>
                </div>
                <h4 className="mb-2 text-lg font-semibold text-black dark:text-white">Ontwikkeld in Nederland</h4>
                <p className="text-sm text-body-color dark:text-body-color-dark">
                AliasVault is met trots ontwikkeld in Nederland (als alternatief op Amerikaanse wachtwoordmanagers) en is vanaf de grond af aan ontworpen om te voldoen aan de AVG privacywetgeving.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Over de Oprichter */}
      <div className="py-16 md:py-20 lg:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">Over de oprichter</h2>
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <div className="mb-6 flex justify-center">
                <div className="h-24 w-24 overflow-hidden rounded-full ring-2 ring-primary/20">
                  <Image
                    src="/images/founder/founder.jpg"
                    alt="Leendert de Borst, Oprichter van AliasVault"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black dark:text-white">Leendert de Borst</h3>
              <p className="text-lg text-body-color dark:text-body-color-dark mb-6">Founder van AliasVault</p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-body-color dark:text-body-color-dark">
              <p>
                Leendert de Borst is een Nederlandse softwareontwikkelaar en voorvechter van privacy met meer dan 15 jaar ervaring in het maken van tools om (digitale) privacy te beschermen. In 2013 lanceerde hij de gratis tijdelijke e-mailservice asdasd.nl, dat later evolueerde naar SpamOK.nl, een meertalig platform dat door tienduizenden wordt gebruikt om zich te beschermen tegen spam en gegevensverzameling.
              </p>
              <p>
                In 2024 begon hij met het bouwen van AliasVault: een open-source, zelf-te-hosten wachtwoord- en (e-mail)aliasmanager die veilige wachtwoordopslag, e-mailaliasing en pseudoniemgeneratie combineert in één privacy-first tool. Sinds de eerste bètarelease in december 2024 krijgt AliasVault met iedere update steeds meer functies zoals bijvoorbeeld browserextensies, mobiele apps, tweefactorauthenticatie en importtools voor 10+ wachtwoordmanagers. Volledig open source, zelf gefinancierd en gratis te gebruiken, zal het project in de toekomst optionele premium cloudfuncties aan gaan bieden om de lange termijn ontwikkeling te ondersteunen.
              </p>
              <p>
                Op de vraag waarom hij AliasVault heeft gemaakt, zegt Leendert het volgende: &ldquo;Ik ben al meer dan tien jaar actief met het maken van online oplossingen die spam tegengaan. AliasVault is het privacy-platform waarvan ik altijd heb gewild dat het bestond.&rdquo; Vanaf het begin ging het om het combineren van wachtwoordbeheer en privacybescherming in één open-source platform, waar de gebruiker beslist wat ze delen en met wie. Het ging ook om het oplossen van problemen die mensen ondervinden met andere wachtwoordmanagers en hen iets geven waar ze echt op kunnen vertrouwen.</p>
              <p>
                De veranderende politieke situatie maakt het bovendien belangrijker dan ooit om meer Europese – en vooral Nederlandse – cybersecurity-oplossingen te ontwikkelen. De officiele AliasVault cloud servers zijn volledig in Europa gehost op eigen servers. Daarnaast, omdat AliasVault volledig open-source is, kunnen gebruikers er ook voor kiezen om alles op hun eigen server te hosten, waardoor gebruikers de volledige controle over hun gegevens behouden. Velen hebben inmiddels al de overstap gemaakt van bekende (Amerikaanse) wachtwoordmanagers, en daar is Leendert trots op. AliasVault is gebouwd voor mensen die waarde hechten aan hun privacy en zelf de regie over hun gegevens willen houden.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Press Kit - Founder Quotes */}
      <PressKitQuotes />

      {/* Gebruikersreviews */}
      <div className="py-12 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Gebruikersreviews
          </h2>
          <p className="mb-8 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
            Wat gebruikers zeggen over AliasVault
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

      {/* Mediaberichtgeving */}
      <div className="py-16 md:py-20 lg:py-24">
        <div className="container">
          <h2 className="mb-4 text-3xl text-center font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            Mediaberichtgeving
          </h2>
          <p className="mb-12 text-base text-center leading-relaxed text-body-color dark:text-body-color-dark">
            AliasVault in de pers en media
          </p>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">

              {/* YouTube Videos Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    <Image src="/images/media/youtube.svg" alt="YouTube" width={24} height={24} className="inline-block mt-[-5px]" /> Video reviews
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Januari 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* News & Tech Media Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    📰 Nieuws & tech media
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
                          Nederlandse tech community
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
                          Nieuws over open source software
                        </p>
                      </div>
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Juni 2025</span>
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Maart 2025</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Community Forums Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    💬 Community discussies
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Augustus 2025</span>
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Januari 2025</span>
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">December 2024</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Directory Listings Column */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-black dark:text-white">
                    🔗 Overige publicaties
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Maart 2025</span>
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
                      <span className="ml-4 text-xs text-gray-500 dark:text-gray-400">Januari 2025</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Add more coverage note */}
            <div className="mt-8 rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-800/50">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Heb je geschreven over AliasVault? <a href="mailto:contact@support.aliasvault.net" className="text-primary hover:underline">Laat het ons weten</a> om hier te worden gepubliceerd.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact section */}
      <PressKitContact />
    </>
  );
};

export default PressKitNL;