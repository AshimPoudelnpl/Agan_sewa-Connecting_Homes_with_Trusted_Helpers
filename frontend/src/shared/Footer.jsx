import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from '../assets/logo-removebg-preview.png'

const FOOTER_DATA = {
  exploreProducts: [
    "Gadgets",
    "Laptops",
    "Tablets",
    "Smartphones",
    "Smartwatches",
    "Wireless Headphones",
    "Home Entertainment",
    "Tracking Devices",
    "Gifts",
  ],
  yourAccount: ["Manage Your Account", "Account Settings", "Sign In"],
  aboutUs: [
    "Company News",
    "Leadership Team",
    "Join Our Team",
    "Investors",
    "Our Values",
    "Events",
    "Contact Us",
  ],
  ourStores: [
    "Find a Location",
    "Customer Service",
    "Workshops",
    "Group Bookings",
    "Trade-In Program",
    "Purchase Options",
    "Recycle",
    "Order Updates",
    "Shopping Assistance",
  ],
  forBusinesses: ["Solutions for Business", "Shop for Business"],
  forEducation: [
    "Educational Discounts",
    "Shop for Schools",
    "University Discounts",
  ],
  forHealthcare: [
    "Apple in Healthcare",
    "Medical Devices",
    "Health Features on Devices",
  ],
  bottomLinks: [
    "Privacy Policy",
    "Terms of Service",
    "Sales Terms",
    "Legal Notices",
    "Sitemap",
  ],
};

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Explore Our Products */}
        <div>
          <h3 className="text-sm text-slate-900 font-semibold mb-4">
            Explore Our Products
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.exploreProducts.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Your Account + About Us */}
        <div>
          <h3 className="text-sm text-slate-900 font-semibold mb-4">
            Your Account
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.yourAccount.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="text-sm text-slate-900 font-semibold mb-4 mt-8">
            About Us
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.aboutUs.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Stores */}
        <div>
          <h3 className="text-sm text-slate-900 font-semibold mb-4">
            Our Stores
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.ourStores.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Businesses / Education / Healthcare */}
        <div>
          <h3 className="text-sm text-slate-900 font-semibold mb-4">
            For Businesses
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.forBusinesses.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="text-sm text-slate-900 font-semibold mb-4 mt-8">
            For Education
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.forEducation.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <h3 className="text-sm text-slate-900 font-semibold mb-4 mt-8">
            For Healthcare
          </h3>
          <ul className="space-y-3">
            {FOOTER_DATA.forHealthcare.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-[13px] text-slate-600 hover:text-slate-900"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-500 mt-3 ">
        <div className="flex justify-between">
          {/* Company Logo */}
          <div className="max-w-6xl mx-auto mt-8 flex justify-center">
            <img
              src={logo} // Replace with your logo URL
              alt="Aangan Sewa Logo"
              className="w-36"
            />
          </div>
          {/* Social Media Icons */}
          <div className="max-w-6xl mx-auto mt-12 flex justify-center gap-6 text-gray-600">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-600 transition-colors"
            >
              <FaFacebookF size={22} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-400 transition-colors"
            >
              <FaTwitter size={22} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-600 transition-colors"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-700 transition-colors"
            >
              <FaLinkedinIn size={22} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="hover:text-red-600 transition-colors"
            >
              <FaYoutube size={22} />
            </a>
          </div>
        </div>

        {/* Bottom Links and Copyright */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            {FOOTER_DATA.bottomLinks.map((item, i) => (
              <a
                key={i}
                href="#"
                className="text-[13px] text-slate-600 hover:text-slate-900"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-sm text-slate-600">
            Aangan Sewa local services : &copy; 2014-26 Aangan Sewa Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;