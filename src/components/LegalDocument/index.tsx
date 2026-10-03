import { remark } from "remark";
import html from "remark-html";
import { routing } from "@/i18n/routing";
import { getLegalMarkdown, type LegalDocument as LegalDocumentType } from "@/lib/legal";

/** Renders a legal document (see src/lib/legal) as a styled page section. */
const LegalDocument = async ({ doc, locale }: { doc: LegalDocumentType; locale: string }) => {
  const rendered = String(await remark().use(html).process(getLegalMarkdown(doc)));

  // Site links get the locale prefix, external links open in a new tab.
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  const content = rendered
    .replace(/href="\//g, `href="${prefix}/`)
    .replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http');

  return (
    <section className="pt-9 pb-16 md:pb-20 lg:pb-28">
      <div className="container">
        <p className="mb-8 text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark">
          Last updated: {doc.lastUpdated}
        </p>
        <div
          className="text-base font-medium leading-relaxed text-body-color dark:text-body-color-dark [&_a]:text-primary [&_a:hover]:underline [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-black [&_h2]:dark:text-white [&_h2]:sm:text-2xl [&_h2]:lg:text-xl [&_h2]:xl:text-2xl [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-black [&_h3]:dark:text-white [&_li]:ml-6 [&_li]:list-disc [&_p+p]:mt-4 [&_p+ul]:mt-4 [&_strong]:font-semibold [&_strong]:text-black [&_strong]:dark:text-white [&_ul+p]:mt-4 [&_ul]:space-y-2 [&>h2:first-child]:mt-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
};

export default LegalDocument;
