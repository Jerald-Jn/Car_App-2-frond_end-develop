// Success.tsx
import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { clearCart, verifyPayment } from "../../Api";
import { StoreContext } from "../context/StoreContext";

export default function Success() {

  const {setCount,setLoading}=useContext(StoreContext);
  const location = useLocation();
  // const navigate=useNavigate();

  
  // Stripe might append ?payment_intent=pi_123&payment_intent_client_secret=...
  const query = new URLSearchParams(location.search);
  const paymentIntentId = query.get("payment_intent");
  
  useEffect(()=>{
    verify(); 
  },[])

  const verify=async()=>{
      const clientSecret=sessionStorage.getItem('clientSecret')
      if(!clientSecret) return;
      const response = await verifyPayment(clientSecret);
    if(response!==undefined){
      const res=clearCart();
      console.log(res);
      setCount(0);
      setLoading(false);
    }
    }
      

  return (
    <div className=" text-center h-[480px] p-10">
      <h1>Payment Successful 🎉</h1>
      <p>Your Payment Intent ID: {paymentIntentId}</p>
      <p>Thank you for your purchase!</p>
    </div>
  );
}
