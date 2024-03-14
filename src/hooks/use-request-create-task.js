import { useState } from 'react';

export const useRequestCreateTask = (fetchTodos, todos, setTaskText, setIsSearching) => {
	const [isCreating, setIsCreating] = useState(false);
	const [error, setError] = useState('');

	const requestAddTask = (taskText) => {
		setIsCreating(true);
		setIsSearching(false);

		const isDuplicateTask = todos.some(todo =>
			todo.title.toLowerCase() === taskText.trim().toLowerCase()
		);

		if (isDuplicateTask) {
			setError('Задача уже существует');
			setIsCreating(false);
			return;
		}

		fetch('http://localhost:3015/todos', {
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=utf-8'},
			body: JSON.stringify({
				title: taskText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				fetchTodos();
			})
			.finally(() => {
				setIsCreating(false);
				setTaskText('');
			});
	};
	return { isCreating, error, requestAddTask, setError };
};
