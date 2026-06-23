export default function BlogLoading() {
  return (
    <section className="pb-[120px] pt-[150px]">
      <div className="container">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-8 w-48 animate-pulse rounded bg-body-color/15" />
          <div className="h-8 w-8 animate-pulse rounded bg-body-color/15" />
        </div>
        <div className="-mx-4 flex flex-wrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3">
              <div className="mb-10">
                <div className="mb-8 aspect-[37/22] w-full animate-pulse rounded bg-body-color/15" />
                <div className="space-y-3">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-body-color/15" />
                  <div className="h-4 w-full animate-pulse rounded bg-body-color/15" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-body-color/15" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
