import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import CategoryShowcase from '../components/CategoryShowcase';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import { FiBookmark, FiTruck, FiShield, FiPercent } from 'react-icons/fi';

// Mock products - in a real app these would be fetched from an API
const MOCK_PRODUCTS = [
  {
    _id: '1',
    title: 'HP Pavilion 15 Laptop',
    description: 'Perfect for students with its powerful performance and affordability.',
    price: 52999,
    discountPrice: 49999,
    images: ['/product-laptop1.jpg'],
    category: 'Electronics',
    subCategory: 'Laptops',
    brand: 'HP',
    ratings: { average: 4.5, count: 128 },
    stock: 15,
    featured: true,
    trending: true,
    affiliateLinks: {
      amazon: 'https://amazon.in/hp-pavilion',
      flipkart: 'https://flipkart.com/hp-pavilion',
    },
    createdAt: '2023-06-15T10:00:00Z',
  },
  {
    _id: '2',
    title: 'Campus Casual Shoes',
    description: 'Comfortable and stylish shoes perfect for daily college wear.',
    price: 1999,
    discountPrice: 1499,
    images: ['/product-shoes1.jpg'],
    category: 'Fashion',
    subCategory: 'Footwear',
    brand: 'Campus',
    ratings: { average: 4.3, count: 210 },
    stock: 50,
    featured: true,
    trending: true,
    affiliateLinks: {
      amazon: 'https://amazon.in/campus-shoes',
      myntra: 'https://myntra.com/campus-shoes',
    },
    createdAt: '2023-07-20T10:00:00Z',
  },
  {
    _id: '3',
    title: 'Classmate Premium Notebooks - Pack of 6',
    description: 'Long-lasting, high-quality notebooks for all your study needs.',
    price: 450,
    discountPrice: 399,
    images: ['/product-notebook1.jpg'],
    category: 'Stationery',
    subCategory: 'Notebooks',
    brand: 'Classmate',
    ratings: { average: 4.7, count: 89 },
    stock: 200,
    featured: true,
    trending: false,
    affiliateLinks: {
      amazon: 'https://amazon.in/classmate-notebooks',
      flipkart: 'https://flipkart.com/classmate-notebooks',
    },
    createdAt: '2023-08-05T10:00:00Z',
  },
  {
    _id: '4',
    title: 'boAt Airdopes 131 TWS Earbuds',
    description: 'Wireless earbuds with immersive sound and long battery life.',
    price: 1999,
    discountPrice: 1299,
    images: ['/product-earbuds1.jpg'],
    category: 'Electronics',
    subCategory: 'Audio',
    brand: 'boAt',
    ratings: { average: 4.2, count: 315 },
    stock: 75,
    featured: true,
    trending: true,
    affiliateLinks: {
      amazon: 'https://amazon.in/boat-airdopes',
      flipkart: 'https://flipkart.com/boat-airdopes',
    },
    createdAt: '2023-05-10T10:00:00Z',
  },
  {
    _id: '5',
    title: 'Wildcraft Laptop Backpack',
    description: 'Durable, spacious backpack with dedicated laptop compartment.',
    price: 2499,
    discountPrice: 1999,
    images: ['/product-backpack1.jpg'],
    category: 'Fashion',
    subCategory: 'Bags',
    brand: 'Wildcraft',
    ratings: { average: 4.4, count: 178 },
    stock: 40,
    featured: true,
    trending: false,
    affiliateLinks: {
      amazon: 'https://amazon.in/wildcraft-backpack',
      myntra: 'https://myntra.com/wildcraft-backpack',
    },
    createdAt: '2023-09-01T10:00:00Z',
  },
  {
    _id: '6',
    title: 'Casio FX-991EX Scientific Calculator',
    description: 'Advanced scientific calculator for engineering and science students.',
    price: 1795,
    discountPrice: 0,
    images: ['/product-calculator1.jpg'],
    category: 'Stationery',
    subCategory: 'Calculators',
    brand: 'Casio',
    ratings: { average: 4.8, count: 92 },
    stock: 30,
    featured: true,
    trending: false,
    affiliateLinks: {
      amazon: 'https://amazon.in/casio-calculator',
      flipkart: 'https://flipkart.com/casio-calculator',
    },
    createdAt: '2023-06-25T10:00:00Z',
  },
  {
    _id: '7',
    title: 'OnePlus Nord CE 2 5G',
    description: 'Feature-packed smartphone with great camera and fast charging.',
    price: 24999,
    discountPrice: 22999,
    images: ['/product-phone1.jpg'],
    category: 'Electronics',
    subCategory: 'Smartphones',
    brand: 'OnePlus',
    ratings: { average: 4.3, count: 267 },
    stock: 25,
    featured: true,
    trending: true,
    affiliateLinks: {
      amazon: 'https://amazon.in/oneplus-nord',
      flipkart: 'https://flipkart.com/oneplus-nord',
    },
    createdAt: '2023-08-15T10:00:00Z',
  },
  {
    _id: '8',
    title: 'Allen Kota JEE Complete Study Material',
    description: 'Comprehensive study material for JEE preparation.',
    price: 8999,
    discountPrice: 7999,
    images: ['/product-books1.jpg'],
    category: 'Books',
    subCategory: 'Study Material',
    brand: 'Allen',
    ratings: { average: 4.6, count: 56 },
    stock: 15,
    featured: true,
    trending: false,
    affiliateLinks: {
      amazon: 'https://amazon.in/allen-study-material',
      flipkart: 'https://flipkart.com/allen-study-material',
    },
    createdAt: '2023-07-10T10:00:00Z',
  },
];

