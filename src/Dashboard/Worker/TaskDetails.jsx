import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/view/${id}`, { withCredentials: true });
        setTask(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-4">
      {task && (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{task.task_title}</h2>
            <p>Creator: {task.creator_name}</p>
            <p>Completion Date: {task.completion_date}</p>
            <p>Payable Amount: {task.payable_amount}</p>
            <p>Quantity: {task.task_quantity}</p>
            <p>Details: {task.task_detail}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
