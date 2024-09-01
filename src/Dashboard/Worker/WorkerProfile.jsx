import axios from 'axios';
import { useEffect, useState } from 'react';

const WorkerProfile = () => {
  const [workers, setWorkers] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({}); 

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/workers');
        setWorkers(response.data);
        response.data.forEach(worker => fetchComments(worker.email));
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    const fetchComments = async (workerEmail) => {
      try {
        const response = await axios.get(`http://localhost:8000/comments/${workerEmail}`);
        setComments(prevComments => ({ ...prevComments, [workerEmail]: response.data }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchWorkers();
  }, []);

  const handleCommentTextChange = (workerEmail, text) => {
    setCommentText(prev => ({ ...prev, [workerEmail]: text }));
  };

  const handleCommentSubmit = async (workerEmail) => {
    try {
      const result = await axios.post('http://localhost:8000/comments', {
        workerEmail,
        commenterName: 'Anonymous', 
        commentText: commentText[workerEmail] || '',
      });
      setCommentText(prev => ({ ...prev, [workerEmail]: '' }));
      fetchComments(workerEmail); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {workers.map(worker => (
        <div key={worker.email} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
          <img
            src={worker.photoURL}
            alt={worker.name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{worker.name}</h2>
          <p className="text-gray-600 mb-2">{worker.email}</p>
          <p className="text-gray-600">{worker.skill}</p>

          <div className="mt-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            <div className="space-y-2">
              {comments[worker.email]?.map((comment, index) => (
                <div key={index} className="border p-2 rounded">
                  <p><strong>{comment.commenterName}</strong>: {comment.commentText}</p>
                </div>
              ))}
            </div>
            <textarea
              value={commentText[worker.email] || ''}
              onChange={(e) => handleCommentTextChange(worker.email, e.target.value)}
              className="w-full p-2 border rounded mt-2"
              placeholder="Add a comment..."
            />
            <button
              onClick={() => handleCommentSubmit(worker.email)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkerProfile;
