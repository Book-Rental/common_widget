export interface Category {
  _id: string;
  name: string;
  description: string;
  isActive: boolean;
  isPopular: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryResponse {
  status: string;
  message: string;
  data: Category[];
}