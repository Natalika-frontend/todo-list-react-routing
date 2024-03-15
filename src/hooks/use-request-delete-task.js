import { useState } from "react";

export const useRequestDeleteTask = (fetchTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [redirectToTaskDelete, setRedirectToTaskDelete] = useState(false);

	const requestDeleteTask = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3015/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				setIsDeleted(true);
				setRedirectToTaskDelete(true);
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
		redirectToTaskDelete
	};
};
