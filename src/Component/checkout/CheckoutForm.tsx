import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);


  async function handleSubmit(event:any) {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:5173/payment-success",
      },
    });

    if (error) {
      console.error(error.message);
    }
    setLoading(false);

    
  }

  return (
    <form onSubmit={handleSubmit} className="h-full w-3/4 md:w-2/5 mx-auto flex flex-col rounded-2xl justify-center p-10 bg-slate-400/50 my-10">
      <PaymentElement  />
      <button disabled={!stripe || loading} className="bg-blue-500 hover:bg-red-500/50 text-white px-4 py-2 rounded mt-4">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}
