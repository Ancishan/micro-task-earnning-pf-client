import { useState, useEffect } from 'react';
import useAuth from '../../hooks/UseAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const MyTask = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [tasks, setTask] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axiosPublic.get(`/tasks/${user.email}`)
                .then((res) => {
                    setTask(res.data);
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(() => setLoading(false)); // Handle potential errors
        }
    }, [user, axiosPublic]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* Table Head */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Task Title</th>
                        <th>Task Detail</th>
                        <th>Quantity</th>
                        <th>Payable Amount</th>
                        <th>Completion Date</th>
                        <th>Submission Info</th>
                        <th>Image</th>
                        <th>Created By</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>{task.task_title}</td>
                                <td>{task.task_detail}</td>
                                <td>{task.task_quantity}</td>
                                <td>{task.payable_amount}</td>
                                <td>{task.completion_date}</td>
                                <td>{task.submission_info}</td>
                                <td>
                                    <img src={task.task_image_url} alt="Task" className="w-12 h-12 object-cover" />
                                </td>
                                <td>{task.createdBy}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9">Task not found</td>
                        </tr>
                    )}
                </tbody>
               
            </table>
        </div>
    );
};

export default MyTask;
