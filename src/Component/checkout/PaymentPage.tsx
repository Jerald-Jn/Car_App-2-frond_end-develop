import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { createPayment } from "../../Api";
import { StoreContext } from "../context/StoreContext";
import CheckoutForm from "./CheckoutForm";
import Menubar from "../menu_bar/Menubar";
import Products from "../header/Products";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {

  const { totals, customer, menu, showProducts, setMenu, load, setPageLoad, setHeaderLoad, setFooterLoad } = useContext(StoreContext);
  const [clientSecret, setClientSecret] = useState('')

  // useEffect(() => {
  //   initPayment();
  // }, [totals.total]);

  async function initPayment() {
    try {
      const response: any = await createPayment(customer);
      console.log('client secret -> ', response)
      setClientSecret(response)
      setPageLoad(false)
      setHeaderLoad(true)
      setFooterLoad(true)
    } catch (error) {
      setPageLoad(false)
      setHeaderLoad(false)
      setFooterLoad(false)
    }

  }

  const options = {
    clientSecret: clientSecret,
  };

  useEffect(() => {
    setHeaderLoad(false)
    setFooterLoad(false)
    setMenu(false)
    initPayment();
  }, [])

  return (
    <>
      
            <div className="relative">
              {menu && (
                <Menubar />
              )
              }
              {/* When we hover on Product is render "Products" component */}
              {
                showProducts && (<Products />)
              }
            </div>
            <div className={`${showProducts | load | menu && 'blur-sm'}`}>
              {clientSecret &&
                // "Elements" used the stripe publishable key and what are the payment method option available
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
                </Elements>
              }
            </div>

    </>
  );
}
