import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoreContext"
import { loadPayment } from "../../Api";
import { useNavigate } from "react-router-dom";
import Menubar from "../menu_bar/Menubar";
import Products from "../header/Products";

export function Payment() {

    const { load, setHeaderLoad, setFooterLoad, setPageLoad, pageLoad, menu, showProducts } = useContext(StoreContext);
    const [payments, setPayments] = useState<any>()
    const navigate = useNavigate();
    const [filterPayments, setfilterpayments] = useState<any>()

    useEffect(() => {
        setPageLoad(true);
        setHeaderLoad(false);
        setFooterLoad(false);
        loadUserPayment();
    }, [])

    useEffect(() => {
        setPageLoad(true);
        setHeaderLoad(false);
        setFooterLoad(false);
        loadUserPayment();
    }, [navigate])

    const loadUserPayment = async () => {
        try {
            const response = await loadPayment();
            console.log(response.paymentDetailsMap)
            const updatePayments = Object.values(response.paymentDetailsMap).map((value: any) => {
                return {
                    ...payments,
                    'amount': value.amount,
                    'id': value.id,
                    'status': value.status,
                    'receiptURL': value.receiptURL,
                    'paymentMethod': value.paymentMethod
                }
            })
            setPayments(updatePayments)
            setPageLoad(false);
            setHeaderLoad(true);
            setFooterLoad(true);
            setfilterpayments(updatePayments)
        } catch (error) {
            setPageLoad(false);
            setHeaderLoad(true);
            setFooterLoad(true);
        }
    }

    const paymentsFilter = (event: any) => {
        const { value } = event.target
        const filters = Object.values(payments).filter((values: any) => {
            let newStatus = value == '' || values.status == value
            return newStatus;
        });
        setfilterpayments(filters)
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

                    </div> :
                    payments != undefined ?
                        <>
                            <div className="relative -translate-y-5 z-10">
                                {/* Menu bar for small screen */}
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
                                <div className="flex mt-5 justify-center items-center flex-row gap-3">
                                    <select id="status" name="status" onChange={() => paymentsFilter(event)}
                                        className="w-[8rem] h-10 border-2 dark:bg-black/10 dark:text-white focus:outline-none focus:border-black text-black rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
                                        <option className="dark:text-black" value="">All</option>
                                        <option className="dark:text-black" value="succeeded">Succeessed</option>
                                        <option className="dark:text-black" value="requires_payment_method">Failed</option>
                                    </select>
                                </div>
                                {
                                    filterPayments?.length > 0 &&
                                    <div className={`shadow-lg rounded-lg overflow-hidden my-10 md:mx-10 mx-2 overflow-y-auto max-h-[500px]`}>
                                        <table className="w-full border-2" >
                                            <thead>
                                                <tr className="bg-gray-100 dark:bg-white/10 dark:text-white text-gray-600">
                                                    <th className="md:w-1/4 w-10 py-4 md:px-6 px-1 text-sm md:text-base text-left font-bold uppercase">No</th>
                                                    <th className="md:block hidden w-1/4 py-4 px-6 text-left font-bold uppercase">Payment Id</th>
                                                    <th className="md:w-1/4 w-10 py-4 md:px-6 px-1 text-sm md:text-base text-left  font-bold uppercase">Amount</th>
                                                    <th className="md:w-1/4 w-10 py-4 md:px-6 px-1 text-sm md:text-base text-left  font-bold uppercase">Type</th>
                                                    <th className="md:w-1/4 w-10 py-4 md:px-6 px-1 text-sm md:text-base text-left  font-bold uppercase">Status</th>
                                                    <th className="md:w-1/4 w-10 py-4 md:px-6 px-1 text-sm md:text-base text-left  font-bold uppercase">Receipt</th>
                                                </tr>
                                            </thead>

                                            <tbody className="bg-white dark:bg-white/40 dark:text-white ">
                                                {
                                                    filterPayments.map((value: any, index: any) => {
                                                        return (
                                                            <tr key={value.id} className="text-black ml-8 border-2">
                                                                <td className="py-4 md:px-6 px-2 text-sm md:text-base border-gray-200">{index + 1}</td>
                                                                <td className="md:block hidden py-4 px-6 border-gray-200">{value.id}</td>
                                                                <td className="py-4 md:px-6 px-1 text-sm md:text-base border-gray-200">{value.amount}</td>
                                                                <td className="py-4 md:px-6 px-1 text-sm md:text-base border-gray-200">{!value.paymentMethod ? '-' : value.paymentMethod}</td>
                                                                <td className="py-4 md:px-6 px-1 text-sm md:text-base border-gray-200">{value.status == "succeeded" ? 'Succeeded' : 'Failed'}</td>
                                                                <td className="py-4 md:px-6 px-1 text-sm md:text-base border-gray-200">
                                                                    {value.receiptURL ?
                                                                        <button className="bg-green-500 text-white py-1 md:px-2 px-1 text-sm md:text-base md:rounded-full rounded-md hover:bg-green-300 hover:text-black">
                                                                            <a href={value.receiptURL} target="_blank" rel="noopener noreferrer">View</a>
                                                                        </button> : <span className="">-</span>
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                }
                            </div>

                        </>
                        : payments == undefined ?
                            <h1 className="h-80 text-center text-5xl font-semibold mt-5">No payments Fount</h1>
                            : (<h1 className='translate-y-52 tracking-wide text-center font-bold text-4xl'>404 Not Found</h1>)
            }

        </>
    )
}