"use client";

import Link from "next/link";
import Image from "next/image";
import Badge from "../Common/Badge";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

const Hero = () => {
  const t = useTranslations('hero');

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 15,
        delay: 0.3,
      },
    },
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.6,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 10,
      },
    },
  };

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-8 pt-[120px] dark:bg-gray-dark md:pb-[140px] md:pt-[150px] xl:pt-[180px]"
      >
        {/* Animated gradient background */}
        <AnimatedBackground />

        <div className="container relative z-10">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <motion.div
                className="text-center lg:text-left"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.h1
                  className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight"
                  variants={itemVariants}
                >
                  {t('title')}
                </motion.h1>
                <motion.p
                  className="mb-12 text-base !leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl"
                  variants={itemVariants}
                >
                  {t('description')}
                </motion.p>
                <motion.div
                  className="flex flex-col items-center justify-center lg:items-start lg:justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
                  variants={itemVariants}
                >
                  <Link
                    href="https://app.aliasvault.net"
                    target="_blank"
                    className="group relative overflow-hidden rounded-3xl bg-primary px-8 py-4 text-base font-semibold text-white transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
                  >
                    <span className="relative z-10">{t('cta')}</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                  <Link
                    href="https://github.com/aliasvault/aliasvault"
                    className="inline-flex items-center justify-center py-4 text-base font-semibold transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary"
                  >
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {t('github')} <Image
                      className="inline-block ml-3"
                      alt={t('alt.githubStars')}
                      src="https://img.shields.io/github/stars/aliasvault/aliasvault"
                      width={90}
                      height={20}
                      unoptimized
                    />
                  </Link>
                </motion.div>
                <motion.div
                  className="mt-6 flex items-center justify-center lg:justify-start space-x-2"
                  variants={badgeContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* Apple App Store Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://apps.apple.com/app/id6745490915"
                      iconLight="/images/app-store/apple-light.svg"
                      iconDark="/images/app-store/apple-dark.svg"
                      alt={t('alt.appStore')}
                    />
                  </motion.div>

                  {/* Android Play Store Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://play.google.com/store/apps/details?id=net.aliasvault.app"
                      iconLight="/images/app-store/android.svg"
                      iconDark="/images/app-store/android.svg"
                      alt={t('alt.android')}
                    />
                  </motion.div>

                  {/* Chrome Extension Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj"
                      iconLight="/images/browser-icons/chrome.svg"
                      iconDark="/images/browser-icons/chrome.svg"
                      alt={t('alt.chrome')}
                    />
                  </motion.div>

                  {/* Firefox Extension Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://addons.mozilla.org/en-US/firefox/addon/aliasvault/"
                      iconLight="/images/browser-icons/firefox.svg"
                      iconDark="/images/browser-icons/firefox.svg"
                      alt={t('alt.firefox')}
                    />
                  </motion.div>

                  {/* Microsoft Edge Extension Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://microsoftedge.microsoft.com/addons/detail/aliasvault/kabaanafahnjkfkplbnllebdmppdemfo"
                      iconLight="/images/browser-icons/edge.svg"
                      iconDark="/images/browser-icons/edge.svg"
                      alt={t('alt.edge')}
                    />
                  </motion.div>

                  {/* Safari Extension Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://apps.apple.com/app/id6743163173"
                      iconLight="/images/browser-icons/safari.svg"
                      iconDark="/images/browser-icons/safari.svg"
                      alt={t('alt.safari')}
                    />
                  </motion.div>

                  {/* Brave Extension Badge */}
                  <motion.div variants={badgeVariants}>
                    <Badge
                      href="https://chromewebstore.google.com/detail/aliasvault/bmoggiinmnodjphdjnmpcnlleamkfedj"
                      iconLight="/images/browser-icons/brave.svg"
                      iconDark="/images/browser-icons/brave.svg"
                      alt={t('alt.brave')}
                    />
                  </motion.div>

                  {/* Divider */}
                  <motion.span
                    className="text-gray-400 dark:text-gray-600 flex items-center"
                    variants={badgeVariants}
                  >
                    -
                  </motion.span>

                  {/* Made in NL Badge */}
                  <motion.div className="flex items-center space-x-2" variants={badgeVariants}>
                    <Image src="/images/flags/nl.svg" width={24} height={24} alt={t('alt.madeInNL')} title={t('alt.madeInNL')} />
                    <Image src="/images/flags/gdpr.svg" width={24} height={24} alt={t('alt.gdpr')} title={t('alt.gdpr')} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <motion.div
                className="mt-8 text-center lg:mt-0"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                >
                  <Image
                    src="/images/hero/hero-light.png"
                    alt={t('alt.heroImage')}
                    width={1000}
                    height={1000}
                    className="mx-auto dark:hidden"
                  />
                  <Image
                    src="/images/hero/hero-dark.png"
                    alt={t('alt.heroImage')}
                    width={1000}
                    height={1000}
                    className="mx-auto hidden dark:block"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