const features = [
  {
    icon: <FiPercent className="w-6 h-6 text-primary" />,
    title: 'Best Student Prices',
    description: 'Exclusive discounts and offers for students across India'
  },
  {
    icon: <FiBookmark className="w-6 h-6 text-primary" />,
    title: 'Quality Verified',
    description: 'All products are verified for quality and authenticity'
  },
  {
    icon: <FiTruck className="w-6 h-6 text-primary" />,
    title: 'Direct Shopping',
    description: 'Seamless redirection to official seller websites'
  },
  {
    icon: <FiShield className="w-6 h-6 text-primary" />,
    title: 'Secure & Trusted',
    description: 'Safe, reliable pricing comparison you can trust'
  },
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // This would be an API call in a real application
    setProducts(MOCK_PRODUCTS);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>StudentBuy - Best Deals for Indian Students</title>
        <meta name="description" content="Find and compare the best prices on products for Indian students. Fashion, electronics, books and more at student-friendly prices." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow">
        <HeroSection />
        
        {/* Features */}
        <section className="py-8 bg-white border-b border-neutral-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mr-3">{feature.icon}</div>
                  <div>
                    <h3 className="text-base font-semibold text-neutral-800">{feature.title}</h3>
                    <p className="text-sm text-neutral-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CategoryShowcase />
        
        <FeaturedProducts products={products} />
        
        {/* Student Offer Banner */}
        <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-8 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
                  Join Our Campus Ambassador Program
                </h2>
                <p className="text-blue-100 max-w-xl">
                  Represent StudentBuy on your campus, help fellow students save money, and earn rewards and commissions!
                </p>
              </div>
              <a 
                href="/campus-ambassador" 
                className="btn px-8 py-3 bg-white text-primary hover:bg-blue-50 focus:ring-white"
              >
                Apply Now
              </a>
            </div>
          </div>
        </section>
        
        <Testimonials />
        
        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-neutral-50 border-t border-neutral-200">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 mb-3">
              Start Saving on Your Student Essentials
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto mb-8">
              Join thousands of students across India who are finding the best deals on everything from textbooks to tech gadgets.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <a href="/category/electronics" className="btn btn-primary px-8 py-3">
                Browse Electronics
              </a>
              <a href="/signup" className="btn btn-outline px-8 py-3">
                Create an Account
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
} 