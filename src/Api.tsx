import axios from "axios";
import type { CartData } from "./Interface/DataModel";

const API = import.meta.env.VITE_API_URL;

// const getToken = () => {
//     let jwt = sessionStorage.getItem('token');
//     return jwt ? `Bearer ${jwt}` : ''
// }

/************************ USER API *************************************/
// Login Api
export const loginApi = async (userName: string, password: string) => {
    const response = (await axios.post(`${API}/login`, {
        userName,
        password
    })).data;
    return response;
}

// User Register API
export const userRegister = async (registerData: any) => {
    const response = (await axios.post(`${API}/user/add`, registerData)).data;
    return response;
}

/*************************** CAR API  **********************************/
//Get All Cars API
export const getListOfCars = async () => {
    const response = (await axios.get(`${API}/cars`)).data;
    return response;
}

// Add Car API
export const addCar_Api = async (formData: FormData, token:string) => {
    try {
        return (await axios.post(`${API}/admin/car/add`, formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        )).data;
    } catch (error) {
        console.error('addCar_Api Error ', error);
    }
}

// Get Car API 
export const getCarByCarName = async (model: any) => {
    const response = (await axios.get(`${API}/cars/get/${model}`)).data;
    return response;
}

/************************* CART API ***************************************/
// Get User Cart API
export const getUserCart = async (token:string) => {
    const response = (await axios.get(`${API}/cart`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })).data;
    return response;
}

//************************* Add Cart API
export const addCartApi = async (model: CartData, token: string) => {
    const response = (await axios.post(`${API}/cart/create`, model, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })).data;
    return response;

}

//************************* Clear Cart API
export const clearCart = async ( token:string) => {
        const response = (await axios.delete(`${API}/cart/clear-cart`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )).data
        return response;
}

//************************* Remove Cart API
export const removeCart = async (carId: any,  token:string) => {
        const respone = (await axios.delete(`${API}/cart/remove/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        )).data
        return respone;
}

//************************* Delete Item in Cart API
export const deleteItemApi = async (carId: any, token:string) => {
        const respone = (await axios.delete(`${API}/cart/delete/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        )).status;
        return respone;
}

//************************* Increase Item in Cart API
export const IncreaseItemApi = async (carId: any, token:string) => {
        const respone = (await axios.get(`${API}/cart/increase/${carId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })).data;
        return respone;
}

/********************** PAYMENT API ******************************************/
// Create Payment API
export const createPayment = async (customerDetail: any, token:string) => {
        const response = (await axios.post(`${API}/payments/create-payment`, customerDetail, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })).data;
        return response;
}

//************************* Verfify Payment API
export const verifyPayment = async (clientSecret: any, token:string) => {
        const response = (await axios.get(`${API}/payments/verify-payment/${clientSecret}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })).data;
        return response;
}

//************************* Get User All Payments API
export const loadPayment = async (token:string) => {
        const respone = (await axios.get(`${API}/payments`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )).data;
        return respone;
}