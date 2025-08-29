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
        return_url: "https://carseller01.netlify.app/payment-success",
      },
    });

    if (error) {
      console.error(error.message);
    }
    setLoading(false);

    
  }

  return (
    <>
    <div className="flex flex-col items-center gap-2">
        <h6 className="text-blue-500 uppercase">Test to use</h6>
        <p className="uppercase font-bold text-base"> Card number - <span className="text-red-500">4242 4242 4242 4242</span></p>
        <p className="uppercase font-bold text-base">MM/YY - <span className="text-red-500">{`MM/YY>${new Date().getFullYear()}`}</span></p>
        <p className="uppercase font-bold text-base">CVC - <span className="text-red-500">123</span></p>
      </div>
    <form onSubmit={handleSubmit} className="h-full w-3/4 md:w-2/5 mx-auto flex flex-col rounded-2xl justify-center p-10 bg-slate-400/50 my-10">
      
      <PaymentElement  />
      <button disabled={!stripe || loading} className="bg-blue-500 hover:bg-red-500/50 text-white px-4 py-2 rounded mt-4">
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
    </>
  );
}
