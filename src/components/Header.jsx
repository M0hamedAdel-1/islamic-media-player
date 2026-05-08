import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const links = [
    { name: "القرأن الكريم", path: "/quran" },
    { name: "تفاسير", path: "/tafseer" },
    { name: "راديو", path: "/radio" },
    { name: "مواقيت الصلاه", path: "/prayer-times" },
    { name: "بث مباشر ", path: "/live" },
    { name: "التدبر", path: "/Tadabor" },
  ];
  return (
    <div className="bg-black h-20 border-1 border-b-white" >
      <div className="container mx-auto p-4 flex items-center justify-between pb-3">
        <div className="">
          <Link to="/"><img className="w-15" src="../../images/logo quran svg.png" alt="logo" /></Link>
        </div>

        <ul className="flex items-center justify-between">
          {links.map((item, id) => (
            <li className="mx-4 text-white" key={id}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
