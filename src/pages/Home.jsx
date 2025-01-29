import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();

  const featuredDishes = [
    { 
      id: 1, 
      name: 'Chicken Adobo', 
      description: 'Classic Filipino dish with tender chicken in a savory soy-vinegar sauce', 
      price: 250, 
      image: '/panlasang-pinoy/images/adobo.jpg' 
    },
    { 
      id: 2, 
      name: 'Sinigang na Baboy', 
      description: 'Hearty pork soup with tamarind and vegetables', 
      price: 300, 
      image: '/panlasang-pinoy/images/sinigang.jpg' 
    },
    { 
      id: 3, 
      name: 'Lechon Kawali', 
      description: 'Crispy deep-fried pork belly served with liver sauce', 
      price: 350, 
      image: '/panlasang-pinoy/images/lechon-kawali.jpg' 
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative h-[600px] rounded-xl overflow-hidden bg-hero-pattern bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white space-y-6 px-4 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold">Authentic Filipino Cuisine</h1>
            <p className="text-xl md:text-2xl">Experience the taste of home-cooked Filipino dishes</p>
            <Link 
              to="/menu" 
              className="btn-primary inline-block mt-4 text-lg px-8 py-3 hover:scale-105"
            >
              View Our Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Dishes */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">Featured Dishes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDishes.map((dish) => (
              <div 
                key={dish.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all hover:scale-105"
              >
                <img 
                  src={dish.image} 
                  alt={dish.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-primary">{dish.name}</h2>
                  <p className="text-gray-600 mt-2">{dish.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-secondary">
                      ₱{dish.price}
                    </span>
                    <button 
                      onClick={() => addToCart(dish)} 
                      className="btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-menu-pattern text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-lg leading-relaxed">
              Welcome to Panlasang Pinoy, where we bring the authentic taste of Filipino home cooking to your table. 
              Our dishes are prepared with traditional recipes passed down through generations, using fresh, local ingredients 
              to create the perfect blend of flavors that Filipino cuisine is known for.
            </p>
            <Link 
              to="/menu" 
              className="btn-secondary inline-block mt-8 hover:scale-105 transform transition-transform duration-300"
            >
              Explore Our Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
