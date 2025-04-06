import { useState } from 'react';
import ProductCard from './ProductCard';

const tabs = [
  { id: 'trending', name: 'Trending Now' },
  { id: 'offers', name: 'Best Offers' },
  { id: 'latest', name: 'New Arrivals' },
];

// This component receives products from the parent to display
const FeaturedProducts = ({ products = [] }) => {
  const [activeTab, setActiveTab] = useState('trending');

  // Mock filter logic - in real app this would filter products based on the activeTab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case 'trending':
        return products.filter(product => product.trending);
      case 'offers':
        return products.filter(product => product.discountPrice > 0);
      case 'latest':
        return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-neutral-800 mb-4 md:mb-0">
            Featured Products
          </h2>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts; 