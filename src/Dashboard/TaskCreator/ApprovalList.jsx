import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApprovalList = () => {
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/submissions', {
          params: { status: 'approved' },
        });

        if (Array.isArray(response.data)) {
          setApprovedSubmissions(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
          setError('Unexpected response format');
        }
      } catch (error) {
        console.error('Error fetching approved submissions:', error);
        setError('Error fetching approved submissions');
      } finally {
        setLoading(false);
      }
    };

    fetchApprovedSubmissions();
  }, []);

  const handlePayment = async (id) => {
    try {
      await axios.post('http://localhost:8000/payments', { submissionId: id });
      // Optionally, update the list or notify the user of successful payment
      alert('Payment processed successfully');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Failed to process payment');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Approval List</h2>
      {approvedSubmissions.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Worker Name</th>
              <th>Task Title</th>
              <th>Submission Details</th>
              <th>Payable Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedSubmissions.map((submission, index) => (
              <tr key={submission._id}>
                <td>{index + 1}</td>
                <td>{submission.worker_name}</td>
                <td>{submission.task_title}</td>
                <td>{submission.submission_details}</td>
                <td>{submission.payable_amount}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handlePayment(submission._id)}
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No approved submissions found.</p>
      )}
    </div>
  );
};

export default ApprovalList;
