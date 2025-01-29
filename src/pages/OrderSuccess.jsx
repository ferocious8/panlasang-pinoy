import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-primary">Order Successful!</h2>
          <p className="mt-2 text-gray-600">
            Thank you for your order. We'll start preparing your delicious food right away!
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500 text-center">
            You will receive an email confirmation with your order details shortly.
          </p>
          
          <div className="flex flex-col space-y-4">
            <Link
              to="/menu"
              className="btn-primary text-center"
            >
              Order More Food
            </Link>
            
            <Link
              to="/profile/orders"
              className="btn-secondary text-center"
            >
              View Order Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
