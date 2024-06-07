
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from './CheckOutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const amount = queryParams.get('amount');

    return (
        <div>
            <h1>Payment Page</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm amount={amount} />
            </Elements>
        </div>
    );
};

export default Payment;
