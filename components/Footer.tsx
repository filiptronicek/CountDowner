import Link from "next/link";
import { useTranslation } from "react-i18next";

const Footer = (): JSX.Element => {
  const { t, i18n } = useTranslation();

  return (
    <footer>
      <Link href="https://github.com/filiptronicek">
       {`${t("By")} @filiptronicek with 💖`}
      </Link>
    </footer>
  );
};

export default Footer;
