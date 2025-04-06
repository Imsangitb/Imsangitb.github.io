import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { FiHeart, FiShare2, FiExternalLink } from 'react-icons/fi';
import { MOCK_PRODUCTS } from '../../utils/mockData';

// Helper to render star ratings
const RatingStars = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<FaStar key={i} className="text-yellow-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-yellow-400" />);
    }
  }

  return <div className="flex">{stars}</div>;
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [activeImage, setActiveImage] = useState(0);

  // Mock function to find the product - in a real app, this would be fetched from an API endpoint
  const product = MOCK_PRODUCTS.find(p => p._id === id);

  if (!product && router.isReady) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-neutral-800 mb-4">Product Not Found</h1>
            <p className="text-neutral-600 mb-6">The product you're looking for does not exist or has been removed.</p>
            <Link href="/" className="btn btn-primary">
              Return to Home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return null; // Loading state
  }

  // Compile affiliate store options
  const affiliateOptions = [];
  
  if (product.affiliateLinks.amazon) {
    affiliateOptions.push({
      name: 'Amazon',
      price: product.discountPrice || product.price,
      link: product.affiliateLinks.amazon,
      icon: '/amazon-icon.png',
    });
  }
  
  if (product.affiliateLinks.flipkart) {
    // Mock different price on different platforms
    const flipkartPrice = Math.round((product.discountPrice || product.price) * 0.98);
    affiliateOptions.push({
      name: 'Flipkart',
      price: flipkartPrice,
      link: product.affiliateLinks.flipkart,
      icon: '/flipkart-icon.png',
    });
  }
  
  if (product.affiliateLinks.myntra) {
    // Mock different price on different platforms
    const myntraPrice = Math.round((product.discountPrice || product.price) * 1.02);
    affiliateOptions.push({
      name: 'Myntra',
      price: myntraPrice,
      link: product.affiliateLinks.myntra,
      icon: '/myntra-icon.png',
    });
  }
  
  // Sort by price (lowest first)
  affiliateOptions.sort((a, b) => a.price - b.price);
  
  // Calculate discount percentage
  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{product.title} - StudentBuy</title>
        <meta name="description" content={product.description} />
      </Head>

      <Header />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="text-sm mb-6">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="text-neutral-500 hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="text-neutral-500">/</li>
              <li>
                <Link href={`/category/${product.category.toLowerCase()}`} className="text-neutral-500 hover:text-primary">
                  {product.category}
                </Link>
              </li>
              <li className="text-neutral-500">/</li>
              <li className="text-neutral-800 font-medium truncate max-w-xs">{product.title}</li>
            </ol>
          </nav>

          {/* Product Details */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Product Images */}
              <div className="p-6 bg-neutral-50">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                  <Image
                    src={product.images[activeImage] || product.images[0]}
                    alt={product.title}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  
                  {discountPercentage > 0 && (
                    <div className="absolute top-4 left-4 bg-secondary text-white px-2 py-1 text-sm font-bold rounded">
                      {discountPercentage}% OFF
                    </div>
                  )}
                </div>
                
                {/* Image thumbnails - would show multiple if available */}
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative w-16 h-16 rounded border-2 overflow-hidden focus:outline-none 
                        ${activeImage === index ? 'border-primary' : 'border-transparent'}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between mb-2">
                  <h1 className="text-2xl md:text-3xl font-display font-bold text-neutral-800">
                    {product.title}
                  </h1>
                  <button 
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
                    aria-label="Add to wishlist"
                  >
                    <FiHeart 
                      size={24} 
                      className={isWishlisted ? 'fill-secondary text-secondary' : 'text-neutral-700'}
                    />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <RatingStars rating={product.ratings.average} />
                    <span className="ml-2 text-sm text-neutral-600">
                      {product.ratings.average} ({product.ratings.count} reviews)
                    </span>
                  </div>
                  <span className="text-neutral-300">|</span>
                  <span className="text-sm text-neutral-600">
                    Brand: <span className="font-medium">{product.brand}</span>
                  </span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    {product.discountPrice ? (
                      <>
                        <span className="text-2xl md:text-3xl font-bold text-neutral-800">₹{product.discountPrice}</span>
                        <span className="ml-2 text-sm text-neutral-500 line-through">₹{product.price}</span>
                        <span className="ml-2 text-sm font-medium text-secondary">{discountPercentage}% off</span>
                      </>
                    ) : (
                      <span className="text-2xl md:text-3xl font-bold text-neutral-800">₹{product.price}</span>
                    )}
                  </div>
                  <p className="text-sm text-green-600">
                    {product.stock > 0 ? `In stock (${product.stock} units)` : 'Out of stock'}
                  </p>
                </div>
                
                {/* Affiliate Store Options */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3">Compare Prices</h3>
                  <div className="space-y-3">
                    {affiliateOptions.map((option, index) => (
                      <div 
                        key={option.name} 
                        className={`border rounded-lg p-4 flex items-center justify-between 
                          ${index === 0 ? 'border-primary bg-blue-50' : 'border-neutral-200'}`}
                      >
                        <div className="flex items-center">
                          <div className="w-8 h-8 relative mr-3">
                            <Image 
                              src={option.icon} 
                              alt={option.name} 
                              fill 
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{option.name}</h4>
                            <p className="text-sm text-neutral-600">
                              ₹{option.price.toLocaleString()}
                              {index === 0 && <span className="text-green-600 ml-2">Best Price!</span>}
                            </p>
                          </div>
                        </div>
                        <a 
                          href={option.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`btn ${index === 0 ? 'btn-primary' : 'btn-outline'}`}
                        >
                          <span className="mr-1">Buy Now</span>
                          <FiExternalLink size={16} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Share */}
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-sm text-neutral-600">Share:</span>
                  <div className="flex space-x-2">
                    <button className="p-2 rounded-full hover:bg-neutral-100 transition-colors">
                      <FiShare2 size={18} className="text-neutral-700" />
                    </button>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-neutral-600">Category</span>
                      <p className="font-medium">{product.category}</p>
                    </div>
                    <div>
                      <span className="text-sm text-neutral-600">Sub-Category</span>
                      <p className="font-medium">{product.subCategory}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-t border-neutral-200">
              <div className="flex overflow-x-auto">
                <button 
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                    ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-neutral-600 hover:text-neutral-800'}
                  `}
                  onClick={() => setActiveTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                    ${activeTab === 'specifications' ? 'border-primary text-primary' : 'border-transparent text-neutral-600 hover:text-neutral-800'}
                  `}
                  onClick={() => setActiveTab('specifications')}
                >
                  Specifications
                </button>
                <button 
                  className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors
                    ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-neutral-600 hover:text-neutral-800'}
                  `}
                  onClick={() => setActiveTab('reviews')}
                >
                  Reviews ({product.ratings.count})
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <p className="text-neutral-700 leading-relaxed">{product.description}</p>
                    <p className="text-neutral-700 leading-relaxed mt-4">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
                    </p>
                    <ul className="mt-4 space-y-2 list-disc list-inside text-neutral-700">
                      <li>Perfect for students and professionals</li>
                      <li>Durable design for everyday use</li>
                      <li>Affordable price without compromising quality</li>
                      <li>Ideal for college and university settings</li>
                    </ul>
                  </div>
                )}
                
                {activeTab === 'specifications' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-neutral-50 px-4 py-2 font-medium">General</div>
                      <div className="divide-y">
                        <div className="px-4 py-3 grid grid-cols-2">
                          <span className="text-neutral-600 text-sm">Brand</span>
                          <span>{product.brand}</span>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-2">
                          <span className="text-neutral-600 text-sm">Model</span>
                          <span>Standard Edition</span>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-2">
                          <span className="text-neutral-600 text-sm">Warranty</span>
                          <span>1 Year</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-neutral-50 px-4 py-2 font-medium">Technical Details</div>
                      <div className="divide-y">
                        <div className="px-4 py-3 grid grid-cols-2">
                          <span className="text-neutral-600 text-sm">Material</span>
                          <span>Premium Quality</span>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-2">
                          <span className="text-neutral-600 text-sm">Color</span>
                          <span>Multiple Options</span>
                        </div>
                        <div className="px-4 py-3 grid grid-cols-2">
                          <span className="text-neutral-600 text-sm">Dimensions</span>
                          <span>Standard Size</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <div className="text-5xl font-bold text-neutral-800 text-center">
                          {product.ratings.average}
                        </div>
                        <div className="flex justify-center mt-1">
                          <RatingStars rating={product.ratings.average} />
                        </div>
                        <div className="text-sm text-neutral-600 text-center mt-1">
                          {product.ratings.count} reviews
                        </div>
                      </div>
                      <div className="flex-grow ml-4">
                        {/* Mock rating bars */}
                        {[5, 4, 3, 2, 1].map((num) => (
                          <div key={num} className="flex items-center mb-1">
                            <span className="text-sm w-6">{num}</span>
                            <FaStar className="text-yellow-400 mr-2" size={12} />
                            <div className="w-full bg-neutral-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-400 h-2 rounded-full" 
                                style={{ 
                                  width: `${Math.random() * (num === 5 ? 80 : num === 4 ? 60 : num === 3 ? 30 : num === 2 ? 15 : 5) + (num === 5 ? 20 : num === 4 ? 15 : num === 3 ? 5 : 0)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border-t border-neutral-200 pt-6">
                      <h3 className="font-semibold mb-4">Customer Reviews</h3>
                      <div className="space-y-6">
                        {/* Mock reviews */}
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="border-b border-neutral-200 pb-6 last:border-b-0">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">Student Reviewer {i + 1}</h4>
                              <span className="text-sm text-neutral-500">
                                {new Date(Date.now() - 86400000 * (i + 1) * 3).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex mb-2">
                              <RatingStars rating={5 - i * 0.5} />
                            </div>
                            <p className="text-neutral-700">
                              {i === 0 
                                ? "This product exceeded my expectations! Perfect for my college needs and the price was the best I could find after comparing on multiple sites."
                                : i === 1 
                                ? "Good quality and value for money. Delivery was quick and the product description matched exactly what I received."
                                : "Decent product, not the best but good enough for the price point. The StudentBuy price comparison saved me a few hundred rupees."
                              }
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Similar Products */}
          <section className="mt-12">
            <h2 className="text-2xl font-display font-bold text-neutral-800 mb-6">
              Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {MOCK_PRODUCTS.filter(p => 
                p.category === product.category && p._id !== product._id
              ).slice(0, 4).map(relatedProduct => (
                <div key={relatedProduct._id} className="card">
                  <Link href={`/product/${relatedProduct._id}`}>
                    <div className="relative aspect-square">
                      <Image
                        src={relatedProduct.images[0]}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-neutral-800 line-clamp-2">{relatedProduct.title}</h3>
                      <div className="flex items-center mt-1">
                        <RatingStars rating={relatedProduct.ratings.average} />
                        <span className="ml-1 text-sm text-neutral-600">
                          ({relatedProduct.ratings.count})
                        </span>
                      </div>
                      <div className="mt-2">
                        {relatedProduct.discountPrice ? (
                          <div className="flex items-center">
                            <span className="font-bold">₹{relatedProduct.discountPrice}</span>
                            <span className="ml-1 text-sm text-neutral-500 line-through">₹{relatedProduct.price}</span>
                          </div>
                        ) : (
                          <span className="font-bold">₹{relatedProduct.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
} 