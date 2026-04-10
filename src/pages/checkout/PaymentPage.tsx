import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { createPayment } from "../../Api";
import { StoreContext } from "../../store/StoreContext";
import CheckoutForm from "./CheckoutForm";
import { toast } from "react-toastify";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {

  const { customer, menu, showProducts, setMenu, load, setPageLoad, token } = useContext(StoreContext);
  const [clientSecret, setClientSecret] = useState('');

  async function initPayment() {
    try {
      const response: any = await createPayment(customer, token.current);
      setPageLoad(false);
      setClientSecret(response);
      if(response) {
        
        toast.success('Choose any Payemnt Method.')
      }
    } catch (error) {
      toast.warning('Payment Error');
    }
  }

  const options = {
    clientSecret: clientSecret,
  };

  useEffect(() => {
    setMenu(false);
    setPageLoad(true);
    initPayment();
  }, [])

  return (
    <>
      {
          <>
            <div className={`${showProducts | load | menu && 'blur-sm'}`}>
              {clientSecret &&
                // "Elements" used the stripe publishable key and what are the payment method option available
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              }
            </div>
          </>
      }
    </>
  );
}
