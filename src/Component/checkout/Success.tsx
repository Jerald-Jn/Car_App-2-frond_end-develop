// Success.tsx
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { clearCart, verifyPayment } from "../../Api";

export default function Success() {
  const location = useLocation();
  const {clientSecret}=useContext(StoreContext);
  
  // Stripe might append ?payment_intent=pi_123&payment_intent_client_secret=...
  const query = new URLSearchParams(location.search);
  const paymentIntentId = query.get("payment_intent");

  useEffect(()=>{
    
    const verify=async()=>{
      const response = verifyPayment(clientSecret);
    console.log(response,clientSecret)
    if(response!=undefined){
      const res=clearCart();
      console.log(res);
    }
    }
    verify(); 
  },[clientSecret])

  return (
    <div className=" text-center h-[480px] p-10">
      <h1>Payment Successful 🎉</h1>
      <p>Your Payment Intent ID: {paymentIntentId}</p>
      <p>Thank you for your purchase!</p>
    </div>
  );
}
