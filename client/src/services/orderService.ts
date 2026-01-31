import api from './api';
import { Order, PaginatedResponse, ApiResponse } from '../types';

export const orderService = {
  createOrder: async (data: any): Promise<ApiResponse<Order>> => {
    const response = await api.post<ApiResponse<Order>>('/orders', data);
    return response.data;
  },

  getOrderById: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.get<ApiResponse<Order>>(`/orders/${id}`);
    return response.data;
  },

  getMyOrders: async (page = 1, limit = 10): Promise<PaginatedResponse<Order>> => {
    const response = await api.get<PaginatedResponse<Order>>(`/orders/myorders?page=${page}&limit=${limit}`);
    return response.data;
  },

  updateOrderToPaid: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}/pay`, {});
    return response.data;
  },

  cancelOrder: async (id: string): Promise<ApiResponse<Order>> => {
    const response = await api.put<ApiResponse<Order>>(`/orders/${id}/cancel`);
    return response.data;
  },
};
