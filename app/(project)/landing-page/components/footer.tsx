import { FiTwitter, FiInstagram, FiFacebook, FiGlobe } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white py-10 px-4 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e Descrição */}
        <div className="flex flex-col">
          <div className="flex items-center mb-4">
            <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
            <h2 className="text-2xl font-bold text-white">
              Você é <span className="text-[#EF5DA8]">Especial</span>
            </h2>
          </div>
          <p className="text-sm text-gray-400 mb-4">
            A perfect place for perfect food, all kinds of parties and any other
            gathering as well, for our guests to simply unwind and relax in complete
            serenity.
          </p>
          {/* Ícones de redes sociais */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-[#EF5DA8] transition"
            >
              <FiGlobe className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-[#EF5DA8] transition"
            >
              <FiTwitter className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-[#EF5DA8] transition"
            >
              <FiInstagram className="text-xl" />
            </a>
            <a
              href="#"
              className="p-2 bg-gray-700 rounded-full hover:bg-[#EF5DA8] transition"
            >
              <FiFacebook className="text-xl" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Menu
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Gallery
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Order Now
              </a>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col">
          <h3 className="font-bold text-lg text-white mb-4">Contact</h3>
          <p className="text-gray-400 mb-2">
            <strong>Call:</strong> +00 0000000000
          </p>
          <p className="text-gray-400 mb-2">
            <strong>Email:</strong> semnomeail@gmail.com
          </p>
          <p className="text-gray-400">
            <strong>Address:</strong> LoveSafe, Lorem Ipsum, Lorem lorem, 252, Lorem -
            cidade
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-10">
        <p>
          Copyright © 2024 LoveSafe. All Rights Reserved. Designed by Izabely Almeida
        </p>
      </div>
    </footer>
  );
}
