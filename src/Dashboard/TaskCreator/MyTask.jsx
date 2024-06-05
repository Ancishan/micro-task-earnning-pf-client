import { useState, useEffect } from 'react';
import useAuth from '../../hooks/UseAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic'; // Adjust the import path accordingly
import { MdDelete, MdEditNote } from 'react-icons/md';

const MyTask = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        if (user) {
            axiosPublic.get(`/tasks/${user.email}`)
                .then((res) => {
                    setTasks(res.data);
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(() => setLoading(false)); // Handle potential errors
        }
    }, [user, axiosPublic]);

    const handleUpdate = (taskId, updatedTask) => {
        axiosPublic.put(`/tasks/${taskId}`, updatedTask)
            .then(() => {
                setTasks(tasks.map(task => (task._id === taskId ? { ...task, ...updatedTask } : task)));
                setEditingTask(null); // Close edit form
            })
            .catch(error => console.error('Error updating task:', error));
    };

    const handleDelete = (taskId) => {
        axiosPublic.delete(`/tasks/${taskId}`)
            .then(() => {
                setTasks(tasks.filter(task => task._id !== taskId));
            })
            .catch(error => console.error('Error deleting task:', error));
    };

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
                        <th>Actions</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                            <tr key={task._id}>
                                <th>{index + 1}</th>
                                <td>
                                    {editingTask && editingTask._id === task._id ? (
                                        <input
                                            type="text"
                                            value={editingTask.task_title}
                                            onChange={(e) => setEditingTask({ ...editingTask, task_title: e.target.value })}
                                        />
                                    ) : (
                                        task.task_title
                                    )}
                                </td>
                                <td>
                                    {editingTask && editingTask._id === task._id ? (
                                        <input
                                            type="text"
                                            value={editingTask.task_detail}
                                            onChange={(e) => setEditingTask({ ...editingTask, task_detail: e.target.value })}
                                        />
                                    ) : (
                                        task.task_detail
                                    )}
                                </td>
                                <td>
                                    {editingTask && editingTask._id === task._id ? (
                                        <input
                                            type="number"
                                            value={editingTask.task_quantity}
                                            onChange={(e) => setEditingTask({ ...editingTask, task_quantity: e.target.value })}
                                        />
                                    ) : (
                                        task.task_quantity
                                    )}
                                </td>
                                <td>
                                    {editingTask && editingTask._id === task._id ? (
                                        <input
                                            type="number"
                                            value={editingTask.payable_amount}
                                            onChange={(e) => setEditingTask({ ...editingTask, payable_amount: e.target.value })}
                                        />
                                    ) : (
                                        task.payable_amount
                                    )}
                                </td>
                                <td className='text-xl '>
                                    {editingTask && editingTask._id === task._id ? (
                                        <>
                                            <button onClick={() => handleUpdate(task._id, editingTask)}>Save</button>
                                            <button className='pl-6' onClick={() => setEditingTask(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => setEditingTask(task)}><MdEditNote /></button>
                                            <button className='pl-6' onClick={() => handleDelete(task._id)}><MdDelete /></button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">Task not found</td>
                        </tr>
                    )}
                </tbody>

             
            </table>
        </div>
    );
};

export default MyTask;
