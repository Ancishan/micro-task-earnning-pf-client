import  { useState } from 'react';
import axios from 'axios';
import { imageUpload } from '../../api/utlis';

const AddTask = () => {
  const [taskData, setTaskData] = useState({
    task_title: '',
    task_detail: '',
    task_quantity: 0,
    payable_amount: 0,
    completion_date: '',
    submission_info: '',
    task_image_url: ''
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (image) {
        const imageUrl = await imageUpload(image);
        taskData.task_image_url = imageUrl;
      }

      const response = await axios.post('http://localhost:8000/tasks', taskData); // Use the correct server URL and port
      console.log('Task added successfully:', response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Title</span>
          </label>
          <input
            type="text"
            name="task_title"
            value={taskData.task_title}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Detail</span>
          </label>
          <textarea
            name="task_detail"
            value={taskData.task_detail}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Quantity</span>
          </label>
          <input
            type="number"
            name="task_quantity"
            value={taskData.task_quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Payable Amount (per Task)</span>
          </label>
          <input
            type="number"
            name="payable_amount"
            value={taskData.payable_amount}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Completion Date</span>
          </label>
          <input
            type="date"
            name="completion_date"
            value={taskData.completion_date}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Submission Info</span>
          </label>
          <textarea
            name="submission_info"
            value={taskData.submission_info}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Task Image</span>
          </label>
          <input
            type="file"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;