import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/register`, user);

export const loginRequest = async (user) => axios.post(`/login`, user);

/* export const verifyTokenRequest = () => axios.get(`/verify`);  */
export const verify = () => axios.get(`/verifyToken`);

/* import axios from "./axios";

const API = "http://localhost:8000/api"; 

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user) */ 