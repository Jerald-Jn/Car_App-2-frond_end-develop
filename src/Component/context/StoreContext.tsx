import { createContext, useEffect, useState } from 'react';
import { Order, type Cars } from '../../Interface/DataModel';
import { getListOfCars } from '../Api';

// 1. Create and export the context.
//    Provide a default value that matches the expected shape.
export const StoreContext = createContext<any>(null);

export const StoreContextProvider = (props: any) => {

  const [carsList, setCarsList] = useState<Cars[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [showService, setShowService] = useState(false);
  const [menu, setMenu] = useState(false);
  const [totals, setTotals] = useState({ subTotal: 0, tax: 0, shipping: 0, total: 0 });
  const[customer,setCustomer]=useState(Order)
  const [car, setCar] = useState<Cars[]>([]);
  

  const getTotal = async (tempTotal:any) => {
    const subTotal = tempTotal;
    const tax = tempTotal * 0.1;
    const shipping = tempTotal / 100;
    const total = subTotal + tax + shipping;
    setTotals((prev) => ({...prev, subTotal: subTotal, tax: tax, shipping: shipping, total: total }));
  };



  useEffect(() => {
    const fetchCars = async () => {
      try {
        const listOfCars = await getListOfCars();
        console.log(listOfCars)
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
    car,setCar
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};