import Link from "next/link";

const navLinks = [
  { title: "Home", link: "/", style: "inline md:hidden" },
  { title: "About", link: "/about" },
  { title: "Photos", link: "/photos" },
  { title: "Blog", link: "/blog" },
];

export default function Navigation() {
  return (
    <nav className="font-mono">
      <ul className="flex md:space-x-4 flex-col md:flex-row">
        {navLinks.map(({ link, title, style }) => (
          <li key={title}>
            <Link href={link} className={`link ${style && style}`}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
