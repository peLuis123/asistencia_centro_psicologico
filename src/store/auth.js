// stores/auth.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Auth } from '@/services/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const token = ref(localStorage.getItem('token'));

  const setUser = (userData) => {
    user.value = userData;
  };

  const setToken = (tokenData) => {
    token.value = tokenData;
    localStorage.setItem('token', tokenData);
  };

  const clearAuth = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  const loginUser = async (email, password) => {
    try {
      const userData = await Auth.loginUser({ email, password });
      const tokenData = await userData.getIdToken();
      setUser(userData);
      setToken(tokenData);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const registerUser = async (email, password) => {
    try {
      const userData = await Auth.registerUser({ email, password });
      const tokenData = await userData.getIdToken();
      setUser(userData);
      setToken(tokenData);
      return userData;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logoutUser = async () => {
    try {
      await Auth.logoutUser();
      clearAuth();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await Auth.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      clearAuth();
      throw new Error(error.message);
    }
  };

  return {
    user,
    token,
    loginUser,
    registerUser,
    logoutUser,
    getCurrentUser,
    isAuthenticated: () => !!token.value,
  };
});
