//import jwtDecode from 'jwt-decode';
import { validateToken } from './userServicer';

export const getCurrentUserFromToken = async() => {
  const token = localStorage.getItem('token'); // Ensure this key matches your actual token key
  if (!token) {
    throw new Error('No token found');
  }
  try {
    const response = await validateToken(token);

            if (response.success) {
              const { name, id } = response.data;

        return { name, id };
            }
            return null;
  } catch (error) {
    console.error('Error decoding token:', error);
    throw error;
  }
};



