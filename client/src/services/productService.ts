import api from './api';
import { Product, PaginatedResponse, ApiResponse } from '../types';

export const productService = {
  getProducts: async (params?: any): Promise<PaginatedResponse<Product>> => {
    const queryString = new URLSearchParams(params).toString();
    const response = await api.get<PaginatedResponse<Product>>(`/products?${queryString}`);
    return response.data;
  },

  getProductById: async (id: string): Promise<ApiResponse<Product>> => {
    const response = await api.get<ApiResponse<Product>>(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>(`/products/search?q=${query}`);
    return response.data;
  },

  getFeaturedProducts: async (): Promise<ApiResponse<Product[]>> => {
    const response = await api.get<ApiResponse<Product[]>>('/products/featured');
    return response.data;
  },

  createProduct: async (data: Partial<Product>): Promise<ApiResponse<Product>> => {
    const response = await api.post<ApiResponse<Product>>('/products', data);
    return response.data;
  },
};
