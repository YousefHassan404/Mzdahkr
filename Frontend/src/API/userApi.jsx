import http from "./http";

const userApi = "http://localhost:5000/api";

const createUser = (data) => http.post(`${userApi}/users`, data);
const loginUser = (data) => http.post(`${userApi}/auth`, data);

const userApis = { createUser , loginUser };

export default userApis;
