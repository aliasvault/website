export interface FeatureItem {
  name: string;
  description: string;
  status: 'available' | 'upcoming' | 'unavailable';
}

export interface FeatureCategory {
  title: string;
  description: string;
  features: FeatureItem[];
  imageSrc: string;
  imageAlt: string;
}

type TranslationFunction = (key: string) => string;

export function getLocalizedFeaturesData(t: TranslationFunction): FeatureCategory[] {
  return [
    // Password Management Features
    {
      title: t('featuresData.passwordManagement.title'),
      description: t('featuresData.passwordManagement.description'),
      imageSrc: "/images/features/password-management.png",
      imageAlt: t('featuresData.passwordManagement.imageAlt'),
      features: [
        {
          name: t('featuresData.passwordManagement.features.passwordManagerAndPasskeys.name'),
          description: t('featuresData.passwordManagement.features.passwordManagerAndPasskeys.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.passwordManagement.features.trulyOfflineAccess.name'),
          description: t('featuresData.passwordManagement.features.trulyOfflineAccess.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.passwordManagement.features.builtIn2FA.name'),
          description: t('featuresData.passwordManagement.features.builtIn2FA.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.passwordManagement.features.passwordSharing.name'),
          description: t('featuresData.passwordManagement.features.passwordSharing.description'),
          status: "upcoming" as const
        }
      ]
    },
    // Email Alias Features
    {
      title: t('featuresData.emailAliases.title'),
      description: t('featuresData.emailAliases.description'),
      imageSrc: "/images/features/email-aliases.png",
      imageAlt: t('featuresData.emailAliases.imageAlt'),
      features: [
        {
          name: t('featuresData.emailAliases.features.builtInEmailServer.name'),
          description: t('featuresData.emailAliases.features.builtInEmailServer.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.emailAliases.features.aliasGenerator.name'),
          description: t('featuresData.emailAliases.features.aliasGenerator.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.emailAliases.features.customDomainsSelfHosted.name'),
          description: t('featuresData.emailAliases.features.customDomainsSelfHosted.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.emailAliases.features.customDomainsCloudHosted.name'),
          description: t('featuresData.emailAliases.features.customDomainsCloudHosted.description'),
          status: "upcoming" as const
        }
      ]
    },
    // Security Features
    {
      title: t('featuresData.security.title'),
      description: t('featuresData.security.description'),
      imageSrc: "/images/features/security.png",
      imageAlt: t('featuresData.security.imageAlt'),
      features: [
        {
          name: t('featuresData.security.features.encryption2Fa.name'),
          description: t('featuresData.security.features.encryption2Fa.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.security.features.biometricAuthentication.name'),
          description: t('featuresData.security.features.biometricAuthentication.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.security.features.autoClipboardClear.name'),
          description: t('featuresData.security.features.autoClipboardClear.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.security.features.secureNotesAttachments.name'),
          description: t('featuresData.security.features.secureNotesAttachments.description'),
          status: "available" as const
        }
      ]
    },
    // Browser extension features
    {
      title: t('featuresData.browserExtensions.title'),
      description: t('featuresData.browserExtensions.description'),
      imageSrc: "/images/features/plugins.png",
      imageAlt: t('featuresData.browserExtensions.imageAlt'),
      features: [
        {
          name: t('featuresData.browserExtensions.features.availableForEveryBrowser.name'),
          description: t('featuresData.browserExtensions.features.availableForEveryBrowser.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.browserExtensions.features.autofillCredentials.name'),
          description: t('featuresData.browserExtensions.features.autofillCredentials.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.browserExtensions.features.offlineAccess.name'),
          description: t('featuresData.browserExtensions.features.offlineAccess.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.browserExtensions.features.emailAliasGenerator.name'),
          description: t('featuresData.browserExtensions.features.emailAliasGenerator.description'),
          status: "available" as const
        }
      ]
    },
    // Mobile app features
    {
      title: t('featuresData.mobileApps.title'),
      description: t('featuresData.mobileApps.description'),
      imageSrc: "/images/features/mobile-app.png",
      imageAlt: t('featuresData.mobileApps.imageAlt'),
      features: [
        {
          name: t('featuresData.mobileApps.features.mobileApps.name'),
          description: t('featuresData.mobileApps.features.mobileApps.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.mobileApps.features.unlockWithMobile.name'),
          description: t('featuresData.mobileApps.features.unlockWithMobile.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.mobileApps.features.offlineMode.name'),
          description: t('featuresData.mobileApps.features.offlineMode.description'),
          status: "available" as const
        }
      ]
    },
    // Self-hosting Features
    {
      title: t('featuresData.selfHosting.title'),
      description: t('featuresData.selfHosting.description'),
      imageSrc: "/images/features/selfhost.png",
      imageAlt: t('featuresData.selfHosting.imageAlt'),
      features: [
        {
          name: t('featuresData.selfHosting.features.cloudOrSelfHosted.name'),
          description: t('featuresData.selfHosting.features.cloudOrSelfHosted.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.selfHosting.features.freeAndOpenSource.name'),
          description: t('featuresData.selfHosting.features.freeAndOpenSource.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.selfHosting.features.adminPanelLogs.name'),
          description: t('featuresData.selfHosting.features.adminPanelLogs.description'),
          status: "available" as const
        },
        {
          name: t('featuresData.selfHosting.features.familyTeamManagement.name'),
          description: t('featuresData.selfHosting.features.familyTeamManagement.description'),
          status: "upcoming" as const
        }
      ]
    }
  ];
}