// Success.tsx
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearCart, verifyPayment } from "../../Api";
import { StoreContext } from "../context/StoreContext";
import Menubar from "../menu_bar/Menubar";
import Products from "../header/Products";

export default function Success() {

  // destructure the StoreContext variable
  const { setCount, setLoading, menu, showProducts, setMenu, load, pageLoad, setPageLoad, setHeaderLoad, setFooterLoad } = useContext(StoreContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentResponse, setPaymentResponse] = useState({
    amount: '',
    status: '',
    receiptURL: '',
    id: ''
  })


  // Stripe API ?payment_intent=pi_123&payment_intent_client_secret=...
  // It means the currrent API to get query data  
  const query = new URLSearchParams(location.search);
  const paymentIntentId = query.get("payment_intent");

  useEffect(() => {
    setPageLoad(true)
    setHeaderLoad(false)
    setFooterLoad(false)
    setMenu(false)
    verify();
  }, [])

  const verify = async () => {
    if (!paymentIntentId) return;
    const response: any = await verifyPayment(paymentIntentId);
    if (response !== undefined) {
      setPaymentResponse(response)
      const res = clearCart();
      console.log(res);
      setCount(0);
      setLoading(false);
      setPageLoad(false)
      setHeaderLoad(true)
      setFooterLoad(true)
    }
  }


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
          </div>
          :
          paymentResponse.status=='succeeded'?
          <>
            <div className="relative -translate-y-[1.9rem] z-10">
              {menu && (
                <Menubar />
              )
              }
              {/* When we hover on Product is render "Products" component */}
              {
                showProducts && (<Products />)
              }
            </div>
            <div className={`min-h-full flex items-center justify-center px-4 my-8 bg-white/20 ${showProducts | load | menu && 'blur-sm'}`}>
              <div className=" bg-opacity-10 border border-white/10 border-opacity-20 rounded-3xl p-8 md:p-6 max-w-md w-full text-center shadow-2xl">
                {/* <!-- Success Icon --> */}
                <div className="bounce-in mb-2">
                  <div className="w-24 h-24 mx-auto bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-12 h-12 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                </div>

                {/* <!-- Success Message --> */}
                <div className="slide-up mb-5" style={{ animationDelay: "0.2s" }}>
                  <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
                    {paymentResponse.status}!
                  </h1>
                  <p className="text-xl text-black text-opacity-90 mb-2">
                    Payment Completed
                  </p>
                  <p className="text-black text-opacity-70">
                    Your transaction has been processed successfully
                  </p>
                </div>

                {/* <!-- Payment Details --> */}
                <div
                  className="bg-green-600 bg-opacity-10 rounded-2xl p-3 mb-5 border border-white border-opacity-10"
                  style={{ animationDelay: "0.4s" }}
                >
                  <div className="flex md:flex-row flex-col justify-between items-center mb-2">
                    <span className="text-black text-sm md:text-lg text-opacity-90">Amount</span>
                    <span className="text-2xl font-bold text-black">{paymentResponse.amount}</span>
                  </div>
                  <div className="flex md:flex-row flex-col justify-between items-center mb-2 ">
                    <span className="text-black text-opacity-90 text-sm md:text-lg">Transaction ID</span>
                    <span className="text-black font-mono text-sm overflow-hidden">{paymentResponse.id}</span>
                  </div>
                </div>

                {/* <!-- Action Buttons --> */}
                <div className="space-y-4" style={{ animationDelay: "0.6s" }}>
                  <button className="w-full bg-green-300 text-purple-600 font-semibold py-2 rounded-2xl hover:bg-opacity-90 transition-all hover:bg-green-200
      duration-300 transform hover:scale-105 shadow-lg">
                    <a href={paymentResponse.receiptURL} target="_blank">View Receipt</a>
                  </button>
                  <button className="w-full bg-transparent border-2 border-opacity-30 text-black font-semibold py-2 rounded-2xl bg-red-400
      hover:bg-red-200 transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate('/explore')}>
                    Continue Shopping
                  </button>
                </div>

                {/* <!-- Footer Message --> */}
                <div
                  className="slide-up mt-3 text-black text-opacity-60 text-sm"
                  style={{ animationDelay: "0.8s" }}
                >
                  <p>Thank you for your purchase!</p>
                  <p>A confirmation email has been sent to your inbox.</p>
                </div>
              </div>
            </div>
          </>:(<h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>404 Not Found</h1>)
      }


    </>

  );
}
