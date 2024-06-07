import { useEffect, useState } from 'react';


import useAuth from '../../hooks/UseAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosPublic.get('/admin/users', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [user.token]);

  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Index</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHome;