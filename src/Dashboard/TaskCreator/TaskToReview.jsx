import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/UseAuth';

const TaskToReview = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await axiosPublic.get('/submissions', {
                    params: {
                        creator_email: user.email,
                        status: 'pending'
                    }
                });
                setSubmissions(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [user.email, axiosPublic]);

    const handleApproval = async (id) => {
        try {
            await axiosPublic.put(`/submissions/${id}`, { status: 'approved' });
            setSubmissions(submissions.filter(submission => submission._id !== id));
            navigate('/dashboard/approveList'); // Navigate to the approval list page
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

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Pending Submissions</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Worker Name</th>
                        <th>Worker Email</th>
                        <th>Task Title</th>
                        <th>Payable Amount</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map(submission => (
                        <tr key={submission._id}>
                            <td>{submission.worker_name}</td>
                            <td>{submission.worker_email}</td>
                            <td>{submission.task_title}</td>
                            <td>{submission.payable_amount}</td>
                            <td>
                                <button className="btn btn-primary mr-2" onClick={() => handleApproval(submission._id)}>Approve</button>
                                <button className="btn btn-danger" onClick={() => handleRejection(submission._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskToReview;
