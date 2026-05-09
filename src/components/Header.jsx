import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "القرأن الكريم", path: "/quran" },
    { name: "تفاسير", path: "/tafseer" },
    { name: "راديو", path: "/radio" },
    { name: "مواقيت الصلاه", path: "/prayer-times" },
    { name: "بث مباشر", path: "/live" },
    { name: "التدبر", path: "/Tadabor" },
  ];

  return (
    <header className="bg-black border-b border-white/20">
      <div className="container mx-auto p-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/">
          <img
            className="w-14"
            src="../../images/logo quran svg.png"
            alt="logo"
          />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((item, id) => (
            <li key={id} className="text-white">
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl cursor-pointer "
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
<div
  className={`md:hidden bg-black border-t border-white/20 overflow-hidden transition-all duration-300 ease-in-out
  ${open ? "max-h-96 opacity-100 p-4" : "max-h-0 opacity-0 p-0"}`}
>
  <ul className="flex flex-col gap-4">
    {links.map((item, id) => (
      <li key={id} className="text-white">
        <NavLink onClick={() => setOpen(false)} to={item.path}>
          {item.name}
        </NavLink>
      </li>
    ))}
  </ul>
</div>
    </header>
  );
};

export default Header;