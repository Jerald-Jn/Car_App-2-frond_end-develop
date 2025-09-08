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

  const { customer, menu, showProducts, setMenu, load, pageLoad, setPageLoad, setHeaderLoad, setFooterLoad } = useContext(StoreContext);
  const [clientSecret, setClientSecret] = useState('');

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
      {
        pageLoad ?
          <div id="loading-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60">

            <svg className="animate-spin h-8 w-8 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
              </path>
            </svg>

            <span className="text-white text-3xl font-bold">Loading...</span>

          </div> :
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
      }



    </>
  );
}
