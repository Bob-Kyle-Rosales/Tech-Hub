import supabase from '../config/supabaseClient';
import { Order } from '../interface/types';

const OrderService = {
  // Function to create a new order
  createOrder: async (userId: string, product: string, status: string) => {
    const { data, error } = await supabase.from('Order').insert([
      {
        user_id: userId,
        product,
        status,
      },
    ]);
    if (error) {
      console.error(`Error creating order: ${error.message}`);
      throw new Error(`Error creating order: ${error.message}`);
    }
    return data ? data[0] : null;
  },

  // Function to get orders by user ID
  getOrdersByUserId: async (userId: string) => {
    const { data, error } = await supabase
      .from('Order')
      .select('*')
      .eq('user_id', userId);
    if (error) {
      console.error(`Error fetching orders: ${error.message}`);
      throw new Error(`Error fetching orders: ${error.message}`);
    }
    return data || [];
  },

  // Function to update an order by ID
  updateOrder: async (orderId: number, updates: Partial<Order>) => {
    const { data, error } = await supabase
      .from('Order')
      .update(updates)
      .eq('id', orderId);
    if (error) {
      console.error(`Error updating order: ${error.message}`);
      throw new Error(`Error updating order: ${error.message}`);
    }
    return data ? data[0] : null;
  },

  // Function to delete an order by ID
  deleteOrder: async (orderId: number) => {
    const { error } = await supabase.from('Order').delete().eq('id', orderId);
    if (error) {
      console.error(`Error deleting order: ${error.message}`);
      throw new Error(`Error deleting order: ${error.message}`);
    }
    return true;
  },
};

export default OrderService;
