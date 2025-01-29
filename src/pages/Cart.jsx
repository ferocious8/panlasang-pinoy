import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const deliveryFee = 50;

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

  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  const handleUpdateQuantity = (item, newQuantity) => {
    updateQuantity(item.name, newQuantity);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-primary scroll-animate">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl shadow-lg scroll-animate">
          <p className="text-gray-600 text-xl">Your cart is empty</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Cart Items */}
          <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 scroll-animate">
            {items.map((item) => (
              <div 
                key={item.name} 
                className="flex items-center justify-between border-b pb-6 last:border-b-0 last:pb-0 transform transition-all duration-300 hover:scale-102"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110" 
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-primary">{item.name}</h3>
                    <p className="text-gray-600">₱{item.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <button 
                      className="btn-secondary px-3 py-1 rounded-lg transition-transform duration-300 hover:scale-110"
                      onClick={() => handleUpdateQuantity(item, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                    <button 
                      className="btn-secondary px-3 py-1 rounded-lg transition-transform duration-300 hover:scale-110"
                      onClick={() => handleUpdateQuantity(item, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button 
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    onClick={() => removeFromCart(item)}
                  >
                    <TrashIcon className="h-6 w-6 transform transition-transform duration-300 hover:scale-110" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-6 scroll-animate">
            <h2 className="text-2xl font-semibold mb-6 text-primary">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₱{subtotal}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">₱{deliveryFee}</span>
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between text-xl font-semibold">
                  <span className="text-primary">Total</span>
                  <span className="text-primary">₱{total}</span>
                </div>
              </div>
            </div>
            <button className="btn-primary w-full mt-8 text-lg py-4 transform transition-transform duration-300 hover:scale-102">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
