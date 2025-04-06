import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiTrash2, FiShoppingBag, FiShare2 } from 'react-icons/fi';
import { MOCK_PRODUCTS } from '../utils/mockData';

export default function Wishlist() {
  // Mock data - in a real app, this would be fetched from an API or local storage
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading wishlist data
    setTimeout(() => {
      // Mock data - randomly select 3 products from the mock products
      const randomProducts = [...MOCK_PRODUCTS]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      
      setWishlistItems(randomProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const removeFromWishlist = (productId) => {
    setWishlistItems(wishlistItems.filter(item => item._id !== productId));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>My Wishlist - StudentBuy</title>
        <meta name="description" content="View and manage your saved products on StudentBuy." />
      </Head>

      <Header />

      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-800">
              My Wishlist
            </h1>
            {wishlistItems.length > 0 && (
              <button 
                className="text-sm text-red-500 hover:text-red-600 hover:underline"
                onClick={clearWishlist}
              >
                Clear Wishlist
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-pulse flex flex-col items-center">
                <div className="rounded-full bg-neutral-200 h-12 w-12 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-32 mb-2"></div>
                <div className="h-3 bg-neutral-200 rounded w-24"></div>
              </div>
            </div>
          ) : wishlistItems.length > 0 ? (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Availability
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {wishlistItems.map((item) => (
                    <tr key={item._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16 relative">
                            <Image 
                              src={item.images[0]} 
                              alt={item.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="ml-4">
                            <Link href={`/product/${item._id}`} className="text-sm font-medium text-neutral-900 hover:text-primary">
                              {item.title}
                            </Link>
                            <div className="text-xs text-neutral-500">{item.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.discountPrice ? (
                          <div>
                            <div className="text-sm font-medium text-neutral-900">₹{item.discountPrice}</div>
                            <div className="text-xs text-neutral-500 line-through">₹{item.price}</div>
                          </div>
                        ) : (
                          <div className="text-sm font-medium text-neutral-900">₹{item.price}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {item.stock > 0 ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            In Stock
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Out of Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3 justify-end">
                          <button 
                            onClick={() => removeFromWishlist(item._id)}
                            className="text-red-500 hover:text-red-700"
                            title="Remove from wishlist"
                          >
                            <FiTrash2 size={18} />
                          </button>
                          <a 
                            href={item.affiliateLinks.amazon || item.affiliateLinks.flipkart}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary-dark"
                            title="Buy now"
                          >
                            <FiShoppingBag size={18} />
                          </a>
                          <button 
                            className="text-neutral-500 hover:text-neutral-700"
                            title="Share"
                          >
                            <FiShare2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
              <div className="mx-auto w-24 h-24 text-neutral-300 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1} 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                  />
                </svg>
              </div>
              <h2 className="text-xl font-display font-semibold text-neutral-800 mb-2">Your wishlist is empty</h2>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                Browse our products and save your favorites for later.
              </p>
              <Link href="/" className="btn btn-primary">
                Start Shopping
              </Link>
            </div>
          )}

          {wishlistItems.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-display font-semibold text-neutral-800 mb-4">
                You might also like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MOCK_PRODUCTS.filter(p => !wishlistItems.some(w => w._id === p._id))
                  .slice(0, 4)
                  .map(product => (
                    <div key={product._id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <Link href={`/product/${product._id}`}>
                        <div className="relative h-48">
                          <Image
                            src={product.images[0]}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="text-sm font-medium text-neutral-900 mb-1 line-clamp-2">
                            {product.title}
                          </h3>
                          <div className="flex justify-between items-center">
                            {product.discountPrice ? (
                              <div>
                                <span className="text-sm font-semibold text-neutral-900">₹{product.discountPrice}</span>
                                <span className="text-xs text-neutral-500 line-through ml-1">₹{product.price}</span>
                              </div>
                            ) : (
                              <span className="text-sm font-semibold text-neutral-900">₹{product.price}</span>
                            )}
                            <span className="text-xs text-neutral-500">{product.brand}</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
} 