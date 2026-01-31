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
              {/* Contact Button */}
              <Link
                href="/contact"
                className="hidden lg:flex h-10 items-center justify-center rounded-md border border-gray-300 px-4 py-2 text-dark hover:bg-gray-100 active:bg-gray-200 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 dark:active:bg-gray-700 transition-colors"
              >
                {t('navigation.contact')}
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
