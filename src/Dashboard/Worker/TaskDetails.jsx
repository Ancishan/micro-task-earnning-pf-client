import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/UseAuth';

const TaskDetails = () => {
    const { user } = useAuth(); 
    const axiosPublic = useAxiosPublic();
    const { id } = useParams();
    const [task, setTask] = useState(null);
    const [submissionDetails, setSubmissionDetails] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axiosPublic.get(`/view/${id}`);
                setTask(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchTask();
    }, [id, axiosPublic]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || !user.email || !user.displayName) {
            alert('User information is incomplete');
            return;
        }
        const submission = {
            task_id: task._id,
            task_title: task.task_title,
            task_detail: task.task_detail,
            task_img_url: task.task_image_url,
            payable_amount: task.payable_amount,
            worker_email: user.email, 
            submission_details: submissionDetails,
            worker_name: user.displayName, 
            creator_name: task.user_name,
            creator_email: task.createdBy,
            current_date: new Date().toISOString(),
            status: 'pending'
        };
        try {
            await axiosPublic.post('/submissions', submission);
            alert('Submission Successful');
        } catch (error) {
            console.error('Error submitting task:', error);
        }
    };

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-4">
            {task && (
                <div className="card w-96 glass">
                    <figure><img src={task.task_image_url} alt="task image!" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{task.task_title}</h2>
                        <p>Creator: {task.user_name}</p>
                        <p>Completion Date: {task.completion_date}</p>
                        <p>Payable Amount: {task.payable_amount}</p>
                        <p>Quantity: {task.task_quantity}</p>
                        <p>Details: {task.task_detail}</p>
                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={submissionDetails}
                                onChange={(e) => setSubmissionDetails(e.target.value)}
                                placeholder="Enter your submission details"
                                required
                                className="textarea textarea-bordered w-full"
                            />
                            <div className="card-actions justify-end">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
