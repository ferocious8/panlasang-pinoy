import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51Qmbl84YP9quM57WXpdfJ2f5OSiRvrsMkWERlu6YhWKKO1hKQVz24p6F4xlhQmZ63aiC2hq05Hi6EKHvfmlEh30R004DcddJei');

const featuredDishes = [
  {
    name: 'Chicken Adobo',
    description: 'Classic Filipino dish with marinated meat in soy sauce and vinegar',
    price: 250,
    image: '/images/adobo.jpg'
  },
  {
    name: 'Sinigang na Baboy',
    description: 'Sour soup with pork, vegetables, and tamarind base',
    price: 280,
    image: '/images/sinigang.jpg'
  },
  {
    name: 'Lechon Kawali',
    description: 'Crispy deep-fried pork belly served with lechon sauce',
    price: 320,
    image: '/images/lechon-kawali.jpg'
  }
];

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
      // Handle error (e.g., display error message to user)
    } else {
      console.log('Payment Method Created:', paymentMethod);
      // Handle successful payment method creation (e.g., send to backend)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
}

const Home = () => {
  const { addToCart } = useCart();
  const [showPayment, setShowPayment] = useState(false);

  const handleCheckoutClick = () => {
    setShowPayment(true); // Show payment options when checkout button is clicked
  };

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

  return (
    <Elements stripe={stripePromise}>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-12 scroll-animate">Featured Dishes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredDishes.map((dish, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-xl scroll-animate"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-primary">{dish.name}</h3>
                    <p className="text-gray-600 mt-2">{dish.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xl font-bold text-secondary">₱{dish.price}</span>
                      <button 
                        className="btn-primary transform transition-transform duration-300 hover:scale-105"
                        onClick={() => addToCart(dish)}
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
        <section className="py-16 bg-menu-pattern text-white scroll-animate">
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
    </Elements>
  );
};

export default Home;
