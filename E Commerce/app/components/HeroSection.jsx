import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

const slides = [
  {
    id: 1,
    title: 'Budget Laptops for Students',
    description: 'Top-rated laptops under ₹40,000 with student discounts',
    image: '/hero-laptop.jpg',
    link: '/category/electronics/laptops',
    bgColor: 'bg-blue-100',
  },
  {
    id: 2,
    title: 'Campus Fashion Essentials',
    description: 'Trendy, comfortable, and affordable college wear',
    image: '/hero-fashion.jpg',
    link: '/category/fashion',
    bgColor: 'bg-orange-100',
  },
  {
    id: 3,
    title: 'Smart Study Gadgets',
    description: 'Boost your productivity with the latest study tools',
    image: '/hero-gadgets.jpg',
    link: '/category/gadgets',
    bgColor: 'bg-green-100',
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-16 overflow-hidden bg-neutral-50">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="relative">
          {/* Slides */}
          <div className="overflow-hidden rounded-2xl shadow-xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div className={`grid grid-cols-1 md:grid-cols-2 h-full ${slide.bgColor}`}>
                  {/* Text Content */}
                  <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-800 mb-4 animate-fade-in">
                      {slide.title}
                    </h1>
                    <p className="text-lg text-neutral-600 mb-8 animate-slide-up">
                      {slide.description}
                    </p>
                    <div>
                      <Link 
                        href={slide.link}
                        className="btn btn-primary inline-flex items-center"
                      >
                        <span>Explore Now</span>
                        <FiArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="relative h-64 md:h-full">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full focus:outline-none transition-colors ${
                  index === currentSlide ? 'bg-primary' : 'bg-neutral-300'
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 