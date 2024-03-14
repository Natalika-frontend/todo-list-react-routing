import { useState, useEffect } from 'react';

export const useRequestReadTasks = () => {
	const [todos, setTodos] = useState([]);
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchTodos = () => {
		setIsLoading(true);
		fetch('http://localhost:3015/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
				setFilteredTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false)
			});
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	return { todos, isLoading, fetchTodos };
};
