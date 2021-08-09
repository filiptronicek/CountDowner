import Link from "next/link";

const Menu = () => {
  return (
    <header>
      <nav className="w-screen text-xm gap-10 bg-[#262A2B] text-white py-4 cursor-pointer">
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        <Link href="/create" passHref>
          <a>Create countdown</a>
        </Link>
        <Link href="https://github.com/filiptronicek/CountDowner" passHref>
          <a target="_blank" rel="noreferrer noopener">
            Source code
          </a>
        </Link>
      </nav>
    </header>
  );
};

export default Menu;
