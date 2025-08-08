import { createContext, useEffect, useState } from 'react';
import type { Cars } from '../../Interface/DataModel';
import { getListOfCars } from '../Api';

// 1. Create and export the context.
//    Provide a default value that matches the expected shape.
export const CarContext = createContext<any>(null);

export const CarContextProvider = ( props:any ) => {
  const [carsList, setCarsList] = useState<Cars[]>([]);
  const [showProducts, setShowProducts] = useState(false);
  const [showService, setShowService] = useState(false);
  const [menu, setMenu] = useState(false);


  
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
    showProducts,setShowProducts,
    showService,setShowService,
    menu, setMenu
  };

  return (
    <CarContext.Provider value={contextValue}>
      {props.children}
    </CarContext.Provider>
  );
};