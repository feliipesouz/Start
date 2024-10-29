import { FiTwitter, FiInstagram, FiFacebook, FiGlobe } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white pt-8 pb-5 px-4 md:px-16">
      <div>
        <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <div className="flex items-center mb-7">
              <img src="/logo.png" alt="Logo" className="h-10 mr-2" />
              <h2 className="text-xl font-bold text-white">
                Você é <span className="text-[#EF5DA8]">Especial</span>
              </h2>
            </div>
            <p className="text-[10px] text-[#B2B2B2] mb-7">
              A perfect place for perfect food, all kinds of parties and any other
              gathering as well, for our guests to simply unwind and relax in complete
              serenity.
            </p>

            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-[#29282d] rounded-full hover:bg-[#EF5DA8] transition"
              >
                <FiGlobe className="text-xl" />
              </a>
              <a
                href="#"
                className="p-2 bg-[#29282d] rounded-full hover:bg-[#EF5DA8] transition"
              >
                <FiTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="p-2 bg-[#29282d] rounded-full hover:bg-[#EF5DA8] transition"
              >
                <FiInstagram className="text-xl" />
              </a>
              <a
                href="#"
                className="p-2 bg-[#29282d] rounded-full hover:bg-[#EF5DA8] transition"
              >
                <FiFacebook className="text-xl" />
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-xs text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px]  hover:text-white">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  Order Now
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <h3 className="font-bold text-xs text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-[#B3B3B3] text-[10px] hover:text-white">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-bold text-xs text-white mb-4">Contact</h3>
            <p className="text-[#B3B3B3] text-[10px] mb-3">
              <strong className="text-white">Call:</strong> +00 0000000000
            </p>
            <p className="text-[#B3B3B3] text-[10px] mb-3">
              <strong className="text-white">Email:</strong> semnomeail@gmail.com
            </p>
            <p className="text-[#B3B3B3] text-[10px]">
              <strong className="text-white">Address:</strong> LoveSafe, Lorem Ipsum, Lorem lorem, 252, Lorem -
              cidade
            </p>
          </div>
        </div>

      </div>

      <hr className="border-t border-gray-700 mt-10" />

      <div className="flex justify-center items-center text-center text-[#B3B3B3] text-[10px] text-sm my-5">
        <p className="h-full flex justify-center items-center">
          Copyright © 2024 LoveSafe. All Rights Reserved. Designed by Izabely Almeida
        </p>
      </div>
    </footer>
  );
}
