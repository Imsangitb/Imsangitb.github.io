import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiSearch, FiUser, FiHeart, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  const categories = [
    { name: 'Fashion', href: '/category/fashion' },
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Stationery', href: '/category/stationery' },
    { name: 'Gadgets', href: '/category/gadgets' },
    { name: 'Books', href: '/category/books' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-30 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-display font-bold text-primary">StudentBuy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={category.href}
                className={`text-sm font-medium hover:text-primary transition-colors ${
                  router.pathname === category.href ? 'text-primary' : 'text-neutral-700'
                }`}
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search and Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-64 rounded-full border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
            <Link href="/wishlist" className="text-neutral-700 hover:text-primary transition-colors">
              <FiHeart size={20} />
            </Link>
            <Link href="/account" className="text-neutral-700 hover:text-primary transition-colors">
              <FiUser size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-neutral-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white absolute w-full shadow-lg animate-fade-in">
          <div className="px-4 py-5 space-y-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-full rounded-full border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link 
                  key={category.name} 
                  href={category.href}
                  className={`text-base font-medium hover:text-primary transition-colors ${
                    router.pathname === category.href ? 'text-primary' : 'text-neutral-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
            <div className="flex items-center space-x-8">
              <Link href="/wishlist" className="flex items-center text-neutral-700" onClick={() => setIsMenuOpen(false)}>
                <FiHeart size={20} className="mr-2" />
                <span>Wishlist</span>
              </Link>
              <Link href="/account" className="flex items-center text-neutral-700" onClick={() => setIsMenuOpen(false)}>
                <FiUser size={20} className="mr-2" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 