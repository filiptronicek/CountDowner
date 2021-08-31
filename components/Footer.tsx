import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import fetch from "node-fetch";

const Footer = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [contributors, setContributors] = useState(["filiptronicek"]);

  useEffect(() => {
    fetch("https://api.github.com/repos/filiptronicek/CountDowner/contributors")
      .then((res) => res.json())
      .then((data: any) => {
        const userContributors = data.filter(
          (contributor: { type: string }) => {
            return contributor.type !== "Bot";
          }
        );
        setContributors(
          userContributors.map(
            (contributor: { login: any }) => contributor.login
          )
        );
      });
  }, []);

  return (
    <footer>
      <span>
        {`${t("By")}`}{" "}
        {contributors.map((contributor) => {
          const index = contributors.indexOf(contributor);
          return (
            <Link
              key={index}
              href={`https://github.com/${contributor}`}
              passHref
            >
              <a>
                @
                {`${contributor}${
                  index !== contributors.length - 1 ? ", " : ""
                }`}
              </a>
            </Link>
          );
        })}{" "}
        with 💖
      </span>
    </footer>
  );
};

export default Footer;
