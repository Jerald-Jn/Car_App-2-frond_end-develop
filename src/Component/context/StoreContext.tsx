import { createContext, useEffect, useState } from 'react';
import { PaymentRequest, type Cars } from '../../Interface/DataModel';
import { getListOfCars } from '../../Api';

// 1. Create and export the context.
//    Provide a default value that matches the expected shape.
export const StoreContext = createContext<any>(null);

export const StoreContextProvider = (props: any) => {

  const [carsList, setCarsList] = useState<any[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [showService, setShowService] = useState(false);
  const [menu, setMenu] = useState(false);
  const [totals, setTotals] = useState({ subTotal: 0, tax: 0, shipping: 0, total: 0 });
  const[customer,setCustomer]=useState(PaymentRequest)
  const [car, setCar] = useState<Cars[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  

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



  useEffect(() => {
    const fetchCars = async () => {
      try {
        const listOfCars = await getListOfCars();
        console.log(listOfCars)
        console.log(listOfCars[0].images)
        setCarsList(listOfCars);
      } catch (error) {
        console.error('Failed to fetch cars:', error);
      }
    };
    fetchCars();
  }, []);

  const contextValue = {
    carsList,
    showProducts, setShowProducts,
    showService, setShowService,
    menu, setMenu,
    getTotal, totals,setTotals,
    customer,setCustomer,
    car,setCar,
    count,setCount,
    loading,setLoading
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};