
import React from 'react';
import { FaFacebookF, FaTwitter, FaDribbble, FaInstagram, FaLocationArrow, FaMobile } from 'react-icons/fa';
import Logo from './Logo';
import footer_image_1 from "../assets/images/footer_image_1.jpg";
import footer_image_2 from "../assets/images/footer_image_2.jpg";
import footer_image_3 from "../assets/images/footer_image_3.jpg";
import footer_image_4 from "../assets/images/footer_image_4.jpg";
import { Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo/>
            </div>
            <p className="text-gray-600 text-sm">
              FoodTrove is the biggest market of grocery products. Get your daily needs from our store.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaLocationArrow className='h-6 w-6 text-red-500'/>
                <span className="text-sm">51 Green St,Huntington ohalo beach ontario, NY 11746 KY 4783, USA.</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail className='h-6 w-6 text-red-500'/>
                <span className="text-sm">example@email.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaMobile className='h-6 w-6 text-red-500'/>
                <span className="text-sm">+91 123 4567890</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Delivery Information</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Support Center</a></li>
            </ul>
          </div>

          {/* Category Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Category</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Dairy & Bakery</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Fruits & Vegetable</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Snack & Spice</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Juice & Drinks</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Chicken & Meat</a></li>
              <li><a href="#" className="text-gray-600 hover:text-gray-900">Fast Food</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Subscribe Our Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Search here..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button className="px-4 py-2 bg-black text-white rounded-r">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <FaFacebookF className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <FaTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <FaDribbble className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <FaInstagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-5 gap-2 mt-6">
              <img src={footer_image_1} alt="Gallery 1" className="w-full h-16 object-cover rounded" />
              <img src={footer_image_2} alt="Gallery 2" className="w-full h-16 object-cover rounded" />
              <img src={footer_image_3} alt="Gallery 3" className="w-full h-16 object-cover rounded" />
              <img src={footer_image_4} alt="Gallery 4" className="w-full h-16 object-cover rounded" />
              <img src={footer_image_1} alt="Gallery 5" className="w-full h-16 object-cover rounded" />
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© 2024 <span className="text-red-500 font-medium">FoodTrove</span>, All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
