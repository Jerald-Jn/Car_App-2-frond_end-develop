import axios from "axios";

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
        const response= (await axios.post(`${API}/payments/create-payment`, customerDetail )).data;
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

export const addCart=async(model:any)=>{
    try {
        console.log(model)
        const response=(await axios.post(`${API}/cart/create`,{model},{headers:{ Authorization:'Bearer eyJhbGciOiJFUzM4NCJ9.eyJzdWIiOiJSYWplc2ggTmFpciIsImlhdCI6MTc1NTQ3NzY2OSwiZXhwIjoxNzU4MTMzODAwfQ.suEECQeHNuJKpfJa6a8fuZRtAAiKHnOdoEcgsPtysXX3EMQLL_W8W3oQ1bXWHp6gTNRL-I6urnsGaKMVYe5LTqv2X8kx87exOMYttPLCE52umhgHT24lg4DhqLw8C-31' }})).data; 
        return response;
    } catch (error) {
        throw error;
    }
}