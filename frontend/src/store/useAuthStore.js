import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signUp", data);

      set({
        authUser: res.data,
      });

      toast.success("Account created successfully!");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("SignUp Error:", error);
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn: async (data) => {
    set({ isLogingIn: true });

    try {
      const res = await axiosInstance.post("/auth/logIn", data);
      set({ authUser: res.data });

      toast.success("Logged In Successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("LogIn Error", error);
    } finally {
      set({ isLogingIn: false });
    }
  },

  logOut: async () => {
    try {
      const res = await axiosInstance.get("/auth/logOut");
      toast.success("Logged out successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("LogOut Error: ", error);
    } finally {
      set({ authUser: null });
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/updateProfile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.error("updateProfile Error: ", error);
    }
  },
}));
