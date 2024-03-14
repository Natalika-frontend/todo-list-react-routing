import { useState } from "react";

export const useRequestUpdateTask = (fetchTodos, todos, taskText, setTaskText) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState(null);

	const requestUpdateTask = (id) => {
		const updatedTodoIndex = todos.findIndex(todo => todo.id === id);
		if (updatedTodoIndex !== -1) {
			const updatedTodos = [...todos];
			updatedTodos[updatedTodoIndex] = {
				...updatedTodos[updatedTodoIndex],
				title: taskText
			};
			fetch(`http://localhost:3015/todos/${id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify(updatedTodos[updatedTodoIndex]),
			})
				.then(() => {
					fetchTodos();
					setEditingTaskId(null);
				})
				.finally(() => {
					setTaskText('');
					setIsEditing(false);
				});
		}
	};

	return {
		taskText,
		isEditing,
		editingTaskId,
		requestUpdateTask,
		setIsEditing,
		setEditingTaskId,
		setTaskText,
	};
};
