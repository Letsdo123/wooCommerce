import React from 'react';
import { FaFacebookF, FaInstagram, FaGithub, FaTwitter, FaYoutube } from 'react-icons/fa';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-8 md:mb-0">
            <Logo width={50} height={50}/>
            <p className="max-w-xs">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook">
                <FaFacebookF className="text-2xl" />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" aria-label="Github">
                <FaGithub className="text-2xl" />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h6 className="font-semibold mb-4">Solutions</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Marketing</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Analytics</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Commerce</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Insights</a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Support</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Pricing</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Documentation</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Guides</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">API Status</a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Company</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">About</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Blog</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Jobs</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Press</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Partners</a>
                </li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-4">Legal</h6>
              <ul>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Claim</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Privacy</a>
                </li>
                <li className="mb-2">
                  <a href="#" className="hover:text-gray-400">Terms</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-700 pt-6 text-center">
          <p>© 2024 Your Company, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
