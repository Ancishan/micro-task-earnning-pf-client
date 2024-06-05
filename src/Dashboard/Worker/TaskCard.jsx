import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { _id, task_title, createdBy, completion_date, payable_amount, task_quantity } = task;
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title">{task_title}</h3>
        <p>Creator: {createdBy}</p>
        <p>Completion Date: {completion_date}</p>
        <p>Payable Amount: {payable_amount}</p>
        <p>Quantity: {task_quantity}</p>
        <div className="card-actions justify-end">
          <Link to={`/dashboard/view/${_id}`} className="btn btn-outline btn-warning">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
