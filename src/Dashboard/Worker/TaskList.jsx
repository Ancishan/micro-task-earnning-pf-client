// // TaskList.js


// import { useLoaderData } from 'react-router-dom';
// import TaskCard from './TaskCard';
// import { useState } from 'react';

// const TaskList = () => {
//     const loadTask = useLoaderData();
//   const [tasks, setTasks] = useState(loadTask);
  
//   return (
//     <div className="p-4">
//         <h2 className='text-3xl font-bold text-center pb-6'>See All Task</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {tasks.map(task => (
//           <TaskCard key={task._id} task={task} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskList;
