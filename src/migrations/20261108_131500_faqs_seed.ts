import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-sqlite'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import type { Faq } from '../payload-types'

/**
 * One-time content migration: moves the FAQ from the next-intl message files
 * (`faq.items.*` on the homepage, `pricing.faq.items.*` on the pricing page) into
 * the Payload `faqs` collection, in English and Dutch.
 */

type Status = 'published' | 'draft'

interface SeedFaq {
  slug: string
  category: Faq['category']
  showOn: NonNullable<Faq['showOn']>
  order: number
  status: Status
  en: { q: string; a: string }
  nl: { q: string; a: string }
}

const WHITEPAPER = 'https://docs.aliasvault.com/security-whitepaper/'
const INSTALL_DOCS = 'https://docs.aliasvault.com/installation/script/'

const FAQS: SeedFaq[] = [
  // ── Existing questions (published) ─────────────────────────────────────────
  {
    slug: 'what-is-aliasvault',
    category: 'getting-started',
    showOn: ['faq', 'home'],
    order: 10,
    status: 'published',
    en: {
      q: 'What is AliasVault and who is it for?',
      a: `AliasVault is a password manager built with a strong focus on privacy, making it the ideal choice for privacy-conscious individuals. All your data is safely stored inside your own personal vault and encrypted with your master password that never leaves your device. No one but you (not even us) can see inside your vault.

AliasVault also features a built-in email server that allows you to create unique email addresses (aliases) for different services. If you care about controlling your digital identity, preventing spam, and reducing your exposure in data breaches, AliasVault helps you manage credentials and aliases securely.

Fully open-source and transparent. No third-party dependencies.`,
    },
    nl: {
      q: 'Wat is AliasVault en voor wie is het bedoeld?',
      a: `AliasVault is een wachtwoordmanager met een sterke focus op privacy, waardoor het de ideale keuze is voor privacy-bewuste gebruikers. Al je gegevens worden veilig opgeslagen in je eigen vault (kluis) en versleuteld met je hoofdwachtwoord dat nooit je apparaat verlaat. Alleen jij kan in je vault kijken, niemand anders, zelfs wij niet.

De unieke feature van AliasVault is dat het daarnaast ook beschikt over een ingebouwde e-mailserver waarmee je unieke e-mailadressen (aliassen) kunt aanmaken voor verschillende services. Als je waarde hecht aan het houden van grip op je digitale privacy, het voorkomen van spam en het verminderen van je blootstelling bij datalekken, helpt AliasVault je om inloggegevens en aliassen veilig te beheren.

Volledig open-source en transparant. Geen afhankelijkheden van derden.`,
    },
  },
  {
    slug: 'security',
    category: 'security',
    showOn: ['faq', 'home'],
    order: 20,
    status: 'published',
    en: {
      q: 'How does AliasVault protect my data?',
      a: `Security is the foundation of AliasVault. End-to-end encryption (AES-256-GCM) is used to encrypt all your data. Everything, including usernames, passwords and even email contents, is encrypted on your device. Even on our servers, your information stays encrypted, protected by your master password, which only you know. Our strict zero-knowledge architecture guarantees that no one (not even us) can access your vault.

For in-depth technical details, read our [security whitepaper](${WHITEPAPER}).`,
    },
    nl: {
      q: 'Hoe beschermt AliasVault mijn gegevens?',
      a: `Beveiliging is de basis van AliasVault. End-to-end versleuteling (AES-256-GCM) wordt gebruikt om al je gegevens te versleutelen. Alles, inclusief gebruikersnamen, wachtwoorden en zelfs e-mailinhoud, wordt versleuteld op je apparaat. Zelfs op onze servers blijven je gegevens versleuteld, beschermd door je hoofdwachtwoord, dat alleen jij kent. Onze strikte zero-knowledge architectuur garandeert dat niemand anders dan jijzelf toegang heeft tot je vault (kluis).

Voor uitgebreide technische details, lees onze [security whitepaper](${WHITEPAPER}).`,
    },
  },
  {
    // Merges the old homepage "pricing" answer with the newer pricing-page copy.
    slug: 'pricing',
    category: 'pricing',
    showOn: ['faq', 'home'],
    order: 30,
    status: 'published',
    en: {
      q: 'How much does AliasVault cost?',
      a: `AliasVault is free to use with all of its current features, both on the official cloud and when you self-host. The core product will always stay free.

After our first official 1.0 release, we'll introduce optional Premium and Family plans on the official cloud for people who want more, such as higher limits, automatic snapshots and custom domains. These paid options help fund continued development and hosting costs. See our [pricing page](/pricing) for details.

If you'd like to support the project in the meantime, donations are very welcome. Visit our [contact page](/contact#donations) for more information.`,
    },
    nl: {
      q: 'Hoeveel kost AliasVault?',
      a: `AliasVault is gratis te gebruiken met alle huidige functies, zowel in de officiële cloud als wanneer je zelf host. Het kernproduct blijft altijd gratis.

Na onze eerste officiële 1.0-release introduceren we optionele Premium- en Family-abonnementen in de officiële cloud, voor wie meer wil, zoals hogere limieten, automatische snapshots en eigen domeinen. Deze betaalde opties helpen de verdere ontwikkeling en de hostingkosten te bekostigen. Bekijk onze [prijzenpagina](/nl/pricing) voor details.

Wil je het project in de tussentijd steunen? Donaties zijn zeer welkom. Bezoek onze [contactpagina](/nl/contact#donations) voor meer informatie.`,
    },
  },
  {
    slug: 'email-alias-feature',
    category: 'email-aliases',
    showOn: ['faq', 'home'],
    order: 40,
    status: 'published',
    en: {
      q: 'How does the email alias feature work?',
      a: `AliasVault includes a built-in email server that allows you to create unique email addresses (aliases) for different services.

When someone sends an email to your alias, it's received directly in AliasVault and immediately encrypted, helping you maintain privacy and reduce spam.`,
    },
    nl: {
      q: 'Hoe werkt de e-mailalias functie?',
      a: `AliasVault bevat een ingebouwde e-mailserver waarmee je unieke e-mailadressen (aliassen) kunt aanmaken voor verschillende services.

Wanneer iemand een e-mail naar je alias stuurt, wordt deze direct in AliasVault ontvangen en onmiddellijk versleuteld. Zo behoud je je privacy en krijg je minder spam.`,
    },
  },
  {
    slug: 'passkey-support',
    category: 'getting-started',
    showOn: ['faq', 'home'],
    order: 50,
    status: 'published',
    en: {
      q: 'Does AliasVault support passkeys?',
      a: `Yes! You can create and login with passkeys via the AliasVault browser extension, iOS and Android mobile apps. Passkeys are securely stored in your fully encrypted vault and automatically synced across all your devices, ensuring seamless and secure access wherever you need it.`,
    },
    nl: {
      q: 'Ondersteunt AliasVault passkeys?',
      a: `Ja! Je kunt passkeys aanmaken en inloggen met passkeys via de AliasVault browser extensie, iOS en Android mobiele apps. Passkeys worden veilig opgeslagen in je volledig versleutelde vault (kluis) en automatisch gesynchroniseerd tussen al je apparaten, zodat je overal veilig kunt inloggen.`,
    },
  },
  {
    slug: 'import-data',
    category: 'your-data',
    showOn: ['faq', 'home'],
    order: 60,
    status: 'published',
    en: {
      q: 'Can I import my passwords from other password managers?',
      a: `Yes! AliasVault makes it easy to migrate your credentials from other password managers. We support importing from popular services including 1Password, Bitwarden, Chrome, Dashlane, Firefox, KeePass, KeePassXC, Proton Pass, and Strongbox.

Simply export your data from your current password manager and use AliasVault's import function in the web app to seamlessly transfer all your credentials, notes, 2FA codes and other data.

Plus, AliasVault also includes export functionality, so if you ever decide to switch to another service in the future, you can easily take your data with you. You have full control over your data.`,
    },
    nl: {
      q: 'Kan ik mijn wachtwoorden importeren van andere wachtwoordmanagers?',
      a: `Ja! AliasVault maakt het eenvoudig om je inloggegevens over te zetten van andere wachtwoordmanagers. We ondersteunen het importeren van populaire services zoals 1Password, Bitwarden, Chrome, Dashlane, Firefox, KeePass, KeePassXC, Proton Pass en Strongbox.

Exporteer simpelweg je gegevens van je huidige wachtwoordmanager en gebruik AliasVault's importfunctie in de web-app om eenvoudig al je inloggegevens, notities, 2FA-codes en andere gegevens over te zetten.

Bovendien bevat AliasVault ook exportfunctionaliteit, dus als je ooit besluit om over te stappen naar een andere service, kun je je gegevens eenvoudig meenemen. Je hebt volledige controle over je gegevens.`,
    },
  },
  {
    slug: 'self-hosting',
    category: 'self-hosting',
    showOn: ['faq', 'home'],
    order: 70,
    status: 'published',
    en: {
      q: 'Can I self-host AliasVault on my own server?',
      a: `Yes, AliasVault is designed from the ground up to be fully self-hosted. You can easily deploy it on your own server using Docker, giving you complete control over your data and infrastructure. AliasVault comes with an automatic install script which makes installation a breeze.

Detailed installation instructions are available in our [documentation](https://docs.aliasvault.com).`,
    },
    nl: {
      q: 'Kan ik AliasVault zelf hosten op mijn eigen server?',
      a: `Ja, AliasVault is vanaf de grond opgebouwd om volledig zelf-gehost te worden. Je kunt AliasVault eenvoudig installeren op je eigen server met Docker, waardoor je volledige controle hebt over je gegevens en infrastructuur. AliasVault komt met een automatisch installatiescript dat installatie een fluitje van een cent maakt.

Gedetailleerde installatie-instructies zijn beschikbaar in onze [documentatie](https://docs.aliasvault.com).`,
    },
  },
  {
    slug: 'when-premium-available',
    category: 'pricing',
    showOn: ['faq', 'pricing'],
    order: 90,
    status: 'published',
    en: {
      q: 'When will Premium features become available?',
      a: `Premium and Family are optional paid cloud tiers that we will introduce in the coming months. They are for users who want more than fair-use on the free tier: higher limits on aliases and email storage, automatic snapshots, VIP alias domains, custom domains, and planned extras such as temporary phone numbers.

They launch once our first official 1.0 release is out. We will announce exact timing, pricing, and limits before anything goes live.

For now, the free cloud tier has all features with fair-use limits. Self-hosting is free too.

Donations are welcome before premium launches. See [Support development](/pricing#support-development).`,
    },
    nl: {
      q: 'Wanneer komen Premium-functies beschikbaar?',
      a: `De Premium en Family abonnementen zijn betaalde abonnementen die we in de komende maanden zullen introduceren. Deze zijn bedoeld voor wie meer wil dan fair-use op de gratis tier: hogere limieten op aliassen en e-mailopslag, automatische snapshots, VIP-aliasdomeinen, eigen domeinen en toekomstige geplande extras zoals tijdelijke telefoonnummers.

De abonnementen zullen worden aangeboden zodra onze eerste officiële 1.0-release er is. We kondigen het exacte moment, de prijzen en limieten aan vóór er iets live gaat.

De gratis versie heeft ook alle functies maar dan met fair-use limieten. Self-hosten is ook gratis.

Donaties zijn altijd zeer welkom. Zie [Steun de ontwikkeling](/nl/pricing#support-development).`,
    },
  },
  {
    slug: 'free-tier-stays',
    category: 'pricing',
    showOn: ['faq', 'pricing'],
    order: 100,
    status: 'published',
    en: {
      q: 'Will you always offer a free tier?',
      a: `Yes. We will always offer a free cloud tier and a free, open-source self-hosted option. Features that matter for privacy and security will not go behind a paywall.

Fair-use limits on shared cloud resources help keep hosting sustainable. They are not meant to lock you out of core functionality.`,
    },
    nl: {
      q: 'Bieden jullie altijd een gratis tier aan?',
      a: `Ja. We bieden altijd een gratis cloudtier en een gratis, open-source self-hosted optie aan. Functies die belangrijk zijn voor privacy en veiligheid komen niet achter een betaalmuur.

Fair-use limieten op gedeelde cloudresources zorgen ervoor dat we dit duurzaam kunnen aanbieden. Ze zijn niet bedoeld om je de toegang tot kernfunctionaliteit te ontzeggen.`,
    },
  },
  {
    slug: 'how-can-it-be-free',
    category: 'pricing',
    showOn: ['faq', 'pricing'],
    order: 110,
    status: 'published',
    en: {
      q: 'How can you offer AliasVault for free?',
      a: `We offer a free tier because of our mission. We believe privacy is a right, not a luxury. Our mission is to put control back into the hands of users, helping them stay secure and anonymous online.

We are self-funded with enough reserves to run sustainably and built AliasVault lean: a small team, no big offices, no investors. No pressure to shrink the free tier, sell your data, or chase growth at your expense. Optional paid plans after v1.0 and community support help long term; the core product stays free.`,
    },
    nl: {
      q: 'Hoe kunnen jullie AliasVault gratis aanbieden?',
      a: `We bieden een gratis tier vanwege onze missie. Wij geloven dat privacy een recht is, geen luxe. Onze missie is om je de controle terug te geven, zodat je veilig en anoniem online kunt blijven.

We zijn self-funded met voldoende reserves om duurzaam te draaien en hebben AliasVault bewust efficient gebouwd: een klein team, geen grote kantoren, geen investeerders. Geen druk om de gratis tier in te krimpen of groei ten koste van kwaliteit. Optionele betaalde abonnementen na v1.0 en steun van de community helpen de duurzaamheid op lange termijn; het kernproduct blijft echter altijd gratis.`,
    },
  },
  {
    // Merged with the former "What's the story behind AliasVault?" entry (slug `story`).
    slug: 'self-funded',
    category: 'company',
    showOn: ['faq', 'pricing'],
    order: 120,
    status: 'published',
    en: {
      q: 'Who is behind AliasVault?',
      a: `AliasVault is an open-source project founded by Leendert de Borst, a software developer and architect from The Netherlands. In 2013 he launched asdasd.nl, a Dutch temporary email service that grew into the multilingual SpamOK.com. Over the years it became clear that protecting your inbox alone wasn't enough, so in 2024 he started building AliasVault: one place for unique passwords and email aliases, end-to-end encrypted and self-hostable.

The project is entirely self-funded, with no external investors or venture capital. We answer to our users and our [mission](/mission), and our roadmap follows community needs rather than investor pressure. Optional donations and the upcoming Premium and Family plans help sustain development, while the open-source core and the self-hosted option stay central to what we build.

The official cloud runs on dedicated servers in Germany, Finland, the Netherlands and France: geographically separated to avoid single points of failure, and fully compliant with the European GDPR.

Read the full story on our [About page](/about).`,
    },
    nl: {
      q: 'Wie zit er achter AliasVault?',
      a: `AliasVault is een open-source project, opgericht door Leendert de Borst, softwareontwikkelaar en architect uit Nederland. In 2013 lanceerde hij asdasd.nl, een Nederlandse tijdelijke e-mailservice die uitgroeide tot de meertalige SpamOK.com. In de loop der jaren werd duidelijk dat alleen je inbox beschermen niet genoeg was. Daarom begon hij in 2024 aan AliasVault: één plek voor unieke wachtwoorden en e-mailaliassen, end-to-end versleuteld en zelf te hosten.

Het project is volledig zelf gefinancierd, zonder externe investeerders of durfkapitaal. We zijn alleen verantwoording verschuldigd aan onze gebruikers en onze [missie](/nl/mission), en onze roadmap volgt wat de community nodig heeft, niet de druk van investeerders. Optionele donaties en de komende Premium- en Family-abonnementen helpen de ontwikkeling te ondersteunen. Het open-source product en de self-hosted optie blijven centraal in wat we bouwen.

De officiële cloud draait op dedicated servers in Duitsland, Finland, Nederland en Frankrijk: geografisch gescheiden om single points of failure te voorkomen, en volledig conform de Europese AVG (GDPR).

Lees het hele verhaal op onze [Over AliasVault-pagina](/nl/about).`,
    },
  },
  {
    slug: 'fair-use',
    category: 'pricing',
    showOn: ['faq', 'pricing'],
    order: 130,
    status: 'published',
    en: {
      q: 'What are fair-use limits on the cloud free tier?',
      a: `The cloud free tier includes every product feature: password manager, passkeys, 2FA, email aliases, offline mode, extensions, mobile apps, and more. Fair-use limits apply only to shared cloud resources: how many email aliases you use, how much vault and email storage you consume, and how backups are handled.

These limits prevent abuse and keep the free tier viable for everyone. Specific numbers will be communicated clearly before any change. Self-hosted users are not subject to our cloud fair-use policy.`,
    },
    nl: {
      q: 'Wat zijn fair-use limieten op de gratis cloudtier?',
      a: `De gratis cloudtier bevat alle productfuncties: wachtwoordbeheer, passkeys, 2FA, e-mailaliassen, offline modus, extensies, mobiele apps en meer. Fair-use limieten gelden alleen voor gedeelde cloudresources: hoeveel e-mailaliassen je gebruikt, hoeveel vault- en e-mailopslag je verbruikt, en hoe back-ups worden afgehandeld.

Deze limieten voorkomen misbruik en houden de gratis tier haalbaar voor iedereen. Specifieke getallen worden duidelijk gecommuniceerd vóór elke wijziging. Self-hosted gebruikers vallen niet onder ons cloud fair-use beleid.`,
    },
  },
  {
    slug: 'self-hosted-vs-cloud',
    category: 'self-hosting',
    showOn: ['faq', 'pricing'],
    order: 140,
    status: 'published',
    en: {
      q: 'Should I use the official cloud or self-host?',
      a: `For most people, the official cloud is the simplest choice. There is no server setup, your vault syncs across devices right away, and you are always on the latest version with updates applied for you. All data is end-to-end encrypted at all times.

If you want everything in your own hands, you can self-host as well. You run AliasVault on your own server or VPS with no limits from us beyond your own hardware, and you can use your own domain on your infrastructure. Experience with Docker is required.

Both options use the same open-source software. See our [source code & docs](/source-code) to get started with self-hosting.`,
    },
    nl: {
      q: 'Moet ik de officiële cloud gebruiken of self-hosten?',
      a: `Voor de meeste mensen is de officiële cloud de eenvoudigste keuze. Geen server-setup, je vault synchroniseert direct op al je apparaten, en je zit altijd op de nieuwste versie met updates die voor je worden uitgerold. Alle data is altijd end-to-end versleuteld.

Wil je alles zelf in handen houden, dan kun je ook self-hosten. Je draait AliasVault op je eigen server of VPS zonder limieten van ons, alleen die van je eigen hardware, en je kunt je eigen domein op je infrastructuur gebruiken. Ervaring met Docker is vereist.

Beide opties gebruiken dezelfde open-source software. Bekijk onze [broncode & docs](/nl/source-code) om te starten met self-hosting.`,
    },
  },
  {
    slug: 'here-to-stay',
    category: 'company',
    showOn: ['faq', 'home', 'pricing'],
    order: 150,
    status: 'published',
    en: {
      q: 'Is AliasVault here for the long term?',
      a: `Yes. We build AliasVault with a long-term vision, not with a quick exit in mind. The product is never "done"; we keep developing, improving, and refining AliasVault continuously to give users the best possible experience over the long term.

Our spiritual predecessor, [SpamOK.com](https://spamok.com), has been running since 2013. That is more than 13 years of uninterrupted service helping people fight spam and protect their privacy online. The same long-term mindset applies to AliasVault.`,
    },
    nl: {
      q: 'Is AliasVault er voor de lange termijn?',
      a: `Ja. We bouwen aan AliasVault met een langetermijnvisie, niet met het oog op een snelle exit. Het product is nooit “af”; we blijven AliasVault continu doorontwikkelen, verbeteren en verfijnen om gebruikers op de lange termijn de best mogelijke ervaring te bieden.

Onze spirituele voorganger, [SpamOK.nl](https://spamok.nl), bieden we al aan sinds 2013. Dat is meer dan 13 jaar ononderbroken service om mensen te helpen spam te bestrijden en hun privacy online te beschermen. Dezelfde langetermijnmentaliteit geldt voor AliasVault.`,
    },
  },
  {
    slug: 'device-support',
    category: 'getting-started',
    showOn: ['faq'],
    order: 160,
    status: 'published',
    en: {
      q: 'Which devices are supported by AliasVault?',
      a: `AliasVault works on all major platforms: web, desktop, and mobile.

You can access your vault through the AliasVault web app, browser extensions, or by downloading the mobile apps, ensuring you always have access to your vault no matter the device.`,
    },
    nl: {
      q: 'Welke apparaten worden ondersteund door AliasVault?',
      a: `AliasVault werkt op alle belangrijke platforms: web, desktop en mobiel.

Je kunt je vault (kluis) benaderen via de AliasVault web-app, browserextensies, of door de mobiele apps te downloaden, zodat je altijd toegang hebt tot je vault ongeacht het apparaat.`,
    },
  },
  {
    slug: 'service-status',
    category: 'getting-started',
    showOn: ['faq'],
    order: 170,
    status: 'published',
    en: {
      q: 'Is AliasVault down? How do I check service status?',
      a: `If the AliasVault cloud service isn't working as expected, you can check the real-time service status and incident history on our [status page](https://status.aliasvault.com). It shows any ongoing incidents or planned maintenance. If there are no incidents and you're still experiencing problems, please contact us at [support@aliasvault.com](mailto:support@aliasvault.com).`,
    },
    nl: {
      q: 'Is AliasVault offline? Hoe controleer ik de servicestatus?',
      a: `Als de AliasVault-clouddienst niet naar verwachting werkt, kun je de actuele servicestatus en de incidentgeschiedenis bekijken op onze [statuspagina](https://status.aliasvault.com). Daar zie je eventuele lopende storingen of gepland onderhoud. Zijn er geen storingen maar ondervind je toch problemen? Neem dan contact met ons op via [support@aliasvault.com](mailto:support@aliasvault.com).`,
    },
  },
  {
    slug: 'email-alias-limitations',
    category: 'email-aliases',
    showOn: ['faq'],
    order: 220,
    status: 'published',
    en: {
      q: 'Are there limitations to using email aliases?',
      a: `Currently there are two main restrictions:

1. Email aliases are receive-only, meaning you cannot send or reply to emails from your aliases. This measure prevents potential abuse of the system for spam.
2. There is a 10 megabyte size limit for incoming emails. Any emails larger than this will be rejected.

In the future, optional paid subscriptions will lift these restrictions. Email storage on the free cloud tier is subject to [fair use](/faq#fair-use).`,
    },
    nl: {
      q: 'Zijn er beperkingen aan het gebruik van e-mailaliassen?',
      a: `Momenteel zijn er twee restricties:

1. E-mailaliassen zijn alleen-ontvangen, wat betekent dat je geen e-mails kunt verzenden of beantwoorden vanaf je aliassen. Deze maatregel voorkomt mogelijk misbruik van het systeem voor spam.
2. Er is een limiet van 10 megabyte voor inkomende e-mails. E-mails groter dan dit worden geweigerd.

In de toekomst zullen optionele betaalde abonnementen deze restricties opheffen. Voor e-mailopslag op de gratis cloudtier geldt [fair use](/nl/faq#fair-use).`,
    },
  },

  // ── New questions (drafts, review before publishing) ────────────────────────
  {
    slug: 'security-audit',
    category: 'security',
    showOn: ['faq', 'home'],
    order: 80,
    status: 'draft',
    en: {
      q: 'Has AliasVault been independently audited?',
      a: `Not yet. An independent security audit by an external party is planned ahead of our official 1.0 release, so that it covers the core functionality that ships in 1.0. Once the audit is complete, we'll publish the report on our website.

Until then, you don't have to take our word for it: all of AliasVault's code (apps and server) is open source, our [security whitepaper](${WHITEPAPER}) documents the full security design, and our [responsible disclosure page](/responsible-disclosure#hall-of-fame) lists reported vulnerabilities and how we fixed them. You can follow the audit on our [roadmap](/roadmap).`,
    },
    nl: {
      q: 'Is AliasVault onafhankelijk geaudit?',
      a: `Nog niet. Een onafhankelijke beveiligingsaudit door een externe partij staat gepland vóór onze officiële 1.0-release, zodat de audit de kernfunctionaliteit van 1.0 omvat. Zodra de audit is afgerond, publiceren we het rapport op onze website.

Tot die tijd hoef je ons niet op ons woord te geloven: alle code van AliasVault (apps én server) is open source, onze [security whitepaper](${WHITEPAPER}) beschrijft het volledige beveiligingsontwerp, en op onze [responsible disclosure-pagina](/nl/responsible-disclosure#hall-of-fame) staan gemelde kwetsbaarheden en hoe we ze hebben opgelost. De audit volg je op onze [roadmap](/nl/roadmap).`,
    },
  },
  {
    slug: 'bug-bounty',
    category: 'security',
    showOn: ['faq'],
    order: 180,
    status: 'draft',
    en: {
      q: 'Do you have a bug bounty program?',
      a: `We don't run a paid bug bounty program. We do take every report seriously, and we credit the researchers who help us: in the release notes and/or security advisory, and in the Hall of Fame on our [responsible disclosure page](/responsible-disclosure#hall-of-fame).

Found a vulnerability? Please email [security@aliasvault.com](mailto:security@aliasvault.com). We acknowledge reports within 48 hours, keep you updated while we investigate, request a CVE where applicable, and coordinate the disclosure timeline with you. Our [responsible disclosure policy](/responsible-disclosure) has the full guidelines and scope.`,
    },
    nl: {
      q: 'Hebben jullie een bug bounty-programma?',
      a: `We hebben geen betaald bug bounty-programma. We nemen wel elke melding serieus en geven onderzoekers die ons helpen de erkenning die ze verdienen: in de release notes en/of het security advisory, en in de Hall of Fame op onze [responsible disclosure-pagina](/nl/responsible-disclosure#hall-of-fame).

Een kwetsbaarheid gevonden? Mail naar [security@aliasvault.com](mailto:security@aliasvault.com). We bevestigen je melding binnen 48 uur, houden je op de hoogte tijdens ons onderzoek, vragen waar van toepassing een CVE aan en stemmen het moment van openbaarmaking met je af. Ons [responsible disclosure-beleid](/nl/responsible-disclosure) bevat de volledige richtlijnen en scope.`,
    },
  },
  {
    slug: 'security-track-record',
    category: 'security',
    showOn: ['faq'],
    order: 190,
    status: 'draft',
    en: {
      q: "What is AliasVault's security track record?",
      a: `We handle security in the open. Once a reported vulnerability is fixed, we publish it in the Hall of Fame on our [responsible disclosure page](/responsible-disclosure#hall-of-fame), with its severity, the CVE or GitHub security advisory where applicable, and the version that fixed it.

Because all of AliasVault is open source, anyone can review the code, and our [security whitepaper](${WHITEPAPER}) documents how your data is protected, including the threat model and known limitations.`,
    },
    nl: {
      q: 'Hoe staat AliasVault ervoor op het gebied van beveiliging?',
      a: `We gaan open om met beveiliging. Zodra een gemelde kwetsbaarheid is opgelost, publiceren we die in de Hall of Fame op onze [responsible disclosure-pagina](/nl/responsible-disclosure#hall-of-fame), met de ernst, waar van toepassing de CVE of het GitHub security advisory, en de versie waarin het is opgelost.

Omdat AliasVault volledig open source is, kan iedereen de code controleren. Onze [security whitepaper](${WHITEPAPER}) beschrijft hoe je gegevens worden beschermd, inclusief het dreigingsmodel en de bekende beperkingen.`,
    },
  },
  {
    slug: 'export-data',
    category: 'your-data',
    showOn: ['faq'],
    order: 200,
    status: 'draft',
    en: {
      q: 'Can I export my data? How do I avoid being locked in?',
      a: `Yes. You can export your vault at any time from the AliasVault apps, either as an encrypted export or as an unencrypted file that you can import elsewhere. Your data is yours, and you can always take it with you.

AliasVault is also fully open source and can be self-hosted, so you never depend on our cloud service: you can move your vault to your own server and keep using the same apps.`,
    },
    nl: {
      q: 'Kan ik mijn gegevens exporteren? Hoe voorkom ik dat ik vastzit?',
      a: `Ja. Je kunt je vault op elk moment exporteren vanuit de AliasVault-apps, als versleutelde export of als onversleuteld bestand dat je elders kunt importeren. Je gegevens zijn van jou en je kunt ze altijd meenemen.

AliasVault is bovendien volledig open source en kan zelf gehost worden, dus je bent nooit afhankelijk van onze clouddienst: je kunt je vault naar je eigen server verhuizen en dezelfde apps blijven gebruiken.`,
    },
  },
  {
    slug: 'automatic-backups',
    category: 'your-data',
    showOn: ['faq'],
    order: 210,
    status: 'draft',
    en: {
      q: 'Can I set up automatic backups of my vault?',
      a: `Your vault is end-to-end encrypted and synced between our servers and your devices. If you also want your own copy, you can export your vault at any time from the apps.

Automatic vault exports for cloud users are something we're considering. If you'd use it, please share your thoughts on [GitHub](https://github.com/aliasvault/aliasvault/issues/1363).

Self-hosting? See [How do I back up my self-hosted server?](/faq#self-hosting-backups)`,
    },
    nl: {
      q: 'Kan ik automatische back-ups van mijn vault instellen?',
      a: `Je vault is end-to-end versleuteld en wordt gesynchroniseerd tussen onze servers en je apparaten. Wil je ook je eigen kopie? Dan kun je je vault op elk moment exporteren vanuit de apps.

We overwegen automatische vault-exports voor cloudgebruikers. Zou je dat gebruiken? Deel je mening op [GitHub](https://github.com/aliasvault/aliasvault/issues/1363).

Host je zelf? Zie [Hoe maak ik een back-up van mijn self-hosted server?](/nl/faq#self-hosting-backups)`,
    },
  },
  {
    slug: 'custom-domain',
    category: 'email-aliases',
    showOn: ['faq'],
    order: 230,
    status: 'draft',
    en: {
      q: 'Can I use my own domain for email aliases?',
      a: `Yes, when you self-host. Point your domain's MX record to your own AliasVault server, and email for your aliases is received directly on your server, independent of ours. The [installation guide](${INSTALL_DOCS}) explains the DNS setup.

On the official cloud, connecting your own domain is planned as a Premium feature after the 1.0 release.`,
    },
    nl: {
      q: 'Kan ik mijn eigen domein gebruiken voor e-mailaliassen?',
      a: `Ja, als je zelf host. Laat het MX-record van je domein naar je eigen AliasVault-server wijzen, dan wordt e-mail voor je aliassen rechtstreeks op jouw server ontvangen, los van de onze. De [installatiehandleiding](${INSTALL_DOCS}) legt de DNS-instellingen uit.

In de officiële cloud staat het koppelen van je eigen domein gepland als Premium-functie na de 1.0-release.`,
    },
  },
  {
    slug: 'self-hosting-email',
    category: 'self-hosting',
    showOn: ['faq'],
    order: 240,
    status: 'draft',
    en: {
      q: 'How hard is it to self-host AliasVault with email?',
      a: `If you're comfortable with Docker and basic server administration, it's very doable. You need a 64-bit Linux server (minimum 1 vCPU and 1 GB RAM) with Docker and a public IPv4 address. The install script sets up all the containers for you.

To receive email on your own domain, you also need to:

- add an A record (e.g. \`mail\`) and an MX record for your domain that point to your server
- make sure ports 25 and 587 are reachable from the internet (some residential ISPs block these)
- run \`./install.sh configure-email\` to register your domains

The [installation guide](${INSTALL_DOCS}) walks you through every step.`,
    },
    nl: {
      q: 'Hoe moeilijk is het om AliasVault met e-mail zelf te hosten?',
      a: `Als je bekend bent met Docker en basis serverbeheer, is het goed te doen. Je hebt een 64-bit Linux-server nodig (minimaal 1 vCPU en 1 GB RAM) met Docker en een publiek IPv4-adres. Het installatiescript zet alle containers voor je op.

Om e-mail op je eigen domein te ontvangen, moet je daarnaast:

- een A-record (bijv. \`mail\`) en een MX-record voor je domein aanmaken die naar je server wijzen
- zorgen dat poort 25 en 587 bereikbaar zijn vanaf internet (sommige internetproviders blokkeren deze voor thuisaansluitingen)
- \`./install.sh configure-email\` uitvoeren om je domeinen in te stellen

De [installatiehandleiding](${INSTALL_DOCS}) neemt je stap voor stap mee.`,
    },
  },
  {
    slug: 'self-hosting-updates',
    category: 'self-hosting',
    showOn: ['faq'],
    order: 250,
    status: 'draft',
    en: {
      q: 'How are updates and maintenance handled when self-hosting?',
      a: `You stay in control: nothing updates automatically. The install script wraps the common Docker tasks, so updating to the latest release is a single command: \`./install.sh update\`. It also checks for and applies updates to the install script itself. We recommend making a backup before every update.

Self-hosting does mean you're responsible for your server: keeping the operating system and Docker patched, keeping an eye on disk space, and applying AliasVault updates when new releases come out. You can follow releases on [GitHub](https://github.com/aliasvault/aliasvault/releases). See the [update guide](https://docs.aliasvault.com/installation/update/) for details.`,
    },
    nl: {
      q: 'Hoe werken updates en onderhoud bij self-hosting?',
      a: `Jij houdt de controle: er wordt niets automatisch bijgewerkt. Het installatiescript neemt de gangbare Docker-taken uit handen, dus updaten naar de nieuwste release is één commando: \`./install.sh update\`. Het controleert daarbij ook op updates van het installatiescript zelf. We raden aan om vóór elke update een back-up te maken.

Self-hosting betekent wel dat je zelf verantwoordelijk bent voor je server: het besturingssysteem en Docker up-to-date houden, de schijfruimte in de gaten houden en AliasVault-updates installeren zodra er nieuwe releases verschijnen. Releases volg je op [GitHub](https://github.com/aliasvault/aliasvault/releases). Zie de [update-handleiding](https://docs.aliasvault.com/installation/update/) voor details.`,
    },
  },
  {
    slug: 'self-hosting-backups',
    category: 'self-hosting',
    showOn: ['faq'],
    order: 260,
    status: 'draft',
    en: {
      q: 'How do I back up my self-hosted AliasVault server?',
      a: `Use the install script to export the database: \`./install.sh db-export > backup.sql.gz\`. To restore it, use \`./install.sh db-import\`.

Your users' vaults and emails stay end-to-end encrypted inside the backup, but it also contains account data, so store it somewhere safe.

To automate backups, schedule the export command (for example with cron) and copy the file to off-site storage of your choice, such as S3 or WebDAV.`,
    },
    nl: {
      q: 'Hoe maak ik een back-up van mijn self-hosted AliasVault-server?',
      a: `Exporteer de database met het installatiescript: \`./install.sh db-export > backup.sql.gz\`. Terugzetten doe je met \`./install.sh db-import\`.

De vaults en e-mails van je gebruikers blijven in de back-up end-to-end versleuteld, maar de back-up bevat ook accountgegevens, dus bewaar hem op een veilige plek.

Wil je back-ups automatiseren? Plan het exportcommando in (bijvoorbeeld met cron) en kopieer het bestand naar externe opslag naar keuze, zoals S3 of WebDAV.`,
    },
  },
  {
    slug: 'self-hosting-independence',
    category: 'self-hosting',
    showOn: ['faq'],
    order: 270,
    status: 'draft',
    en: {
      q: 'Can I run AliasVault completely independently of your infrastructure?',
      a: `Yes. A self-hosted AliasVault server runs without any of our infrastructure: your vaults, user accounts and email aliases all live on your own server. With your own domain, incoming email is received directly by your server, without passing through ours.

The official apps and browser extensions can connect to your own server instead of the official cloud.`,
    },
    nl: {
      q: 'Kan ik AliasVault volledig onafhankelijk van jullie infrastructuur draaien?',
      a: `Ja. Een self-hosted AliasVault-server draait zonder enige infrastructuur van ons: je vaults, gebruikersaccounts en e-mailaliassen staan allemaal op je eigen server. Met je eigen domein wordt inkomende e-mail rechtstreeks door jouw server ontvangen, zonder via de onze te gaan.

De officiële apps en browserextensies kunnen verbinding maken met je eigen server in plaats van met de officiële cloud.`,
    },
  },
  {
    slug: 'funding',
    category: 'company',
    showOn: ['faq'],
    order: 280,
    status: 'draft',
    en: {
      q: 'How is AliasVault funded? Do you share your finances?',
      a: `AliasVault is self-funded by its founders, with no outside investors or venture capital. Donations we receive are public. You can find the donation options on our [contact page](/contact#donations).

After the 1.0 release, optional Premium and Family plans will help fund development for the long term. The core product stays free.`,
    },
    nl: {
      q: 'Hoe wordt AliasVault gefinancierd? Delen jullie je financiën?',
      a: `AliasVault wordt zelf gefinancierd door de oprichters, zonder externe investeerders of durfkapitaal. De donaties die we ontvangen zijn openbaar. De donatiemogelijkheden vind je op onze [contactpagina](/nl/contact#donations).

Na de 1.0-release helpen optionele Premium- en Family-abonnementen de ontwikkeling op de lange termijn te financieren. Het kernproduct blijft gratis.`,
    },
  },
  {
    slug: 'product-suite',
    category: 'company',
    showOn: ['faq'],
    order: 290,
    status: 'draft',
    en: {
      q: 'Will AliasVault expand into a suite of products, like Proton?',
      a: `We have no plans for a broader suite of products. We're focused on making AliasVault the best password and email alias manager it can be. See our [roadmap](/roadmap) for what we're working on and what's planned next.`,
    },
    nl: {
      q: 'Wordt AliasVault een reeks producten, zoals Proton?',
      a: `We hebben geen plannen voor een bredere reeks producten. We richten ons erop om AliasVault de best mogelijke wachtwoord- en e-mailaliasmanager te maken. Op onze [roadmap](/nl/roadmap) zie je waar we aan werken en wat er gepland staat.`,
    },
  },
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function markExternalLinksNewTab(node: any): void {
  if (node?.type === 'link' && node.fields?.linkType === 'custom') {
    const url = String(node.fields.url ?? '')
    node.fields.newTab = /^https?:\/\//.test(url)
  }
  if (Array.isArray(node?.children)) node.children.forEach(markExternalLinksNewTab)
}

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.count({ collection: 'faqs', req })
  if (existing.totalDocs > 0) {
    payload.logger.info('faqs_seed: collection not empty, skipping')
    return
  }

  const editorConfig = await editorConfigFactory.default({ config: payload.config })
  const toLexical = (markdown: string) => {
    const state = convertMarkdownToLexical({ editorConfig, markdown })
    markExternalLinksNewTab(state.root)
    return state
  }

  for (const faq of FAQS) {
    const draft = faq.status === 'draft'
    const doc = await payload.create({
      collection: 'faqs',
      locale: 'en',
      draft,
      data: {
        question: faq.en.q,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        answer: toLexical(faq.en.a) as any,
        slug: faq.slug,
        category: faq.category,
        showOn: faq.showOn,
        order: faq.order,
        _status: faq.status,
      },
      req,
    })
    await payload.update({
      collection: 'faqs',
      id: doc.id,
      locale: 'nl',
      draft,
      data: {
        question: faq.nl.q,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        answer: toLexical(faq.nl.a) as any,
        _status: faq.status,
      },
      req,
    })
  }
  payload.logger.info(`faqs_seed: created ${FAQS.length} FAQ entries`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({
    collection: 'faqs',
    where: { slug: { in: FAQS.map((f) => f.slug) } },
    req,
  })
}
