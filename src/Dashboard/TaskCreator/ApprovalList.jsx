import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ApprovalList = () => {
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApprovedSubmissions = async () => {
      try {
        const response = await axios.get('https://micro-task-earnning-pf-server.vercel.app/submissions', {
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
              <th>Submission Link</th>
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
                  {submission.link ? (
                    <a href={submission.link} target="_blank" rel="noopener noreferrer">
                      View Link
                    </a>
                  ) : (
                    'No link provided'
                  )}
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
