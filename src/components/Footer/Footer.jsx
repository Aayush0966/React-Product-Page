import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-200 mt-20 text-gray-800 py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600 text-4xl font-extrabold  transition-colors">Let's Shop</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Github</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Discord</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-600 transition-colors">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 mt-8 pt-4">
          <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-600">
              &copy; 2024 All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <BsFacebook size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <BsInstagram size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <BsTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <BsGithub size={24} />
              </a>
              <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                <BsDribbble size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
