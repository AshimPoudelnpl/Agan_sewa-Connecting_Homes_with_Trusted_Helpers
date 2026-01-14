import { useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/logo-removebg-preview.png";
import { Link } from "react-router-dom";

/* 🔹 Dropdown Data (TOP) */
const AGENCIES = [
  {
    country: "USA",
    cities: ["New York", "San Francisco", "Dallas"],
  },
  {
    country: "UK",
    cities: ["London", "Manchester", "Leeds"],
  },
  {
    country: "Canada",
    cities: ["Toronto", "Vancouver", "Ottawa"],
  },
];
const menuitems = [
  { label: "services", link: "/services" },
  { label: "About", link: "/about" },
  { label: "Gallery", link: "/gallery" },
  { label: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="flex border-b border-gray-300 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="w-full flex items-center gap-6 sm:px-10 px-6 py-3 justify-between">
        {/* Logo */}
        <a href="/">
          <img src={logo} alt="logo" className="w-[80px]" />
        </a>

        {/* Menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50`}
        >
          {/* Close */}
          <button
            onClick={() => setMenuOpen(false)}
            className="lg:hidden fixed top-3 right-4 z-[100] bg-white w-9 h-9 rounded-full border flex items-center justify-center"
          >
            <FaTimes />
          </button>

          <ul className="lg:flex lg:ml-10 lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md z-50">
            {/* Mobile Logo */}
            <li className="lg:hidden pb-4">
              <img src="" className="w-36" />
            </li>
            <Link to="/">
              <a className="text-blue-700 font-medium hover:text-secondary-blue">
                Home
              </a>
            </Link>
            {/* Agencies Dropdown */}
            <li
              className="relative group"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center cursor-pointer font-medium hover:text-blue-700">
                Branches
                <FaChevronDown onDown className="ml-1 text-sm" />
              </div>

              <div
                className={`
                  absolute top-full left-0 mt-2 z-50 bg-white shadow-lg px-8 pt-6 pb-8
                  transition-all duration-300 origin-top transform
                  ${
                    dropdownOpen
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }
                  lg:group-hover:scale-y-100 lg:group-hover:opacity-100
                `}
              >
                <div className="flex gap-8">
                  {AGENCIES.map(({ country, cities }) => (
                    <div key={country} className="min-w-[160px]">
                      <h6 className="text-blue-700 font-medium">{country}</h6>

                      {cities.map((city) => (
                        <p
                          key={city}
                          className="hover:text-blue-700 mt-2 cursor-pointer"
                        >
                          {city}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </li>
            {menuitems.map(({ label, link }) => (
              <li key={label}>
                <Link key={link}>
                  <a className="font-medium hover:text-blue-700">{label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Link
            to="/login"
            className=" bg-amber-700 block py-2 px-4 rounded hover:bg-red-700 text-white"
          >
            Login
          </Link>{" "}
        </div>

        {/* Mobile Open */}
        <button onClick={() => setMenuOpen(true)} className="ml-auto lg:hidden">
          <FaBars size={22} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
