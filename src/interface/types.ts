// User interface

// will be used for profile
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
}

// very simple user for auth/security reasons
// will be used for navbar
export interface UserLogin {
  id: string;
  email: string;
}

export interface UserState {
  user: UserLogin | null;
  login: (user: UserLogin) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Device List interface
export interface Device {
  id: string;
  title: string;
  type: string;
  thumb: string;
  price: number;
}

export interface DeviceListProps {
  devices: Device[];
}

// Cart related interface
export interface Product {
  id: string;
  orderid: number;
  name: string;
  thumbnail: string;
  color: string;
  storage: string;
  quantity: number;
  price: number;
}

export interface CartState {
  cart: Product[];
  addCart: (product: Product, user: UserLogin) => Promise<void>;
  removeCart: (productRem: Product) => Promise<void>;
  initializeCart: (userId: string) => Promise<void>;
  clearCart: () => void;
}

export interface Order {
  id: string;
  user_id: string;
  product: Product;
  status: string;
  created_at: Date;
}
