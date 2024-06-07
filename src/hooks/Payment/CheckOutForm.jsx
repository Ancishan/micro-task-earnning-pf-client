import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/UseAuth';
import { Elements } from '@stripe/react-stripe-js'; // Import Elements from @stripe/react-stripe-js
import CheckOutForm from '../Payment/CheckOutForm'; // Import the CheckOutForm component
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK); 

const TaskToReview = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSubmission, setSelectedSubmission] = useState(null); // Track the selected submission

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

    const handleApproval = (id, payableAmount, workerEmail) => {
        setSelectedSubmission({ id, payableAmount, workerEmail }); // Set the selected submission
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
                                <button className="btn btn-primary mr-2" onClick={() => handleApproval(submission._id, submission.payable_amount, submission.worker_email)}>Approve</button>
                                <button className="btn btn-danger" onClick={() => handleRejection(submission._id)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedSubmission && ( // Render the payment method when a submission is selected
                <div>
                    <h2>Payment Method</h2>
                    <Elements stripe={stripePromise}>
                        <CheckOutForm amount={selectedSubmission.payableAmount} />
                    </Elements>
                </div>
            )}
        </div>
    );
};

export default TaskToReview;
