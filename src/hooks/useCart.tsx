import { create } from 'zustand';
import Swal from 'sweetalert2';
import { CartState, Product, UserLogin } from '../interface/types';
import OrderService from '../services/OrderService'; // Import the OrderService

const useCart = create<CartState>((set) => {
  // Retrieve cart state from local storage on initialization
  const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');

  return {
    cart: storedCart,
    addCart: async (newProduct: Product, userState: UserLogin) => {
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

            // Update the cart in the store and local storage
            localStorage.setItem('cart', JSON.stringify(updatedCart));
            return { cart: updatedCart };
          }
          // If the product doesn't exist, add it to the cart
          const updatedCart = [...state.cart, newProduct];
          // Update the cart in the store and local storage
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return { cart: updatedCart };
        });

        // Create or update the order in the database
        await OrderService.createOrder(
          userState.id || '',
          JSON.stringify(newProduct),
          'Added',
        );
      } catch (error) {
        Swal.fire({
          title: 'Add Cart Error!',
          text: 'Error adding product to cart. Please come back later',
          icon: 'error',
          confirmButtonText: 'Confirm',
        });
      }
    },
    removeCart: async (productRem) => {
      try {
        set((state) => {
          // Remove the product from the cart in the store
          const updatedCart = state.cart.filter(
            (product) => product.id !== productRem.id,
          );
          // Update the cart in the store and local storage
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          return { cart: updatedCart };
        });

        // Delete the order from the database
        await OrderService.deleteOrder(productRem.orderid);
      } catch (error) {
        Swal.fire({
          title: 'Remove Cart Error!',
          text: 'Error removing product from cart. Please come back later',
          icon: 'error',
          confirmButtonText: 'Confirm',
        });
      }
    },
    initializeCart: async (userId: string) => {
      try {
        // Fetch the cart data for the user from the database
        const orders = await OrderService.getOrdersByUserId(userId);

        // Extract product data from orders and set the cart state
        const cartData = orders.map((order) => {
          const product: Product = JSON.parse(order.product);
          product.orderid = order.id;
          return product;
        });

        // Update the cart in the store and local storage
        localStorage.setItem('cart', JSON.stringify(cartData));
        set({ cart: cartData });
      } catch (error) {
        Swal.fire({
          title: 'User Cart Error!',
          text: 'Error initializing cart. Please come back later',
          icon: 'error',
          confirmButtonText: 'Confirm',
        });
      }
    },
    clearCart: () => {
      localStorage.removeItem('cart');
      set({ cart: [] });
    },
  };
});

export default useCart;
