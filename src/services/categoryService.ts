import axios from "axios";
import { CategoryResponse } from "../types/category";

const BASE_URL = "https://be-book-rental.onrender.com/api";

export const getCategories = async (): Promise<CategoryResponse> => {
  const response = await axios.get(`${BASE_URL}/Category`);
  return response.data;
};