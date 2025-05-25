import axios from "axios";
import http from "./http";

export const apiUrl = 'http://localhost:5000/api/shares';

const createShares = data => axios.post(apiUrl, data ,{
  headers: { "Content-Type": "multipart/form-data" },})

const sharesApi = {
  createShares,
};  

export default sharesApi;