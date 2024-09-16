import { Routes, Route } from 'react-router-dom';
import HomeLayout from '../pages/home/HomeLayout';
import Login from '../pages/auth/Login';

const AppRoutes = () => {
    return (
        <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    );
};

export default AppRoutes;