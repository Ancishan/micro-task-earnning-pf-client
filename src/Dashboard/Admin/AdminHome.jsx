import { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';

const AdminHome = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/admin/verification-requests');
        setRequests(data);
      } catch (error) {
        toast.error('Failed to fetch verification requests');
      }
    };
    fetchRequests();
  }, []);

  const handleRequest = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/admin/verification-requests/${id}`, { status });
      setRequests((prev) => prev.map((req) => (req._id === id ? { ...req, status } : req)));
      toast.success('Request updated successfully');
    } catch (error) {
      toast.error('Failed to update request');
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Helmet>
        <title>Admin Dashboard - Micro Tasking</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.userEmail}</td>
                <td>{request.status}</td>
                <td>
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-success mr-2"
                        onClick={() => handleRequest(request._id, 'approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRequest(request._id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
