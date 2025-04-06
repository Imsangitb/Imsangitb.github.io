import Link from 'next/link';
import { FiInstagram, FiTwitter, FiYoutube, FiFacebook, FiLinkedin } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand section */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold text-white">StudentBuy</span>
            </Link>
            <p className="text-neutral-300 mb-6">
              Your one-stop destination for affordable student essentials. Compare prices, read reviews, and shop smartly!
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-primary transition-colors">
                <FiInstagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-primary transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-primary transition-colors">
                <FiYoutube size={20} />
              </a>
              <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:text-primary transition-colors">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/fashion" className="text-neutral-300 hover:text-primary transition-colors">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="text-neutral-300 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/stationery" className="text-neutral-300 hover:text-primary transition-colors">
                  Stationery
                </Link>
              </li>
              <li>
                <Link href="/category/gadgets" className="text-neutral-300 hover:text-primary transition-colors">
                  Gadgets
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-neutral-300 hover:text-primary transition-colors">
                  Student Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-neutral-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/affiliate-program" className="text-neutral-300 hover:text-primary transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href="/campus-ambassador" className="text-neutral-300 hover:text-primary transition-colors">
                  Campus Ambassador
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-300 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-300 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-neutral-300 hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-neutral-300 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-neutral-300 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-neutral-300 hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="text-neutral-300 hover:text-primary transition-colors">
                  Return Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} StudentBuy. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-neutral-400 text-sm">Payment Options:</p>
              <div className="flex space-x-2">
                <span className="bg-white text-xs text-neutral-800 px-2 py-1 rounded">UPI</span>
                <span className="bg-white text-xs text-neutral-800 px-2 py-1 rounded">Cards</span>
                <span className="bg-white text-xs text-neutral-800 px-2 py-1 rounded">NetBanking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 