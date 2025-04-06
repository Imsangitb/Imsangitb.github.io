import Image from 'next/image';
import Link from 'next/link';

const categories = [
  {
    id: 1,
    name: 'Fashion',
    image: '/category-fashion.jpg',
    description: 'Affordable campus wear for all seasons',
    link: '/category/fashion',
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 2,
    name: 'Electronics',
    image: '/category-electronics.jpg',
    description: 'Laptops, tablets, and tech essentials',
    link: '/category/electronics',
    color: 'from-purple-400 to-purple-600',
  },
  {
    id: 3,
    name: 'Stationery',
    image: '/category-stationery.jpg',
    description: 'Notebooks, pens, and study materials',
    link: '/category/stationery',
    color: 'from-green-400 to-green-600',
  },
  {
    id: 4,
    name: 'Gadgets',
    image: '/category-gadgets.jpg',
    description: 'Smart devices for modern students',
    link: '/category/gadgets',
    color: 'from-orange-400 to-orange-600',
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-neutral-800 mb-3">
            Shop by Category
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Explore student essentials across our carefully curated categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={category.link}
              className="group overflow-hidden rounded-xl shadow-md transition-all hover:shadow-lg"
            >
              <div className="relative h-48 sm:h-60 overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-70`}></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-display font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase; 