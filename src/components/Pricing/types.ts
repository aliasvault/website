export type FeatureAvailability = "yes" | "fairUse" | "premium" | "comingSoon" | "future" | "na";

export type PricingFeatureRow = {
  id: string;
  selfHosted: FeatureAvailability;
  cloudFree: FeatureAvailability;
  cloudPremium: FeatureAvailability;
};
