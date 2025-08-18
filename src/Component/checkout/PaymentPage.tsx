import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { createPayment } from "../../Api";
import { StoreContext } from "../context/StoreContext";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe("pk_test_51RvD1GBhApNxar7JthXCqUYG2p6SCSFQtmmzTox2eVubm0Ef5KqDJ0Roe6O2JJA0mvb1ge1WPY1f1f31ULmgJWXN00K5VsxePb");

export default function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");
  const { totals, customer } = useContext(StoreContext);

  useEffect(() => {
    async function initPayment() {

      console.log('customerDetail -> ',customer)
      

      const secret = await createPayment(customer);
      console.log('client secret -> ',secret.clientSecret)
      
      setClientSecret(secret.clientSecret);
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
