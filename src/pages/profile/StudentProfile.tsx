import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../features/store'; // Assuming your store is typed
import { message } from 'antd';
import { errorClean, updateStudentProfile } from '../../features/auth/authSlice';
import Navbar from '../../components/common/Navbar';
import { Footer } from '../../components/common/Footer';
import './profile.css'
const StudentProfile = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, updatedStudent, isLoading } = useSelector((state: RootState) => state.user);
    const { token } = useSelector((state: RootState) => state.user.user);

    const [image, setImage] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | undefined>(undefined);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [institution, setInstitution] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [standard, setStandard] = useState<string>("");

    // Handler for profile picture preview
    const updateProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result as string);
                    setImage(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Handler for form submission
    const handleUpdateProfile = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('institution', institution);
        formData.append('gender', gender);
        formData.append('standard', standard);
        if (image) {
            formData.append('image', image);
        }
        dispatch(updateStudentProfile({ token: token ?? "", data: formData }));

    };

    // Populate form fields with user data on mount
    useEffect(() => {
        if (user) {
            setAvatarPreview(user.image);
            setName(user.name || "");
            setEmail(user.email || "");
            setPhoneNumber(user.phoneNumber || "");
            setAddress(user.address || "");
            setInstitution(user.institution || "");
            setGender(user.gender || "");
            setStandard(user.standard || "");
        }
    }, [user]);

    // Handle success message after profile update
    useEffect(() => {
        if (updatedStudent) {
            message.success("Profile Successfully Updated");
            dispatch(errorClean());
        }
    }, [updatedStudent, dispatch]);


    return (
        <div>
            <Navbar />
            <section className=" lg:w-3/4 xl:w-2/4 mx-auto p-12 mt-28 mb-12 border ">
                <h2 className="text-start text-lg font-semibold text-gray-700 capitalize ">Account settings</h2>

                <form onSubmit={handleUpdateProfile} className='mt-12'>
                    <div>
                        <div className="image-section  flex flex-1 items-center justify-center gap-2">
                            <img
                                alt="Preview"
                                src={avatarPreview}
                                className="h-32 w-56 border rounded-lg"
                            />
                            <label>
                                +
                                <br />
                                <input
                                    type="file"
                                    name="image"
                                    onChange={updateProfileImageChange}
                                    accept="image/png,image/jpeg,image/webp"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <input
                                id="name"
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Full Name'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                id="email"
                                type="email"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Email'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Phone'
                                value={phoneNumber}
                                onChange={e => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Gender'
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Address'
                                value={address}
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Which Standard'
                                value={standard}
                                onChange={e => setStandard(e.target.value)}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md"
                                placeholder='Institution Name'
                                value={institution}
                                onChange={e => setInstitution(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        {isLoading ? (
                            <button className="font-mono mt-4 w-1/4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500">
                                Loading
                            </button>
                        ) : (
                            <button className="font-mono mt-4 w-1/4 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500">
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </section>
            <Footer />
        </div>
    );
};

export default StudentProfile;
