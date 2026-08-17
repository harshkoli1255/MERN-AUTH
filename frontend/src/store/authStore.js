import { create } from 'zustand';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const userAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    isResendVerificationToken: false,

    resendVerifyToken: async () => {
        set({
            isResendVerificationToken: true,
            error: null,
        });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_AUTH_URL}/resend-verificationToken`
            );
            set({
                user: response.data.user,
                isAuthenticated: true,
                isResendVerificationToken: false,
            });

        } catch(error) {
            set({
                error: error.response?.data?.message || "Error signing up",
                isResendVerificationToken: false,
            });
            throw error;
        }
    },
    signup: async (name, email, password) => {
        set({ isLoading: true, error: null });

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_AUTH_URL}/signup`,
                { name, email, password }
            );

            set({
                user: response.data.user,
                isLoading: false,
                isAuthenticated: true,
            });

        } catch (error) {
            set({
                error: error.response?.data?.message || "Error signing up",
                isLoading: false,
            });

            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({
            isLoading: true,
            error: null,
        })
        try {

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/verify-email`, 
                { code }
            );

            set({
                user: response.data.user,
                isAuthenticated: true,
                isLoading: false
            })
            return response.data;

        } catch(error) {
            set({
                error: error.response.data.message || "Error signing up",
                isLoading: false,
            });
            throw error;
        }
    },
    checkAuth: async () => {

        set({
            isCheckingAuth: true,
            error: null
        })

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_AUTH_URL}/check-auth`);
            set({
                user: response.data.user,
                isAuthenticated: true,
                isCheckingAuth: false,
            })
        } catch(error) {
            set({
                isCheckingAuth: false,
                error: null
            })
        }
    },
    login: async (email, password) => {
        set({
            isLoading: true,
            error: null,
        })

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/login`, {email, password});
            set({
                isAuthenticated: true,
                user: response.data.user,
                error: null,
                isLoading: false,
            })
        } catch(error) {
            set({
                isLoading: false,
                error: error?.response?.data?.message || "Error While Login",
            });
            throw error;
        }
    },
    logout: async() => {
        set({
            isLoading: true,
            error: null,
        });
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/logout`);
            set({
                user: null,
                isAuthenticated: false,
                error: null,
                isLoading: false,
            })

        } catch(error) {
            set({
                error: "Error logging out",
                isLoading: false,
            })
            throw error;
        }
    },
    forgotPassword: async (email) => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_AUTH_URL}/forgot-password`,
                { email }
            );
            set({
                message: response.data.message,
                isLoading: false,
            })
        } catch (error) {
            set({
                error: error?.response?.data?.message || "Error sending reset password email",
                isLoading: false,
            });
            throw error;
        }
    },
    resetPassword: async (token, password) => {
        set({
            isLoading: true,
            erorr: null,
        })
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_AUTH_URL}/reset-password/${token}`, {token, password});
            set({
                isLoading: false,
                message: response.data.message,
            })
        } catch(error) {
            set({
                error: error?.response?.data?.message || "Error Whilw updated your new password",
                isLoading: false,
            });
        }
    },
    clearError: () => {
        set({
            error: null,
        })
    }
}));
