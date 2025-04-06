import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    college: 'Delhi University',
    image: '/student1.jpg',
    rating: 5,
    text: 'I saved almost ₹4000 on my laptop by comparing prices through StudentBuy. The site made it super easy to find the best deals across different e-commerce platforms.',
    product: 'HP Pavilion Laptop',
  },
  {
    id: 2,
    name: 'Priya Patel',
    college: 'Amity University',
    image: '/student2.jpg',
    rating: 4,
    text: 'As a fashion design student, I need quality supplies on a budget. StudentBuy helped me find the best deals on art supplies and a graphics tablet. Highly recommend!',
    product: 'Wacom Drawing Tablet',
  },
  {
    id: 3,
    name: 'Ayush Singh',
    college: 'IIT Bombay',
    image: '/student3.jpg',
    rating: 5,
    text: 'The comparison feature is genius! I could easily see which site had the best price for my engineering textbooks. Plus, the additional student discounts saved me even more.',
    product: 'Engineering Textbooks',
  },
  {
    id: 4,
    name: 'Nisha Reddy',
    college: 'Christ University',
    image: '/student4.jpg',
    rating: 4,
    text: 'The campus ambassador program is amazing! I get to earn while helping fellow students find the best deals on products. The affiliate system is really transparent too.',
    product: 'Bluetooth Earbuds',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-bold text-neutral-800 mb-3">
            Student Stories
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Hear from fellow students who saved money and found great products using StudentBuy
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-neutral-50 rounded-lg shadow-md p-6 md:p-8">
                    <div className="flex items-start mb-6">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-neutral-600">{testimonial.college}</p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < testimonial.rating ? 'text-yellow-400' : 'text-neutral-300'} 
                              size={14} 
                            />
                          ))}
                        </div>
                      </div>
                      <FaQuoteLeft className="ml-auto text-primary opacity-20" size={36} />
                    </div>
                    <p className="text-neutral-700 mb-4 italic">"{testimonial.text}"</p>
                    <p className="text-xs text-neutral-500">Purchased: <span className="font-medium">{testimonial.product}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-primary' : 'bg-neutral-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 