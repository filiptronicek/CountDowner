import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const contributors = ["filiptronicek", "krystofex"];

  return (
    <footer>
      <span>
        {`${t("By")}`}{" "}
        {contributors.map((contributor) => {
          const index = contributors.indexOf(contributor);
          return (
            <Link href={`https://github.com/${contributor}`}>
              <span>
                @
                {`${contributor}${
                  index !== contributors.length - 1 ? ", " : ""
                }`}
              </span>
            </Link>
          );
        })}{" "}
        with 💖
      </span>
    </footer>
  );
};

export default Footer;
