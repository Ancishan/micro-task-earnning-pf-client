
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosPublic from '../useAxiosPublic';

const CheckOutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: 'test@example.com',
        },
      });

      if (error) {
        console.error('Stripe error:', error);
        alert(`Stripe error: ${error.message}`);
        return;
      }

      const { id } = paymentMethod;

      const response = await axiosPublic.post('/payment', {
        amount,
        id,
      });

      if (response.data.success) {
        alert('Payment successful');
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={!stripe}>
        Pay ${amount}
      </button>
    </form>
  );
};

export default CheckOutForm;
