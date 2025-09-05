import { createContext, useEffect, useState } from 'react';
import { PaymentRequest, type Cars } from '../../Interface/DataModel';
import { getListOfCars } from '../../Api';

// Create and export the "React Context" global store, this context will be used by components to access global data
export const StoreContext = createContext<any>(null);


// Declare "Provider Component", it wraps the app and provides global state values to all children component via context
export const StoreContextProvider = (props: any) => {

// Declare "React State" variable and "Setter" function to update value and it's also update the "VIRTUAL DOM" 
  const [carsList, setCarsList] = useState<any[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [menu, setMenu] = useState(false);
  const [totals, setTotals] = useState({ subTotal: 0, tax: 0, shipping: 0, total: 0 });
  const[customer,setCustomer]=useState(PaymentRequest)
  const [car, setCar] = useState<Cars[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [load,setLoad]=useState(false)
  const [logouting,setLogouting]=useState(false);
  const [headerLoad,setHeaderLoad]=useState(false);
  const [footrLoad,setFooterLoad]=useState(false);
  const [pageLoad,setPageLoad]=useState(true);
  const [pathCheck,setPathCheck]=useState('')

  const getTotal = async (cartDetails:any) => {
    let tempTotal=0;
    let subTotal =0;
    for (let key in cartDetails) {
			let item=cartDetails[key];
			tempTotal=tempTotal+item.price*item.quantity;
			
		}
    subTotal =subTotal+ tempTotal;
    let tax = Math.ceil(tempTotal * 0.1);
    const shipping = Math.ceil(tempTotal / 100);
    const totals = Math.ceil(subTotal + tax + shipping);
    setTotals((prev) => ({...prev, subTotal: subTotal, tax: tax, shipping: shipping, total: totals }));
  };

// useEffect runs based on dependency []
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const listOfCars = await getListOfCars();
        console.log(listOfCars)
        console.log(listOfCars[0].images)
        setCarsList(listOfCars);
        setPageLoading(false); // stop loading after successful fetch
        setHeaderLoad(true);
        setFooterLoad(true)
      } catch (error) {
        setPageLoading(false); // stop loading even if failed
        console.error('Failed to fetch cars:', error);
      }
    };
    fetchCars();
  }, []);

// Single object contains all states variable and functions
// This will be provided globally so other components can use them with "useContext(StoreContext)"
  const contextValue = {
    carsList,
    showProducts, setShowProducts,
    menu, setMenu,
    getTotal, totals,setTotals,
    customer,setCustomer,
    car,setCar,
    count,setCount,
    loading,setLoading,
    pageLoading, setPageLoading,
    load,setLoad,
    logouting,setLogouting,
    headerLoad,setHeaderLoad,
    footrLoad,setFooterLoad,
    pageLoad,setPageLoad,
    pathCheck,setPathCheck
  };

// "props.children" means anything inside this provider will hava accesss the "contextValue"
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};