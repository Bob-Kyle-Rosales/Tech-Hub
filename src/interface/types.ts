// User interface
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
}
// very simply user auth
export interface UserLogin {
  id: string;
  email: string;
}

export interface UserState {
  user: UserLogin | null;
  login: (user: UserLogin) => void;
  logout: () => void;
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
  name: string;
  thumbnail: string;
  color: string;
  storage: string;
  quantity: number;
  price: number;
}

export interface CartState {
  cart: Product[];
  addCart: (product: Product, user: UserState) => void;
  removeCart: (productId: string, user: UserState) => void;
  clearCart: () => void;
}

export interface Order {
  id: string;
  user_id: string;
  product: Product;
  status: string;
  created_at: Date;
}
