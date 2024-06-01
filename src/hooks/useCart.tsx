import { create } from 'zustand';
import { UserState, CartState, Product } from '../interface/types';
import OrderService from '../services/OrderService'; // Import the OrderService

const useCart = create<CartState>((set) => ({
  cart: [],
  addCart: async (newProduct: Product, userState: UserState) => {
    try {
      set((state) => {
        // Check if the product already exists in the cart
        const existingProductIndex = state.cart.findIndex(
          (product) =>
            product.id === newProduct.id &&
            product.color === newProduct.color &&
            product.storage === newProduct.storage,
        );

        if (existingProductIndex > -1) {
          // If the product exists, update its quantity
          const updatedCart = state.cart.map((product, index) => {
            if (index === existingProductIndex) {
              return {
                ...product,
                quantity: product.quantity + newProduct.quantity,
              };
            }
            return product;
          });

          // Update the cart in the store
          return { cart: updatedCart };
        }
        // If the product doesn't exist, add it to the cart
        return { cart: [...state.cart, newProduct] };
      });

      // Create or update the order in the database
      await OrderService.createOrder(
        userState.user?.id || '',
        JSON.stringify(newProduct),
        'Added',
      );
    } catch (error) {
      console.error('Error adding product to cart:', error.message);
    }
  },
  removeCart: async (productId) => {
    try {
      set((state) => ({
        // Remove the product from the cart in the store
        cart: state.cart.filter((product) => product.id !== productId),
      }));

      // Delete the order from the database
      await OrderService.deleteOrder(productId);
    } catch (error) {
      console.error('Error removing product from cart:', error.message);
    }
  },
  clearCart: async () => {
    try {
      set(() => ({
        // Clear the cart in the store
        cart: [],
      }));

      // Clear all orders from the database
      await OrderService.clearOrders();
    } catch (error) {
      console.error('Error clearing cart:', error.message);
    }
  },
}));

export default useCart;
