import { useState } from "react";

export const useRequestDeleteTask = (fetchTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const requestDeleteTask = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3015/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setIsDeleted(true);
				window.location.href = '/task';
			})
			.finally(() => {
				fetchTodos();
				setIsDeleting(false);
				setIsDeleted(false);
			});
	};

	return {
		isDeleting,
		isDeleted,
		requestDeleteTask,
	};
};
