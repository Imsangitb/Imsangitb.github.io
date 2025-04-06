import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { MOCK_PRODUCTS } from '../../utils/mockData';
import { FiFilter, FiChevronDown, FiX, FiCheck } from 'react-icons/fi';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    price: {
      min: 0,
      max: 100000,
    },
    brands: [],
    ratings: 0,
    discount: false,
  });

  // Get the user-friendly category name from the URL slug
  const getCategoryName = () => {
    if (!category) return '';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get category description
  const getCategoryDescription = () => {
    switch (category) {
      case 'fashion':
        return 'Stylish, comfortable, and affordable fashion for students. Find the latest trends in campus wear at the best prices.';
      case 'electronics':
        return 'Essential gadgets and devices for your academic needs. Compare prices across platforms for the best deals.';
      case 'stationery':
        return 'Quality stationery supplies for all your study requirements. Stock up on notebooks, pens, and more at student-friendly prices.';
      case 'gadgets':
        return 'Smart devices to enhance your student life. Find the latest tech at prices that won\'t break your budget.';
      case 'books':
        return 'Textbooks, reference materials, and study guides for all courses. Save on your educational materials with our price comparison.';
      default:
        return 'Browse our wide range of products designed for Indian students at competitive prices.';
    }
  };

  // Get category banner image
  const getCategoryBanner = () => {
    switch (category) {
      case 'fashion':
        return '/category-banner-fashion.jpg';
      case 'electronics':
        return '/category-banner-electronics.jpg';
      case 'stationery':
        return '/category-banner-stationery.jpg';
      case 'gadgets':
        return '/category-banner-gadgets.jpg';
      case 'books':
        return '/category-banner-books.jpg';
      default:
        return '/category-banner-default.jpg';
    }
  };

  useEffect(() => {
    if (category) {
      // Filter products by category - in a real app, this would be an API call
      const categoryProducts = MOCK_PRODUCTS.filter(
        product => product.category.toLowerCase() === category.toLowerCase()
      );
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [category]);

  // Extract all available brands for the filter
  const availableBrands = [...new Set(products.map(product => product.brand))];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'brands') {
      if (newFilters.brands.includes(value)) {
        newFilters.brands = newFilters.brands.filter(brand => brand !== value);
      } else {
        newFilters.brands.push(value);
      }
    } else if (filterType === 'price') {
      newFilters.price = { ...newFilters.price, ...value };
    } else if (filterType === 'ratings') {
      newFilters.ratings = value;
    } else if (filterType === 'discount') {
      newFilters.discount = value;
    }
    
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (currentFilters) => {
    let result = [...products];
    
    // Filter by price
    result = result.filter(product => {
      const productPrice = product.discountPrice || product.price;
      return productPrice >= currentFilters.price.min && productPrice <= currentFilters.price.max;
    });
    
    // Filter by brands
    if (currentFilters.brands.length > 0) {
      result = result.filter(product => currentFilters.brands.includes(product.brand));
    }
    
    // Filter by rating
    if (currentFilters.ratings > 0) {
      result = result.filter(product => product.ratings.average >= currentFilters.ratings);
    }
    
    // Filter by discount
    if (currentFilters.discount) {
      result = result.filter(product => product.discountPrice && product.discountPrice < product.price);
    }
    
    setFilteredProducts(result);
  };

  const clearFilters = () => {
    const defaultFilters = {
      price: {
        min: 0,
        max: 100000,
      },
      brands: [],
      ratings: 0,
      discount: false,
    };
    
    setFilters(defaultFilters);
    setFilteredProducts(products);
  };

  const sortProducts = (sortOption) => {
    let sorted = [...filteredProducts];
    
    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => b.ratings.average - a.ratings.average);
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        // Default sort by popularity/featured
        sorted.sort((a, b) => (b.trending ? 1 : 0) - (a.trending ? 1 : 0));
    }
    
    setFilteredProducts(sorted);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>{getCategoryName()} for Students - StudentBuy</title>
        <meta name="description" content={getCategoryDescription()} />
      </Head>

      <Header />

      <main className="flex-grow pt-20">
        {/* Category Banner */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <Image 
            src={getCategoryBanner()} 
            alt={`${getCategoryName()} Category`} 
            fill 
            className="object-cover" 
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                {getCategoryName()}
              </h1>
              <p className="text-white text-opacity-90 max-w-2xl">
                {getCategoryDescription()}
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Filters and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
            <button 
              className="flex items-center px-4 py-2 bg-white border border-neutral-300 rounded-md shadow-sm text-neutral-700 hover:bg-neutral-50 md:hidden"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FiFilter className="mr-2" />
              <span>Filters</span>
              <span className="ml-1 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                {(filters.brands.length > 0 ? 1 : 0) + 
                 (filters.ratings > 0 ? 1 : 0) + 
                 (filters.discount ? 1 : 0)}
              </span>
            </button>
            
            <div className="flex items-center">
              <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
              <select 
                className="border-none text-sm focus:ring-0"
                onChange={(e) => sortProducts(e.target.value)}
                defaultValue="featured"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
            
            <div className="text-sm text-neutral-600">
              Showing {filteredProducts.length} products
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-semibold text-lg">Filters</h2>
                  {(filters.brands.length > 0 || filters.ratings > 0 || filters.discount) && (
                    <button 
                      className="text-sm text-primary hover:underline"
                      onClick={clearFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>
                
                {/* Price Range */}
                <div className="border-b border-neutral-200 pb-4 mb-4">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number"
                      className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                      placeholder="Min"
                      value={filters.price.min}
                      onChange={(e) => handleFilterChange('price', { min: Number(e.target.value) })}
                    />
                    <span className="text-neutral-400">to</span>
                    <input 
                      type="number"
                      className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                      placeholder="Max"
                      value={filters.price.max}
                      onChange={(e) => handleFilterChange('price', { max: Number(e.target.value) })}
                    />
                  </div>
                </div>
                
                {/* Brands */}
                <div className="border-b border-neutral-200 pb-4 mb-4">
                  <h3 className="font-medium mb-3">Brands</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {availableBrands.map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary focus:ring-primary"
                          checked={filters.brands.includes(brand)}
                          onChange={() => handleFilterChange('brands', brand)}
                        />
                        <span className="ml-2 text-sm">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Ratings */}
                <div className="border-b border-neutral-200 pb-4 mb-4">
                  <h3 className="font-medium mb-3">Ratings</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input 
                          type="radio"
                          name="rating"
                          className="text-primary focus:ring-primary"
                          checked={filters.ratings === rating}
                          onChange={() => handleFilterChange('ratings', rating)}
                        />
                        <span className="ml-2 text-sm">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Discount */}
                <div>
                  <label className="flex items-center">
                    <input 
                      type="checkbox"
                      className="rounded text-primary focus:ring-primary"
                      checked={filters.discount}
                      onChange={() => handleFilterChange('discount', !filters.discount)}
                    />
                    <span className="ml-2 text-sm">Discounted Products</span>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Mobile Filters */}
            {isFilterOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
                <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg animate-slide-left">
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="font-semibold text-lg">Filters</h2>
                      <button onClick={() => setIsFilterOpen(false)}>
                        <FiX size={24} />
                      </button>
                    </div>
                    
                    {/* Price Range */}
                    <div className="border-b border-neutral-200 pb-4 mb-4">
                      <h3 className="font-medium mb-3">Price Range</h3>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="number"
                          className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                          placeholder="Min"
                          value={filters.price.min}
                          onChange={(e) => handleFilterChange('price', { min: Number(e.target.value) })}
                        />
                        <span className="text-neutral-400">to</span>
                        <input 
                          type="number"
                          className="w-full px-2 py-1 border border-neutral-300 rounded text-sm"
                          placeholder="Max"
                          value={filters.price.max}
                          onChange={(e) => handleFilterChange('price', { max: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    
                    {/* Brands */}
                    <div className="border-b border-neutral-200 pb-4 mb-4">
                      <h3 className="font-medium mb-3">Brands</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {availableBrands.map((brand) => (
                          <label key={brand} className="flex items-center">
                            <input 
                              type="checkbox"
                              className="rounded text-primary focus:ring-primary"
                              checked={filters.brands.includes(brand)}
                              onChange={() => handleFilterChange('brands', brand)}
                            />
                            <span className="ml-2 text-sm">{brand}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Ratings */}
                    <div className="border-b border-neutral-200 pb-4 mb-4">
                      <h3 className="font-medium mb-3">Ratings</h3>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center">
                            <input 
                              type="radio"
                              name="rating"
                              className="text-primary focus:ring-primary"
                              checked={filters.ratings === rating}
                              onChange={() => handleFilterChange('ratings', rating)}
                            />
                            <span className="ml-2 text-sm">{rating}+ Stars</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    {/* Discount */}
                    <div className="mb-6">
                      <label className="flex items-center">
                        <input 
                          type="checkbox"
                          className="rounded text-primary focus:ring-primary"
                          checked={filters.discount}
                          onChange={() => handleFilterChange('discount', !filters.discount)}
                        />
                        <span className="ml-2 text-sm">Discounted Products</span>
                      </label>
                    </div>
                    
                    <div className="mt-auto flex space-x-3">
                      <button 
                        className="flex-1 py-2 text-center border border-neutral-300 rounded-md text-neutral-700"
                        onClick={clearFilters}
                      >
                        Clear All
                      </button>
                      <button 
                        className="flex-1 py-2 text-center bg-primary text-white rounded-md"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Products Grid */}
            <div className="flex-grow">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center bg-white rounded-lg shadow-sm">
                  <h3 className="text-lg font-medium text-neutral-800 mb-2">No Products Found</h3>
                  <p className="text-neutral-600 mb-6">Try changing your filter criteria</p>
                  <button 
                    className="btn btn-outline"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 