import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout';
import HomePage from './pages/HomePage';
import IpadPage from './pages/IpadPage';
import IphonePage from './pages/IphonePage';
import MacPage from './pages/MacPage';
import DevicePage from './pages/DevicePage';
import NotFoundPage from './pages/NotFoundPage';
import Login from './pages/Login';
import Register from './pages/Register';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

        <Route path="ipad">
          <Route index element={<IpadPage />} />
          <Route path=":id" element={<DevicePage device="iPad" />} />
        </Route>
        <Route path="iphone">
          <Route index element={<IphonePage />} />
          <Route path=":id" element={<DevicePage device="iPhone" />} />
        </Route>
        <Route path="mac">
          <Route index element={<MacPage />} />
          <Route path=":id" element={<DevicePage device="Mac" />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/cart" element={<CartPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
