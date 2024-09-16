import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store'; // Adjust the import path as needed
import { createUserLogin } from '../../features/auth/authSlice'; // Adjust the import path as needed
import Navbar from '../../components/common/Navbar';
import { MdError } from "react-icons/md";
// Define the LoginFormData interface here
interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, errorMessage } = useSelector((state: RootState) => state.user);

  // Use LoginFormData interface to type the state
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [isStudent, setIsStudent] = useState(true); // Toggle between student and tutor

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const validateForm = (): boolean => {
    // Simple validation example; you can expand this as needed
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email address.');
      return false;
    }
    if (formData.password.length < 5) {
      alert('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    const loginData = { email: formData.email, password: formData.password };
    dispatch(createUserLogin(loginData));
  };
  return (
    <div className=''>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
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
            {/* <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={() => setIsStudent(!isStudent)}
                  className="form-checkbox"
                />
                <span className="ml-2 text-sm text-gray-700">Student Login</span>
              </label>
            </div> */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 text-white font-semibold rounded-lg ${isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            {error && <div className='flex justify-center items-center gap-2'>
              <MdError className="mt-4 text-red-500 text-center"></MdError>
              <p className="mt-4 text-red-500 text-center"> {errorMessage}</p></div>}
          </form>
        </div>
      </div>
    </div >
  );
};

export default Login;
