import axios from "axios";
import type { CartData } from "./Interface/DataModel";

const API="http://localhost:8080";
let token=localStorage.getItem('token')

// Users Api
export const loginApi=async(userName:string,password:string)=>{
    const response=(await axios.post(`${API}/login?userName=${userName}&password=${password}`)).data;
    localStorage.setItem('token',"Bearer "+response)
    return response;
}

//Car Api
export const getListOfCars=async()=>{
    try {
        const response=await(await axios.get(`${API}/cars`)).data;
        return response;
    } catch (error) {
        console.error(error)
        throw error;
    } 
}
export const getCarByCarName=async(model:any)=>{
    try {
    const response=(await axios.get(`${API}/cars/get/${model}`)).data;
    return response;
} catch (error) {
    console.error(error)
    throw error;
}
}
export const getCarImage=async()=>{
    try {
        return(await axios.get(`${API}/cars/getImage/Glanza`)).data
    } catch (error) {
        throw error;
    }
};

export const createPayment=async(customerDetail:any)=>{
    try {
        const response= (await axios.post(`${API}/payments/create-payment`, customerDetail,{
            headers:{
                Authorization:token
            }
        } )).data;
        console.log(response);
        return response;
    } catch (error) {
        
    }
}

export const getUserCart=async()=>{
    try {
        const response= (await axios.get(`${API}/cart`,
            {headers:{
                Authorization:token
            }})).data;
            return response;
    } catch (error) {
        throw error;
    }
}

export const addCartApi=async(model:CartData)=>{
    try {
        console.log(model)
        const response=(await axios.post(`${API}/cart/create`,model,{
            headers:{ 
                Authorization:token 
            }
        })).data; 
        return response;
    } catch (error) {
        throw error;
    }
}