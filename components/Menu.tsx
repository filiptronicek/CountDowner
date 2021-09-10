import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaLanguage } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";

const Navbar = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <>
      {/* PC navbar */}
      <div className="hidden sm:block w-full text-xm bg-[#262A2B] text-white cursor-pointer h-14">
        <Link href="/" passHref>
          <a className="float-left p-4 hover:bg-[#181818]">{t("Home")}</a>
        </Link>
        <Link href="/create" passHref>
          <a className="float-left p-4 hover:bg-[#181818]">
            {t("Create countdown")}
          </a>
        </Link>
        <Link href="https://github.com/filiptronicek/CountDowner" passHref>
          <a
            className="float-left p-4 hover:bg-[#181818]"
            target="_blank"
            rel="noreferrer noopener"
          >
            {t("Source code")}
          </a>
        </Link>

        <Menu>
          <Menu.Button
            className="float-right py-2 px-4 hover:bg-[#181818]"
            as="a"
          >
            <FaLanguage size={38} />
          </Menu.Button>
          <Menu.Items className="shadow-custom absolute bg-white text-blue-500 rounded-xl p-4 right-16 top-4 flex flex-col">
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
      </div>
      {/* Phone navbar */}
      <Menu
        as="div"
        className="sm:hidden block w-full text-xm text-right bg-[#262A2B] text-white cursor-pointer min-h-14"
      >
        <Menu.Button as="div" className="p-4 pr-4 text-right w-full">
          <AiOutlineMenu size={24} />
        </Menu.Button>
        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Menu.Items
            className="border-t-[1px] border-gray-700 pt-2 bg-[#262A2B] text-white flex flex-col text-left pb-4 w-full"
            as="div"
          >
            <Link href="/" passHref>
              <a className="hover:text-green-400 cursor-pointer hover:bg-[#181818] pl-4  py-4">
                {t("Home")}
              </a>
            </Link>
            <Link href="/create" passHref>
              <a className="hover:text-green-400 cursor-pointer hover:bg-[#181818] pl-4 py-4">
                {t("Create countdown")}
              </a>
            </Link>
            <Link href="https://github.com/filiptronicek/CountDowner" passHref>
              <a
                className="hover:text-green-400 cursor-pointer hover:bg-[#181818] pl-4 py-4"
                target="_blank"
                rel="noreferrer noopener"
              >
                {t("Source code")}
              </a>
            </Link>
            <Menu>
              <Menu.Button as={Fragment}>
                {({ open }) => (
                  <a className="p-4 flex text-gray-100 border-t-[1px] border-gray-700 hover:bg-[#181818]">
                    Languages{" "}
                    {open ? (
                      <BsCaretUpFill className="ml-2 mt-[2px]" />
                    ) : (
                      <BsCaretDownFill className="ml-2 mt-[4px]" />
                    )}
                  </a>
                )}
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items className="flex flex-col text-left w-full" as="div">
                  {Object.keys(i18n.services.resourceStore.data).map(
                    (language) => {
                      return (
                        <a
                          className="hover:text-green-400 cursor-pointer pl-8 hover:bg-[#181818] p-2 py-2"
                          key={language}
                          onClick={() => {
                            i18n.changeLanguage(language);
                          }}
                        >
                          {language}
                        </a>
                      );
                    }
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </Menu.Items>{" "}
        </Transition>
      </Menu>
    </>
  );
};

export default Navbar;
