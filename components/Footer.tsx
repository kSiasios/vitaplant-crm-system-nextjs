import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full flex gap-1 items-center justify-center py-4 absolute bottom-0 text-white">
      <p>Copyright &copy; {new Date().getFullYear()}. Developed by</p>
      <Link
        href="https://www.linkedin.com/in/konstantinos-siasios/"
        target="_blank"
        className="underline hover:text-blue-500 focus:text-blue-500"
      >
        Konstantinos Siasios
      </Link>
    </footer>
  );
};

export default Footer;
