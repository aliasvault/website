'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import '@/styles/image-lightbox.css'

interface ClickableImageProps {
  src: string
  alt: string
  caption?: string
}

const ClickableImage = ({ src, alt, caption }: ClickableImageProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      Modal.setAppElement('body')
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <div 
        className="relative mb-8 cursor-pointer overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-dark border border-gray-200 dark:border-primary-200"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative w-full max-w-4xl mx-auto">
          <Image
            src={src}
            alt={alt}
            width={1200}
            height={800}
            className="w-full h-auto object-contain"
          />
        </div>
        {caption && (
          <div className="p-4 text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {caption}
            </p>
          </div>
        )}
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="image-lightbox"
        overlayClassName="image-lightbox-overlay"
        contentLabel={alt}
        ariaHideApp={true}
      >
        <div className="relative h-full w-full" onClick={() => setIsOpen(false)}>
          <button
            className="absolute right-4 top-4 z-50 rounded-full bg-white p-2 text-gray-800 shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="flex h-full items-center justify-center">
            <div className="relative h-[90vh] w-full max-w-4xl">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
              />
              {caption && (
                <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
                  <p className="inline-block rounded-lg bg-white/80 px-4 py-2 text-sm font-medium text-gray-800 shadow-lg backdrop-blur-sm dark:bg-gray-800/80 dark:text-gray-200">
                    {caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ClickableImage 