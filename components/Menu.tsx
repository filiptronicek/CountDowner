import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Menu } from "@headlessui/react";
import React from "react";
import { FaLanguage } from "react-icons/fa";

const Navbar = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <header>
      <nav className="flex w-screen text-xm gap-10 bg-[#262A2B] text-white cursor-pointer ">
        <Link href="/" passHref>
          <a>{t("Home")}</a>
        </Link>
        <Link href="/create" passHref>
          <a>{t("Create countdown")}</a>
        </Link>
        <Link href="https://github.com/filiptronicek/CountDowner" passHref>
          <a target="_blank" rel="noreferrer noopener">
            {t("Source code")}
          </a>
        </Link>

        <span className="cursor-pointer ml-auto">
          <Menu>
            <Menu.Button>
              <FaLanguage size={38} />
            </Menu.Button>
            <Menu.Items className="shadow-custom absolute bg-white text-blue-500 rounded-xl px-4 py-4 right-8 top-18 flex flex-col">
              {Object.keys(i18n.services.resourceStore.data).map((language) => {
                return (
                  <Menu.Item
                    as="div"
                    className="py-1.5 hover:text-green-400 cursor-pointer"
                    key={language}
                    onClick={() => {
                      i18n.changeLanguage(language);
                    }}
                  >
                    {language}
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          </Menu>
        </span>
      </nav>
    </header>
  );
};

export default Navbar;
