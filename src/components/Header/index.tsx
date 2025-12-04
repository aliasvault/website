"use client";
import { Link } from "@/i18n/navigation";
import { usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import getMenuData from "./menuData";
import { useTranslations } from "next-intl";
import Logo from "@/components/Common/Logo";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => setNavbarOpen(!navbarOpen);
  const t = useTranslations();

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index: number) =>
    setOpenIndex(openIndex === index ? -1 : index);

  const pathname = usePathname();

  // Create localized menu data
  const menuData = getMenuData(t);
  const localizedMenuData = menuData.map(item => ({
    ...item,
    path: item.path
  }));

  return (
    <header
      className={`header left-0 top-0 z-40 flex w-full items-center ${
        sticky
          ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999] bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
          : "absolute dark:border-gray-700"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* Logo */}
          <div className="max-w-full px-4">
            <Link href="/" className={`flex items-center ${sticky ? "py-2" : "py-8"}`}>
              <Logo
                width={220}
                height={60}
                className="mr-3"
                color="currentColor"
              />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="absolute right-4 lg:hidden flex items-center space-x-2">
            {/* Mobile Login Button - Shows on medium screens only */}
            <Link
              href="https://app.aliasvault.net/user/login"
              className="hidden md:flex h-10 items-center justify-center rounded-md border border-primary px-4 py-2 font-medium text-primary hover:bg-primary hover:text-white active:bg-primary-dark transition-colors"
            >
              {t('header.loginButton')}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={navbarToggleHandler}
              aria-label={t('header.mobileMenuAriaLabel')}
              className="rounded-lg px-3 py-1 ring-primary focus:ring-2"
            >
              <span
                className={`block h-0.5 w-[30px] bg-black dark:bg-white transition-all duration-300 my-1.5 ${
                  navbarOpen ? "top-[7px] rotate-45 relative" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-[30px] bg-black dark:bg-white transition-all duration-300 my-1.5 ${
                  navbarOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-[30px] bg-black dark:bg-white transition-all duration-300 my-1.5 ${
                  navbarOpen ? "top-[-8px] -rotate-45 relative" : ""
                }`}
              />
            </button>
          </div>


          {/* Mobile Menu */}
          <nav
            className={`absolute right-0 z-30 w-[250px] rounded border border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark ${
              navbarOpen ? "visible top-full opacity-100" : "invisible top-[120%] opacity-0"
            } lg:hidden`}
          >
            <ul className="divide-y divide-body-color/20 dark:divide-body-color/40">
              {localizedMenuData.map((menuItem, index) => (
                <li key={index} className="py-3">
                  {menuItem.path ? (
                    <Link
                      href={menuItem.path}
                      className={`block text-base transition-colors ${
                        pathname === menuItem.path
                          ? "text-primary dark:text-white"
                          : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                      }`}
                      onClick={() => setNavbarOpen(false)}
                    >
                      {menuItem.title}
                      {menuItem.newTab && (
                        <svg
                          className="ml-2 inline-block h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="flex w-full items-center justify-between text-base text-dark dark:text-white/70 hover:text-primary dark:hover:text-white"
                      >
                        {menuItem.title}
                        <svg width="20" height="20" className="ml-1" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                          />
                        </svg>
                      </button>
                      <div
                        className={`mt-2 rounded bg-white p-2 shadow-lg dark:bg-dark ${
                          openIndex === index ? "block" : "hidden"
                        }`}
                      >
                        {menuItem.submenu?.map((submenuItem, i) => (
                          <Link
                            key={i}
                            href={submenuItem.path as string}
                            className="block px-4 py-2 text-dark dark:text-white/70 hover:text-primary dark:hover:text-white"
                            onClick={() => setNavbarOpen(false)}
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </li>
              ))}
              <li className="py-3">
                <Link
                  href="/contact"
                  className={`block text-base transition-colors ${
                    pathname === "/contact"
                      ? "text-primary dark:text-white"
                      : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                  }`}
                  onClick={() => setNavbarOpen(false)}
                >
                  {t('navigation.contact')}
                </Link>
              </li>
              <li className="py-3">
                <Link
                  href="https://github.com/aliasvault/aliasvault"
                  className="block text-base text-dark hover:text-primary dark:text-white/70 dark:hover:text-white transition-colors"
                  onClick={() => setNavbarOpen(false)}
                >
                  {t('footer.social.github')}
                  <svg
                        className="ml-1 inline-block h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                </Link>
              </li>
              <li className="py-3">
                <Link
                  href="https://app.aliasvault.net/user/login"
                  className="block text-base font-medium text-primary hover:text-primary-dark dark:text-primary dark:hover:text-primary-light transition-colors"
                  onClick={() => setNavbarOpen(false)}
                >
                  {t('header.loginButton')}
                  <svg
                    className="ml-1 inline-block h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>



          {/* Right Side Content */}
          <div className="flex items-center gap-4 px-4">
            <nav className="hidden lg:flex items-center space-x-6">
              {localizedMenuData.map((menuItem, index) => (
                <div key={index} className="relative group">
                  {menuItem.path ? (
                    <Link
                      href={menuItem.path}
                      className={`px-2 py-2 ${
                        pathname === menuItem.path
                          ? "text-primary dark:text-white"
                          : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                      }`}
                    >
                      {menuItem.title}
                      {menuItem.newTab && (
                        <svg
                          className="ml-3 inline-block h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      )}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleSubmenu(index)}
                        className="flex items-center px-2 py-2 text-dark dark:text-white/70 hover:text-primary dark:hover:text-white"
                      >
                        {menuItem.title}
                        <svg width="20" height="20" className="ml-1" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                          />
                        </svg>
                      </button>
                      <div
                        className={`absolute z-20 mt-2 w-48 rounded bg-white p-2 shadow-lg dark:bg-dark ${
                          openIndex === index ? "block" : "hidden"
                        }`}
                      >
                        {menuItem.submenu?.map((submenuItem, i) => (
                          <Link
                            key={i}
                            href={submenuItem.path as string}
                            className="block px-4 py-2 text-dark dark:text-white/70 hover:text-primary dark:hover:text-white"
                          >
                            {submenuItem.title}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </nav>

            {/* Icons & Buttons */}
            <div className="items-center gap-3 lg:ml-4 hidden lg:flex">
              <ThemeToggler />
              <Link
                href="https://github.com/aliasvault/aliasvault"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('header.githubAriaLabel')}
                title={t('header.githubTitle')}
                className="hidden lg:flex h-10 items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-dark hover:bg-gray-100 active:bg-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 dark:active:bg-gray-700"
              >
                <svg
                  className="h-5 w-5"
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
              </Link>
              <Link
                href="https://discord.gg/DsaXMTEtpF"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('header.discordAriaLabel')}
                title={t('header.discordTitle')}
                className="hidden lg:flex h-10 items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-dark hover:bg-blue-100 active:bg-blue-200 dark:border-gray-600 dark:text-white dark:hover:bg-blue-800 dark:active:bg-blue-700"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 5 30.67 23.25"
                  width="20"
                  aria-hidden="true"
                >
                  <path d="M26.0015 6.9529C24.0021 6.03845 21.8787 5.37198 19.6623 5C19.3833 5.48048 19.0733 6.13144 18.8563 6.64292C16.4989 6.30193 14.1585 6.30193 11.8336 6.64292C11.6166 6.13144 11.2911 5.48048 11.0276 5C8.79575 5.37198 6.67235 6.03845 4.6869 6.9529C0.672601 12.8736 -0.41235 18.6548 0.130124 24.3585C2.79599 26.2959 5.36889 27.4739 7.89682 28.2489C8.51679 27.4119 9.07477 26.5129 9.55525 25.5675C8.64079 25.2265 7.77283 24.808 6.93587 24.312C7.15286 24.1571 7.36986 23.9866 7.57135 23.8161C12.6241 26.1255 18.0969 26.1255 23.0876 23.8161C23.3046 23.9866 23.5061 24.1571 23.7231 24.312C22.8861 24.808 22.0182 25.2265 21.1037 25.5675C21.5842 26.5129 22.1422 27.4119 22.7621 28.2489C25.2885 27.4739 27.8769 26.2959 30.5288 24.3585C31.1952 17.7559 29.4733 12.0212 26.0015 6.9529ZM10.2527 20.8402C8.73376 20.8402 7.49382 19.4608 7.49382 17.7714C7.49382 16.082 8.70276 14.7025 10.2527 14.7025C11.7871 14.7025 13.0425 16.082 13.0115 17.7714C13.0115 19.4608 11.7871 20.8402 10.2527 20.8402ZM20.4373 20.8402C18.9183 20.8402 17.6768 19.4608 17.6768 17.7714C17.6768 16.082 18.8873 14.7025 20.4373 14.7025C21.9717 14.7025 23.2271 16.082 23.1961 17.7714C23.1961 19.4608 21.9872 20.8402 20.4373 20.8402Z"></path>
                </svg>
              </Link>
              {/* Desktop Login Button - Shows on medium screens and up */}
              <Link
                href="https://app.aliasvault.net/user/login"
                className="hidden md:flex h-10 items-center justify-center rounded-md border border-primary px-4 py-2 font-medium text-primary hover:bg-primary hover:text-white active:bg-primary-dark transition-colors"
              >
                {t('header.loginButtonFull')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
