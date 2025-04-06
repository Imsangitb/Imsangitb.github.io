import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiExternalLink } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100) 
    : 0;

  const toggleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
    // Here you would normally call an API to add/remove from wishlist
  };

  return (
    <div 
      className="card group h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Wishlist Button */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Link href={`/product/${product._id}`}>
          <div className="w-full h-full relative">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </Link>
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-white px-2 py-1 text-xs font-medium text-neutral-700 rounded">
          {product.category}
        </div>
        
        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm transition-colors hover:bg-neutral-100"
        >
          <FiHeart 
            size={18} 
            className={isWishlisted ? 'fill-secondary text-secondary' : 'text-neutral-700'}
          />
        </button>
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute bottom-2 left-2 bg-secondary text-white px-2 py-1 text-xs font-bold rounded">
            {discountPercentage}% OFF
          </div>
        )}
        
        {/* Affiliate Links (shown on hover) */}
        {isHovered && product.affiliateLinks && (
          <div className="absolute bottom-2 right-2 flex space-x-2">
            {product.affiliateLinks.amazon && (
              <a 
                href={product.affiliateLinks.amazon} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-sm hover:bg-neutral-100 transition-colors"
              >
                <Image src="/amazon-icon.png" alt="Amazon" width={18} height={18} />
              </a>
            )}
            {product.affiliateLinks.flipkart && (
              <a 
                href={product.affiliateLinks.flipkart} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full shadow-sm hover:bg-neutral-100 transition-colors"
              >
                <Image src="/flipkart-icon.png" alt="Flipkart" width={18} height={18} />
              </a>
            )}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-medium text-neutral-800 line-clamp-2">
            <Link href={`/product/${product._id}`}>
              {product.title}
            </Link>
          </h3>
        </div>
        
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" size={14} />
            <span className="ml-1 text-xs font-medium text-neutral-600">
              {product.ratings.average} ({product.ratings.count})
            </span>
          </div>
          <span className="mx-2 text-neutral-300">|</span>
          <span className="text-xs text-neutral-600">
            {product.brand}
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-sm font-semibold text-neutral-800">₹{product.discountPrice}</span>
                <span className="ml-1 text-xs text-neutral-500 line-through">₹{product.price}</span>
              </>
            ) : (
              <span className="text-sm font-semibold text-neutral-800">₹{product.price}</span>
            )}
          </div>
          
          {/* Compare Prices Button */}
          <div className="mt-3">
            <Link 
              href={`/product/${product._id}`}
              className="text-xs font-medium text-primary flex items-center hover:underline"
            >
              <span>Compare Prices</span>
              <FiExternalLink size={14} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 