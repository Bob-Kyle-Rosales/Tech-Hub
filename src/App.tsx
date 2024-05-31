import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout';
import HomePage from './pages/HomePage';
import IpadPage from './pages/IpadPage';
import IphonePage from './pages/IphonePage';
import MacPage from './pages/MacPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="ipad" element={<IpadPage />} />
        <Route path="iphone" element={<IphonePage />} />
        <Route path="mac" element={<MacPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
