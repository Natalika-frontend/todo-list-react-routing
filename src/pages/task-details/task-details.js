import styles from '../main-page/main-page.module.css';
import taskDetailsStyles from './task-details.module.css';
import { Task } from "../../components/task/task";
import { Button } from "../../components/button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useRequestDeleteTask, useRequestReadTasks, useRequestUpdateTask } from "../../hooks";
import { Header } from "../../components/header/header";
import { useState } from "react";
import { Page404 } from "../page-404/Page404";

export const TaskDetails = () => {
	const [taskText, setTaskText] = useState('');

	const { todos, fetchTodos } = useRequestReadTasks();
	const {
		isEditing,
		requestUpdateTask,
		setIsEditing,
		setEditingTaskId
	} = useRequestUpdateTask(fetchTodos, todos, taskText, setTaskText);

	const { id } = useParams();

	const { isDeleting, isDeleted, requestDeleteTask } = useRequestDeleteTask(fetchTodos);
	const task = todos.find(task => task.id === parseInt(id));
	if (!task) {
		return <Page404 />;
	}
	const { title } = task;

	const handleEditTask = (id, title) => {
		setIsEditing(true);
		setEditingTaskId(id);
		setTaskText(title);
	};

	const handleSaveTask = () => {
		requestUpdateTask(id);
		setIsEditing(false);
	};

	const handleCancelEdit = () => {
		setTaskText(title);
		setIsEditing(false);
	};

	const handleDeleteTask = () => {
		requestDeleteTask(id);
	};

	return (
		<div className={styles.container}>
			<Header headerTitle={"Подробности задачи"}/>
			<Task id={id} title={title}/>
			{isDeleted && <div>Задача успешно удалена</div>}
			{isEditing ? (
				<>
					<input className={taskDetailsStyles.input}
						   type="text"
						   value={taskText}
						   onChange={({ target }) => {
							   setTaskText(target.value);
						   }}
					/>
					<Button onClick={handleSaveTask}><FontAwesomeIcon icon={faPenToSquare}/></Button>
					<Button onClick={handleCancelEdit}>Отменить</Button>
				</>
			) : (
				<>
					<Button onClick={() => handleEditTask(id, title)}>
						<FontAwesomeIcon icon={faPenToSquare}/>
					</Button>
					<Button disabled={isDeleting} onClick={handleDeleteTask}>Удалить</Button>
				</>
			)}
		</div>
	);
};
