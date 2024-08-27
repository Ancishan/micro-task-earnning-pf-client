import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider';

/**
 * Custom hook to fetch user profile data by email.
 * @param {string} email - The email of the user to fetch.
 * @returns {Object} - The user profile data and loading state.
 */
const useUserProfile = (email) => {
  const { fetchUserByEmail } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUserByEmail(email);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      getUser();
    }
  }, [email, fetchUserByEmail]);

  return { user, loading };
};

export default useUserProfile;
