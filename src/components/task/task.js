import styles from './task.module.css';
import { Link, useParams } from "react-router-dom";

export const Task = ({id, title }) => {
	const { id: taskId } = useParams();

	const isTaskPage = !!taskId;

	return (
		<li className={styles.task}>
			{isTaskPage ? (
				<p>{title}</p>
			) : (
				<Link to={`task/${id}`}>
					<p className={styles.taskTitle}>{title}</p>
				</Link>
			)}
		</li>
	);
};
