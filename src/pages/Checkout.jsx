import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your_publishable_key');

const CheckoutForm = ({ totalAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { cart, clearCart } = useCart();
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    instructions: ''
  });

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (paymentMethod === 'card') {
      if (!stripe || !elements) {
        return;
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (error) {
        setError(error.message);
        setProcessing(false);
        return;
      }
    }

    try {
      // Create order
      await axios.post('/api/orders', {
        items: cart,
        totalAmount,
        paymentMethod,
        deliveryAddress
      });

      clearCart();
      navigate('/order-success');
    } catch (error) {
      setError('Error creating order. Please try again.');
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Delivery Address</h3>
        <div>
          <input
            type="text"
            name="street"
            placeholder="Street Address"
            value={deliveryAddress.street}
            onChange={handleAddressChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={deliveryAddress.city}
            onChange={handleAddressChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={deliveryAddress.postalCode}
            onChange={handleAddressChange}
            className="p-2 border rounded"
            required
          />
        </div>
        <textarea
          name="instructions"
          placeholder="Delivery Instructions (Optional)"
          value={deliveryAddress.instructions}
          onChange={handleAddressChange}
          className="w-full p-2 border rounded"
          rows="3"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Method</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Credit/Debit Card</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="space-y-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={processing || (!stripe && paymentMethod === 'card')}
        className="w-full btn-primary disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay ₱${totalAmount}`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/menu');
    }
  }, [cart, navigate]);

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.name} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>₱{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>₱{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Elements stripe={stripePromise}>
              <CheckoutForm totalAmount={totalAmount} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
