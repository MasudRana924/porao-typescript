import { Routes, Route } from 'react-router-dom';
import HomeLayout from '../pages/home/HomeLayout';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import StudentProfile from '../pages/profile/StudentProfile';

const AppRoutes = () => {
    return (
        <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student/register" element={<Register />} />
        <Route path="/student/profle" element={<StudentProfile />} />
      </Routes>
    );
};

export default AppRoutes;