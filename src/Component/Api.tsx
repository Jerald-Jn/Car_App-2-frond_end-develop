import axios from "axios";

const API="http://localhost:8080";

// Users Api
export const loginApi=(userName:string,password:string)=>axios.post(`${API}/login?userName=${userName}&password=${password}`);

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
export const getCarImage=()=>{console.log(); return axios.get(`${API}/cars/getImage/Glanza`)};