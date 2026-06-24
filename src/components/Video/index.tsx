"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import { useTranslations } from "next-intl";

const VIDEO_ID = "T35VHmS8a-A";

const Video = () => {
  const [isOpen, setOpen] = useState(false);
  const t = useTranslations();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title={t('video.title')}
          paragraph={t('video.description')}
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <button
                  aria-label={t('video.playButtonAriaLabel')}
                  onClick={() => setOpen(true)}
                  className="block w-full h-full relative"
                >
                  <Image src="/images/video/av-video.jpg" alt={t('video.imageAlt')} fill />
                  <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                    <div className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100">
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('video.title')}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black bg-opacity-80 p-4 sm:p-10"
        >
          <button
            aria-label={t('video.closeButtonAriaLabel')}
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-3xl leading-none text-white"
          >
            &times;
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="aspect-video w-full max-w-[960px]"
          >
            <iframe
              className="h-full w-full rounded-md"
              src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
              title={t('video.title')}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
    </section>
  );
};

export default Video;
