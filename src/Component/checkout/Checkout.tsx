import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Products from "../header/Products";
import Service from "../header/Service";
import Menubar from "../menu_bar/Menubar";
import { getUserCart } from "../../Api";

function Checkout() {

    const { showService, showProducts, menu, totals, customer, setCustomer, car, getTotal } = useContext(StoreContext);
    const navigate = useNavigate();

    function onChangeHandler(event: any) {
        const { name, value } = event.target;
        setCustomer((pre: any) => (
            {
                ...pre, [name]: value, 
                amount: totals.total,
            }));
    }

    function handleUserInfoChange(event: any) {
        const { name, value } = event.target;
        setCustomer((pre: any) => (
            {
                ...pre,
                    userInfo: {
                    ...pre.userInfo,
                    [name]: value
                }
            }));
    }


    function purchase() {
        if (customer) {
            console.log("customer -> ", customer)
            navigate('/paymentPage')
        }
    }

    useEffect(() => {
        console.log(car)
        const cartItems = async () => {
            const response = await getUserCart();
            getTotal(response.items);
        }
        cartItems();
    }, []);


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
                {/* When we hover on Service is render "Service" component */}
                {
                    showService && (<Service />)
                }

                {
                    true &&
                    <div className=" bg-gray-100 text-gray-900 flex justify-center">
                        <form onSubmit={(event) => { event.preventDefault(); purchase(); }}>
                            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                                <div className="w-3/5 p-6 -mt-2 h-fit sm:p-12">
                                    <div className="bg-white/50 p-5 rounded-lg shadow-md border-2">

                                        <h1 className="text-2xl font-bold text-gray-800   mb-3">Shipping Address</h1>

                                        <div className="mb-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="firstName" className="block text-gray-700   mb-1">First Name</label>
                                                    <input required name="firstName" type="text" id="firstName" className="w-full rounded-lg py-2 px-3  border-2" value={customer.firstName} onChange={onChangeHandler} />
                                                </div>
                                                <div>
                                                    <label htmlFor="lastName" className="block text-grlastNameay-700   mb-1">Last Name</label>
                                                    <input required name="lastName" type="text" id="lastName" className="w-full rounded-lg border py-2 px-3" value={customer.lastName} onChange={onChangeHandler} />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label htmlFor="phoneNo" className="block text-gray-700   mb-1">Phone No</label>
                                                    <input required name="phoneNo" type="text" id="phoneNo" className="w-full rounded-lg py-2 px-3  border-2" value={customer.phoneNo} onChange={handleUserInfoChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="email" className="block text-gray-700   mb-1">Email</label>
                                                    <input required name="email" type="email" id="email" className="w-full rounded-lg border py-2 px-3" value={customer.email} onChange={handleUserInfoChange} />
                                                </div>
                                            </div>
                                            <div className="mt-4">
                                                <label htmlFor="address" className="block text-gray-700   mb-1">Address</label>
                                                <textarea required name="address" id="address" className="w-full rounded-lg  py-2 px-3 border-2" value={customer.address} onChange={handleUserInfoChange} />
                                            </div>

                                            <div className="mt-4">
                                                <label htmlFor="city" className="block text-gray-700   mb-1">City</label>
                                                <input required name="city" type="text" id="city" className="w-full rounded-lg  py-2 px-3 border-2" value={customer.city} onChange={handleUserInfoChange} />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 mt-4">
                                                <div>
                                                    <label htmlFor="state" className="block text-gray-700   mb-1">State</label>
                                                    <input required name="state" type="text" id="state" className="w-full rounded-lg  py-2 px-3 border-2" value={customer.state} onChange={handleUserInfoChange} />
                                                </div>
                                                <div>
                                                    <label htmlFor="pincode" className="block text-gray-700   mb-1">ZIP Code</label>
                                                    <input required name="pincode" type="text" id="pincode" className="w-full rounded-lg  py-2 px-3 border-2" value={customer.pincode} onChange={handleUserInfoChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="flex-1 bg-red-200 text-center hidden lg:flex">
                                    <div className="m-12 xl:m-16 bg-contain bg-center bg-no-repeat">
                                        <h2 className="text-2xl font-bold text-gray-800 text-center">Checkout</h2>
                                        <p className="text-gray-500 text-center mt-1 text-lg">Complete your purchase</p>


                                        {/* <div className="mt-6 flex flex-row items-center space-x-4">
                                        <img src={car?.carLogo} alt={car?.model} className="w-20 h-20 rounded-lg shadow object-center" />
                                        <div className=" gap-5 items-center">
                                            <h3 className="text-lg font-semibold text-gray-800">{car?.model}-{car?.year}-Model</h3>
                                        </div>
                                    </div> */}

                                        <div className="mt-6 space-y-3">
                                            <div className="flex justify-between font-semibold">
                                                <span>Subtotal</span>
                                                <span>{totals.subTotal}</span>
                                            </div>
                                            <div className="flex justify-between font-semibold">
                                                <span>Shipping</span>
                                                <span className="">{totals.shipping}</span>
                                            </div>
                                            <div className="flex justify-between font-semibold">
                                                <span>Tax</span>
                                                <span className="">{totals.tax}</span>
                                            </div>
                                            <div className="flex justify-between font-semibold text-gray-800">
                                                <span>Total</span>
                                                <span>{totals.total}</span>
                                            </div>
                                        </div>
                                        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition duration-200">
                                            Complete Purchase
                                        </button>
                                        <p className="text-center text-gray-500 text-sm mt-4">🔒 Secure Payment. Your inhtmlFormation is encrypted.</p>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                }



            </div>
        </>
    )
}
export default Checkout;