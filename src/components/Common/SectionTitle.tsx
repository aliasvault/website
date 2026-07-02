const SectionTitle = ({
  title,
  paragraph,
  width = "570px",
  center,
  mb = "100px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto text-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
          {title}
        </h2>
        <p
          className="text-base !leading-relaxed text-body-color dark:text-body-color-dark md:text-lg [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary/30 [&_a]:underline-offset-2 [&_a]:transition-all [&_a]:duration-200 hover:[&_a]:decoration-primary"
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      </div>
    </>
  );
};

export default SectionTitle;
