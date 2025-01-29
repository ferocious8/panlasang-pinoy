import React from 'react';
import { useCart } from '../context/CartContext';

const Home = () => {
  const { addToCart } = useCart();

  const featuredDishes = [
    { 
      id: 1, 
      name: 'Chicken Adobo', 
      description: 'Classic Filipino dish with tender chicken in a savory soy-vinegar sauce', 
      price: 250, 
      image: '/images/adobo.jpg' 
    },
    { 
      id: 2, 
      name: 'Sinigang na Baboy', 
      description: 'Hearty pork soup with tamarind and vegetables', 
      price: 300, 
      image: '/images/sinigang.jpg' 
    },
    { 
      id: 3, 
      name: 'Lechon Kawali', 
      description: 'Crispy deep-fried pork belly served with liver sauce', 
      price: 350, 
      image: '/images/lechon.jpg' 
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-primary mb-8 text-center">
        Welcome to Panlasang Pinoy
      </h1>
      
      <section className="grid md:grid-cols-3 gap-6">
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
      </section>
    </div>
  );
};

export default Home;
