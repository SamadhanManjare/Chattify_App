import axios from 'axios';
import { create } from 'zustand';
import axiosInstance from '../lib/axios.js';
import { signup } from '../../../Backend/src/controllers/auth.controller.js';
import toast from 'react-hot-toast';

const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/api/auth/check');
            set({ authUser: res.data});
        } catch (error) {
            console.log('Error in Auth Check :', error);
            set({ authUser: null });
            
        }finally{
            set({ isCheckingAuth: false });
        }
    },

    signup : async (formData) => {
        set({isSigningUp: true});
        try {
            const res = await axiosInstance.post('/api/auth/signup', formData);
            set({ authUser: res.data });

            //taostify success
            toast.success("Account created successfully!");
            
        } catch (error) {
            
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        }finally{
            set({isSigningUp: false});
        }
    }
}));
export default useAuthStore;
