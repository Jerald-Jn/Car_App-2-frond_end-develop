import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { createPayment } from "../../Api";
import { StoreContext } from "../../store/StoreContext";
import CheckoutForm from "./CheckoutForm";
import Menubar from "../menu_bar/Menubar";
import Products from "../header/Products";
import PageLoading from "../pageload/PageLoading";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function PaymentPage() {

  const { customer, menu, showProducts, setMenu, load, pageLoad, setPageLoad  } = useContext(StoreContext);
  const [clientSecret, setClientSecret] = useState('');

  async function initPayment() {
    try {
      const response: any = await createPayment(customer);
      setClientSecret(response)
      setPageLoad(false)
    } catch (error) {
      setPageLoad(false)
    }
  }

  const options = {
    clientSecret: clientSecret,
  };

  useEffect(() => {
    setMenu(false)
    initPayment();
  }, [])

  return (
    <>
      {
        pageLoad ?<PageLoading />:
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
