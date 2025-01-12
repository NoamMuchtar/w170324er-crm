import axios from "axios";
import { Customer } from "../interfaces/Customer";

const api: string = `${import.meta.env.VITE_API}/customers`;
// CRUD
// Get all customers

export function getAllCustomers() {
  return axios.get(api);
}
// Get specific customer by ID
export function getCustomerById(cusId: string) {
  return axios.get(`${api}/${cusId}`);
}

// Add new Customer
export const addCustomer = async (newCustomer: Customer) => {
  try {
    const res = await axios.post(api, newCustomer);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

// Update Customer by ID
export function updateCustomer(cusId: string, updatedCustomer: Customer) {
  return axios.put(`${api}/${cusId}`, updatedCustomer);
}
// Delete Customer by ID
export function deleteCustomer(cusId: string) {
  return axios.delete(`${api}/${cusId}`);
}
