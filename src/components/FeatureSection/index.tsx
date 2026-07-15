import Image from "next/image";
import SectionTitle from "../Common/SectionTitle";
import { useTranslations } from "next-intl";

interface FeatureItem {
  name: string;
  description: string;
  status: 'available' | 'upcoming' | 'unavailable';
}

interface FeatureSectionProps {
  title: string;
  description: string;
  features: FeatureItem[];
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

const FeatureSection = ({
  title,
  description,
  features,
  imageSrc,
  imageAlt,
  reversed = false,
}: FeatureSectionProps) => {
  const t = useTranslations();
  return (
    <section className="py-16 md:py-20" data-aos="fade-up" data-aos-delay="0">
      <div className="container">
        <div className="flex flex-wrap items-center">
          {/* Image Column */}
          <div
            className={`w-full px-4 lg:w-1/2 ${
              reversed ? "lg:order-2" : ""
            }`}
          >
            <div className="relative mx-auto mb-12 max-w-[500px] text-center lg:m-0 lg:text-left" data-aos="fade-up" data-aos-delay="150">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={500}
                height={500}
                className="mx-auto rounded-lg"
              />
              {/* Abstract SVG decoration */}
              <div className={`absolute -bottom-10 ${reversed ? "-left-10" : "-right-10"} z-[-1] hidden lg:block`}>
                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 150 150"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    opacity="0.08"
                    cx="75"
                    cy="75"
                    r="75"
                    fill="url(#paint0_linear_feature_section)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_feature_section"
                      x1="0"
                      y1="75"
                      x2="150"
                      y2="75"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#d68338" />
                      <stop offset="1" stopColor="#d68338" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div
            className={`w-full px-4 lg:w-1/2 ${
              reversed ? "lg:order-1" : ""
            }`}
          >
            <div className="max-w-[570px]" data-aos="fade-up" data-aos-delay="0">
              <SectionTitle
                title={title}
                paragraph={description}
                mb="40px"
                center={false}
              />

              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-inset ring-primary/15 flex-shrink-0">
                      {feature.status === 'available' ? (
                        <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : feature.status === 'upcoming' ? (
                        <svg className="h-8 w-8 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                        {feature.name}
                        {feature.status === 'upcoming' && (
                          <a
                            href="https://github.com/aliasvault/aliasvault/issues/731"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-xs font-normal text-yellow-500 hover:underline"
                          >
                            ({t('featureSection.comingSoon')})
                          </a>
                        )}
                      </h3>
                      <p className="text-base text-body-color dark:text-body-color-dark">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;