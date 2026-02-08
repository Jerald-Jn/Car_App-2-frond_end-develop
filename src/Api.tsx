import axios from "axios";
import type { CartData } from "./Interface/DataModel";

const API = import.meta.env.VITE_API_URL;

const getToken = () => {
    let jwt = localStorage.getItem('token');
    return jwt ? `Bearer ${jwt}` : ''
}

/************************ USER API *************************************/
// Login Api
export const loginApi = async (userName: string, password: string) => {
    try {
        const response = (await axios.post(`${API}/login?userName=${userName}&password=${password}`)).data;
        localStorage.setItem('token', response)
        return response;
    } catch (error) {
        console.error('loginApi Error ', error);
    }
}

// User Register API
export const userRegister = async (registerData: any) => {
    try {
        const response = (await axios.post(`${API}/user/add`, registerData)).data;
        return response;
    } catch (error) {
        console.error('userRegister Error ', error);
    }
}

/*************************** CAR API  **********************************/
//Get All Cars API
export const getListOfCars = async () => {
    try {
        const response = (await axios.get(`${API}/cars`)).data;
        return response;
    } catch (error) {
        console.error('getListOfCars Error ', error);
    }
}

// Add Car API
export const addCar_Api = async (formData: FormData) => {
    try {
        return (await axios.post(`${API}/admin/car/add`, formData,
            {
                headers: {
                    Authorization: getToken(),
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
    try {
        const response = (await axios.get(`${API}/cars/get/${model}`)).data;
        return response;
    } catch (error) {
        console.error('getCarByCarName Error ', error);
    }
}

/************************* CART API ***************************************/
// Get User Cart API
export const getUserCart = async () => {
    try {
        const response = (await axios.get(`${API}/cart`,
            {
                headers: {
                    Authorization: getToken()
                }
            })).data;
        return response;
    } catch (error) {
        console.error('getUserCart Error ', error);
    }
}

// Add Cart API
export const addCartApi = async (model: CartData) => {
    try {
        const response = (await axios.post(`${API}/cart/create`, model, {
            headers: {
                Authorization: getToken()
            }
        })).data;
        return response;
    } catch (error) {
        console.error('addCartApi Error ', error);
    }
}

// Clear Cart API
export const clearCart = async () => {
    try {
        const response = (await axios.delete(`${API}/cart/clear-cart`, {
            headers: {
                Authorization: getToken()
            }
        }
        )).data
        return response;
    } catch (error) {
        console.error('clearCart Error ', error);
    }
}

// Remove Cart API
export const removeCart = async (carId: any) => {
    try {
        const respone = (await axios.delete(`${API}/cart/remove/${carId}`, {
            headers: {
                Authorization: getToken()
            }
        }
        )).data
        return respone;
    } catch (error) {
        console.error('removeCart Error ', error);
    }
}

// Delete Item in Cart API
export const deleteItemApi = async (carId: any) => {
    try {
        const respone = (await axios.delete(`${API}/cart/delete/${carId}`, {
            headers: {
                Authorization: getToken()
            }
        }
        )).status;
        return respone;
    } catch (error) {
        console.error('deleteItemApi Error ', error);
    }
}

// Increase Item in Cart API
export const IncreaseItemApi = async (carId: any) => {
    try {
        const respone = (await axios.get(`${API}/cart/increase/${carId}`, {
            headers: {
                Authorization: getToken()
            }
        })).data;
        return respone;
    } catch (error) {
        console.error('IncreaseItemApi Error ', error);
    }
}

/********************** PAYMENT API ******************************************/
// Create Payment API
export const createPayment = async (customerDetail: any) => {
    try {
        const response = (await axios.post(`${API}/payments/create-payment`, customerDetail, {
            headers: {
                Authorization: getToken()
            }
        })).data;
        localStorage.setItem('clientSecret', response);
        return response;
    } catch (error) {
        console.error('createPayment Error ', error);
    }
}

// Verfify Payment API
export const verifyPayment = async (clientSecret: any) => {
    try {
        const response = (await axios.get(`${API}/payments/verify-payment/${clientSecret}`, {
            headers: {
                Authorization: getToken()
            }
        })).data;
        return response;
    } catch (error) {
        console.error('verifyPayment Error ', error);
    }
}

// Get User All Payments API
export const loadPayment = async () => {
    try {
        const respone = (await axios.get(`${API}/payments`,
            {
                headers: {
                    Authorization: getToken()
                }
            }
        )).data;
        return respone;
    } catch (error) {
        console.error('loadPayment Error ', error);
    }
}