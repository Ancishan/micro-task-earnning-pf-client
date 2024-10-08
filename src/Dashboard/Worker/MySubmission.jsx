import { useEffect, useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/UseAuth';
import { Link } from 'react-router-dom';

const MySubmission = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axiosPublic.get(`/submissions?worker_email=${user.email}`);
        setSubmissions(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (user && user.email) {
      fetchSubmissions();
    }
  }, [user, axiosPublic]);

  const handleLinkSubmission = async () => {
    if (selectedSubmissionId && submissionLink) {
      try {
        await axiosPublic.put(`/submissions/${selectedSubmissionId}`, { link: submissionLink });
        setSubmissionLink('');
        setSelectedSubmissionId(null);
        // Optionally refresh submissions
        const response = await axiosPublic.get(`/submissions?worker_email=${user.email}`);
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error submitting link:', error);
      }
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">My Submissions</h2>
      {submissions.length > 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Task Title</th>
              <th className="px-4 py-2">Task Detail</th>
              <th className="px-4 py-2">Submission Details</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Submission Date</th>
              <th className="px-4 py-2">Submit Your Task</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission) => (
              <tr key={submission._id}>
                <td className="border px-4 py-2">{submission.task_title}</td>
                <td className="border px-4 py-2">{submission.task_detail}</td>
                <td className="border px-4 py-2">{submission.submission_details}</td>
                <td className="border px-4 py-2">{submission.status}</td>
                <td className="border px-4 py-2">{new Date(submission.current_date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">
                  {submission.status === 'approved' && (
                    <div>
                      <input
                        type="text"
                        value={selectedSubmissionId === submission._id ? submissionLink : ''}
                        onChange={(e) => setSubmissionLink(e.target.value)}
                        placeholder="Enter submission link"
                        className="border px-2 py-1"
                      />
                      <button
                        onClick={() => {
                          setSelectedSubmissionId(submission._id);
                          handleLinkSubmission();
                        }}
                        className="ml-2 bg-blue-500 text-white px-2 py-1"
                      >
                        Submit Link
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">No submissions found</div>
      )}
    </div>
  );
};

export default MySubmission;
