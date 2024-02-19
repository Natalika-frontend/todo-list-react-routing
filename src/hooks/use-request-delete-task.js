import { useState } from "react";

export const useRequestDeleteTask = (fetchTodos) => {
	const [isDeleting, setIsDeleting] = useState(false);
	const requestDeleteTask = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3015/todos/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.finally(() => {
				fetchTodos();
				setIsDeleting(false)
			});
	};

	return {
		isDeleting,
		requestDeleteTask,
	};
};
