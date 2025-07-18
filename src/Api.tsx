import axios from "axios";

const API="http://localhost:8080";

// Users Api
export const loginApi=(userName:string,password:string)=>axios.post(`${API}/login?userName=${userName}&password=${password}`);

//Car Api
export const getListOfCars=()=>axios.get(`${API}/cars/getListOfCars`);
export const getCarByCarName=()=>axios.get(`${API}/cars/get/Petrol Hybrid`);
export const getCarImage=()=>{console.log(); return axios.get(`${API}/cars/getImage/Glanza`)};