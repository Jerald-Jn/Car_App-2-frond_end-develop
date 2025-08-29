import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { createPayment } from "../../Api";
import { StoreContext } from "../context/StoreContext";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC);

export default function PaymentPage() {
  
  const { totals, customer } = useContext(StoreContext);
  const [clientSecret,setClientSecret]=useState('')

  useEffect(() => {
    async function initPayment() {
      const response:any = await createPayment(customer);
      console.log('client secret -> ',response)
      setClientSecret(response)
    }
    initPayment();
  }, [totals.total]);

    const options = {
    clientSecret: clientSecret,
  };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}
