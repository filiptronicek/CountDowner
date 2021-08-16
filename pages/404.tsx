import Head from "../components/Head";
import Link from "next/link";

import Menu from "../components/Menu";
import Footer from "../components/Footer"; 

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-between h-screen">
      <Head />

      <Menu />
      <main className="text-center items-center">
        <h1 className="text-3xl mb-12">
          Oooof, looks like this counter doesn&apos;t exist
        </h1>
        <Link href="/" passHref>
          <span className="bg-[#262A2B] text-white p-5 mr-2 rounded-xl mb-8 cursor-pointer">
            Back to main page
          </span>
        </Link>{" "}
        <Link href="/create" passHref>
          <span className="bg-[#262A2B] text-white p-5 ml-2 rounded-xl mb-8 cursor-pointer">
            Create countdown
          </span>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
