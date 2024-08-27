import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkerProfile = () => {
  const [workers, setWorkers] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // New state for current user

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/users/workers');
        setWorkers(response.data);
      } catch (error) {
        setError('Failed to fetch workers');
        console.error('Error fetching workers:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCurrentUser = async () => {
        try {
          const response = await axios.get('http://localhost:8000/users/current', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}` // Or wherever you store the token
            }
          });
          setCurrentUser(response.data);
        } catch (error) {
          console.error('Error fetching current user:', error);
        }
      };
      

    fetchWorkers();
    fetchCurrentUser(); // Fetch current user information
  }, []);

  const handleSearch = async () => {
    if (!searchEmail) {
      setFetchError('Please enter an email to search.');
      return;
    }
  
    setLoading(true);
    setFetchError(null);
  
    try {
      const response = await axios.get('http://localhost:8000/users', {
        params: { email: searchEmail }
      });
      if (response.data.length > 0) {
        setWorkers(response.data);
      } else {
        setFetchError('No worker found with this email.');
      }
    } catch (error) {
      setFetchError('Failed to fetch worker.');
      console.error('Error fetching worker:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment) {
      setFetchError('Please enter a comment.');
      return;
    }
  
    if (!selectedWorker) {
      setFetchError('No worker selected.');
      return;
    }
  
    if (!currentUser) {
      setFetchError('Current user information is not available.');
      return;
    }
  
    setLoading(true);
    setFetchError(null);
  
    try {
      const response = await axios.post('http://localhost:8000/users/add-comment', {
        email: selectedWorker.email,
        comment: newComment,
        commenter: currentUser.name, // Include current user name
        commenterPhoto: currentUser.photoURL // Include current user photo URL
      });
  
      if (response.data.success) {
        // Fetch the updated worker profile
        const updatedResponse = await axios.get('http://localhost:8000/users', {
          params: { email: selectedWorker.email }
        });
  
        if (updatedResponse.data.length > 0) {
          const updatedWorker = updatedResponse.data[0];
          setWorkers(workers.map(worker => worker.email === selectedWorker.email ? updatedWorker : worker));
          setSelectedWorker(updatedWorker);
        } else {
          setFetchError('Failed to fetch updated worker profile.');
        }
  
        setNewComment('');
      } else {
        setFetchError('Failed to add comment.');
      }
    } catch (error) {
      setFetchError('Failed to add comment.');
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleWorkerSelect = (worker) => {
    setSelectedWorker(worker);
  };

  if (loading && !fetchError) {
    return <div>Loading...</div>;
  }

  if (error || fetchError) {
    return <div>{error || fetchError}</div>;
  }

  return (
    <div className="worker-profiles">
      <h1 className="text-2xl font-bold mb-4">Worker Profiles</h1>
      <div className="mb-4">
        <input
          type="text"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          placeholder="Search by email"
          className="border p-2 rounded-lg mr-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {workers.map(worker => (
          <div key={worker._id} className="worker-card bg-white shadow-lg p-4 rounded-lg">
            <img
              src={worker.photoURL}
              alt={worker.name}
              className="worker-photo w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="worker-name text-xl font-semibold text-center">{worker.name}</h2>
            <p className="worker-email text-center text-gray-500">{worker.email}</p>
            <p className="worker-skill text-center text-gray-700">Skill: {worker.skill}</p>
            <p className="worker-comments text-center text-gray-700">
              Comments: {worker.comments ? worker.comments.length : 0}
            </p>
            <div className="mt-2">
              {worker.comments && worker.comments.map((comment, index) => (
                <div key={index} className="comment p-2 border-t border-gray-200">
                  <p>
                    <img
                      src={comment.commenterPhoto} // Display commenter's photo
                      alt={comment.commenter}
                      className="w-8 h-8 rounded-full inline-block mr-2"
                    />
                    <strong>{comment.commenter}:</strong> {comment.text}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => handleWorkerSelect(worker)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
      {selectedWorker && (
        <div className="worker-comments mt-6 p-4 border rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-4">Comments for {selectedWorker.name}</h2>
          <div className="mb-4">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add your comment"
              className="border p-2 rounded-lg w-full"
            />
            <button
              onClick={handleCommentSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg mt-2"
            >
              Submit Comment
            </button>
          </div>
          <div>
            {selectedWorker.comments && selectedWorker.comments.map((comment, index) => (
              <div key={index} className="comment p-2 border-b">
                <p>
                  <img
                    src={comment.commenterPhoto} // Display commenter's photo
                    alt={comment.commenter}
                    className="w-8 h-8 rounded-full inline-block mr-2"
                  />
                  <strong>{comment.commenter}:</strong> {comment.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerProfile;
