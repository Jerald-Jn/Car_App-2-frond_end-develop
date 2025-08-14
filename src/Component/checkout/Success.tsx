// Success.tsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  
  // Stripe might append ?payment_intent=pi_123&payment_intent_client_secret=...
  const query = new URLSearchParams(location.search);
  const paymentIntentId = query.get("payment_intent");
  const navigate=useNavigate();

  useEffect(()=>{
    setTimeout(() => {
        navigate('/')
    }, 5000);
  })

  return (
    <div className=" text-center h-[480px] p-10">
      <h1>Payment Successful 🎉</h1>
      <p>Your Payment Intent ID: {paymentIntentId}</p>
      <p>Thank you for your purchase!</p>
    </div>
  );
}
