import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store'; // Adjust the import path as needed
// import { createUserRegister } from '../../features/auth/authSlice'; // Adjust the import path as needed
import Navbar from '../../components/common/Navbar';
import { MdError } from "react-icons/md";
import { Footer } from '../../components/common/Footer';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register= () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, errorMessage } = useSelector((state: RootState) => state.user);
  const [formData, setFormData] = useState<RegisterFormData>({ name: '', email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (formData.name.trim() === '') {
      alert('Name is required.');
      return false;
    }
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const registerData = { name: formData.name, email: formData.email, password: formData.password };
    // dispatch(createUserRegister(registerData)); // Assuming you have an action for registration
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full outline-none"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full outline-none"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 p-2 border border-gray-300 rounded-lg w-full outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {error && <div className='flex justify-center items-center gap-2'>
              <MdError className="mt-4 text-red-500 text-center"></MdError>
              <p className="mt-4 text-red-500 text-center"> {errorMessage}</p></div>}
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
