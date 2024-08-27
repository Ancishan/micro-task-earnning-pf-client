import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/UseAuth';

const TaskToReview = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [submissions, setSubmissions] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axiosPublic.get('/submissions', {
                    params: { creator_email: user.email, status: 'pending' }
                });
                setSubmissions(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axiosPublic.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchSubmissions();
        fetchUsers();
    }, [user.email, axiosPublic]);

    const handleApproval = async (id) => {
        try {
            await axiosPublic.put(`/submissions/${id}`, { status: 'approved' });
            setSubmissions(submissions.filter(submission => submission._id !== id));
            navigate('/dashboard/approveList');
        } catch (error) {
            console.error('Error approving submission:', error);
        }
    };

    const handleRejection = async (id) => {
        try {
            await axiosPublic.put(`/submissions/${id}`, { status: 'rejected' });
            setSubmissions(submissions.filter(submission => submission._id !== id));
        } catch (error) {
            console.error('Error rejecting submission:', error);
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    const getUserByEmail = (email) => {
        return users.find(user => user.email === email);
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Pending Submissions</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Worker Information</th>
                        <th>Task Title</th>
                        {/* <th>Payable Amount</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(submission => {
                        const worker = getUserByEmail(submission.worker_email);
                        return (
                            <tr key={submission._id}>
                                <td>
                                    {worker ? (
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                {worker.photoURL ? (
                                                    <img src={worker.photoURL} alt={worker.name} className="w-12 h-12 rounded-full" />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">No Image</div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold">{worker.name}</p>
                                                <p>{worker.email}</p>
                                                <p>{worker.skill}</p>
                                                <p>{worker.comment || 'No Comment'}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        'Loading...'
                                    )}
                                </td>
                                <td>{submission.task_title}</td>
                                {/* <td>{submission.payable_amount}</td> */}
                                <td>
                                    {/* <Link to={`/dashboard/workerProfile/${submission.worker_email}`} className="btn btn-info mr-2">View Profile</Link> */}
                                    <button className="btn btn-primary mr-2" onClick={() => handleApproval(submission._id)}>Approve</button>
                                    <button className="btn btn-danger" onClick={() => handleRejection(submission._id)}>Reject</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TaskToReview;
