import axios from "axios";

const API="http://localhost:8080";

export const loginApi=(userName:string,password:string)=>axios.post(`${API}/login?userName=${userName}&password=${password}`);