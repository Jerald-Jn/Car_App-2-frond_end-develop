import axios from "axios";
import type { CartData } from "./Interface/DataModel";

const API="http://localhost:8080";

const loadToken=()=>{
    return localStorage.getItem('token')
}

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
    const response=(await axios.get(`${API}/cars/get/${model}`,{
        headers:{
            Authorization:loadToken()
        }
    })).data;
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
                Authorization:loadToken()
            }
        } )).data;
        console.log(response);
        localStorage.setItem('clientSecret',response);
        return response;
    } catch (error) {
        
    }
}

export const getUserCart=async()=>{
    try {
        const response= (await axios.get(`${API}/cart`,
            {headers:{
                Authorization:loadToken()
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
                Authorization:loadToken() 
            }
        })).data; 
        return response;
    } catch (error) {
        throw error;
    }
}

export const verifyPayment=async(clientSecret:any)=>{
    try {
        console.log(clientSecret)
        const response = (await axios.get(`${API}/payments/verify-payment/${clientSecret}`,{
            headers:{
                Authorization:loadToken()
            }
        })).data;
        console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
}

export const clearCart=async()=>{
    try {
        const response = (await axios.delete(`${API}/cart/clear-cart`,{
            headers:{
            Authorization:loadToken()
        }})).data
        console.log(response)
        return response;
    } catch (error) {
        throw error;
    }
}

export const userRegister=async(registerData:any)=>{
    try {
        const response=(await axios.post(`${API}/user/add`,registerData)).data;
        console.log(response,registerData);
        return response;
    } catch (error) {
        
    }
}

export const removeCart=async(carId:any)=>{
    const respone=(await (axios.delete(`${API}/cart/remove/${carId}`,{
        headers:{
            Authorization:loadToken()
        }
    }))).data
    console.log(respone);
    return respone;
}

export const deleteItemApi=async(carId:any)=>{
    const respone=(await (axios.delete(`${API}/cart/delete/${carId}`,{
        headers:{
            Authorization:loadToken()
        }
    }))).status;
    return respone;
}