import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';

const menuItems = [
  {
    name: 'Chicken Adobo',
    category: 'Main Dishes',
    price: 250,
    description: 'Chicken marinated in vinegar, soy sauce, and garlic',
    image: '/images/adobo.jpg'
  },
  {
    name: 'Sinigang na Baboy',
    category: 'Soups',
    price: 280,
    description: 'Pork in sour tamarind soup with vegetables',
    image: '/images/sinigang.jpg'
  },
  {
    name: 'Lechon Kawali',
    category: 'Main Dishes',
    price: 320,
    description: 'Crispy deep-fried pork belly served with lechon sauce',
    image: '/images/lechon-kawali.jpg'
  },
  {
    name: 'Pancit Bihon',
    category: 'Main Dishes',
    price: 220,
    description: 'Stir-fried rice noodles with vegetables and meat',
    image: '/images/pancit.jpg'
  },
  {
    name: 'Halo-Halo',
    category: 'Desserts',
    price: 150,
    description: 'Mixed sweet beans, fruits, and shaved ice with ube ice cream',
    image: '/images/halo-halo.jpg'
  },
  {
    name: 'Puto Bumbong',
    category: 'Desserts',
    price: 120,
    description: 'Purple rice cake steamed in bamboo tubes, served with butter, grated coconut, and muscovado sugar',
    image: '/images/puto-bumbong.jpg'
  },
  {
    name: 'Buko Pandan',
    category: 'Desserts',
    price: 130,
    description: 'Young coconut strips and pandan-flavored gelatin in sweet cream, a refreshing Filipino dessert',
    image: '/images/buko-pandan.jpg'
  },
  {
    name: 'Leche Flan',
    category: 'Desserts',
    price: 100,
    description: 'Smooth and creamy Filipino-style caramel custard made with egg yolks and milk',
    image: '/images/leche-flan.jpg'
  },
  {
    name: 'Bulalo',
    category: 'Soups',
    price: 380,
    description: 'Beef marrow soup with vegetables',
    image: '/images/bulalo.jpg'
  },
  {
    name: 'Water',
    category: 'Beverages',
    price: 25,
    description: 'Refreshing mineral water',
    image: '/images/water.jpg'
  },
  {
    name: 'Coke',
    category: 'Beverages',
    price: 45,
    description: 'Classic Coca-Cola soft drink',
    image: '/images/coke.jpg'
  },
  {
    name: 'Mountain Dew',
    category: 'Beverages',
    price: 45,
    description: 'Citrus-flavored carbonated soft drink',
    image: '/images/mountain-dew.jpg'
  },
  {
    name: 'Sprite',
    category: 'Beverages',
    price: 45,
    description: 'Lemon-lime flavored soft drink',
    image: '/images/sprite.jpg'
  }
];

const Menu = () => {
  const categories = ['All', 'Main Dishes', 'Soups', 'Desserts', 'Beverages'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [activeCategory]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-animate').forEach(element => {
      element.classList.add('opacity-0', 'translate-y-10');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const filteredItems = activeCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="bg-background min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold text-center text-primary mb-12 scroll-animate">Our Menu</h1>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 scroll-animate">
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-3 rounded-full text-lg transition-all duration-300 transform ${
                activeCategory === category
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'bg-white text-primary hover:bg-primary-light hover:text-white hover:scale-105'
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div 
              key={item.name} 
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 scroll-animate ${
                isLoading ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0 hover:shadow-xl hover:scale-105'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
            >
              <div className="relative h-64 overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full transition-transform duration-700 group-hover:scale-110 ${
                    item.category === 'Beverages' ? 'object-contain bg-white' : 'object-cover'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-primary mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-secondary">₱{item.price}</span>
                  <button 
                    onClick={() => handleAddToCart(item)}
                    className="btn-primary transform transition-transform duration-300 hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
