import styles from './App.module.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
	const [taskText, setTaskText] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [sortedTodos, setSortedTodos] = useState([]);
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editingTaskId, setEditingTaskId] = useState(null);
	const [isSearching, setIsSearching] = useState(false);
	const [isSorting, setIsSorting] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		fetchTodos();
	}, []);

	useEffect(() => {
		if (taskText.trim() === '') {
			setFilteredTodos(todos);
		} else {
			const filtered = todos.filter(todo => todo.title.toLowerCase().includes(taskText.toLowerCase()));
			setFilteredTodos(filtered);
		}
	}, [taskText, todos]);

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
				setTaskText('');
			})
			.finally(() => {
				setIsCreating(false);
				setIsSearching(false);
			});
	};

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

	const handleEditTask = (id, title) => {
		setIsEditing(true)
		setEditingTaskId(id);
		setTaskText(title);
	};

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
			if (editingTaskId !== null) {
				requestUpdateTask(editingTaskId);
			} else {
				requestAddTask(taskText);
			}
		}
	};

	const requestUpdateTask = (id) => {
		const updatedTodo = todos.find(todo => todo.id === id);
		if (updatedTodo) {
			updatedTodo.title = taskText;
			fetch(`http://localhost:3015/todos/${id}`, {
				method: 'PUT',
				headers: {'Content-Type': 'application/json; charset=utf-8'},
				body: JSON.stringify(updatedTodo),
			})
				.then(() => {
					fetchTodos();
					setEditingTaskId(null);
				})
				.finally(() => {
					setTaskText('');
					setIsEditing(false);
					setIsSearching(false);
				});
		}
	};

	const handleSearchButtonClick = () => {
		setIsSearching(true);
		const filtered = todos.filter(todo => todo.title.toLowerCase().includes(taskText.toLowerCase().trim()));
		setFilteredTodos(filtered);
		setError('');
	};

	const handleSortButtonClick = () => {
		setIsSorting(true);
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setFilteredTodos(sortedTodos);
		setSortedTodos(sortedTodos);
		setError('');
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Список задач</h1>
				</div>
				{error && <div className={styles.error}>Такая задача уже есть</div>}
				<ul className={styles.taskList}>
					{isLoading
						? <div className={styles.loader}></div>
						: (isSorting || isSearching ? filteredTodos : todos).map(({id, title}) => (
							<li key={id} className={styles.task}>
								<p>{title}</p>
								<button className={styles.btn} onClick={() => handleEditTask(id, title)}>
									<FontAwesomeIcon icon={faPenToSquare}/></button>
								<button className={styles.btn} disabled={isDeleting}
										onClick={() => requestDeleteTask(id)}>Удалить
								</button>
							</li>
						))
					}
				</ul>
				<div className={styles.footer}>
					<input
						type="text"
						value={taskText}
						onChange={({target}) => {
							setTaskText(target.value);
							setIsSearching(false);
							setIsSorting(false);
							setError('');
						}}
						placeholder="Введите задачу"
						className={styles.input}
					/>
					<button className={styles.btn} disabled={isCreating || taskText.trim() === ''}
							onClick={handleAddButtonClick}>{isEditing ?
						<FontAwesomeIcon icon={faPenToSquare}/> : '+'}</button>
					<button className={styles.btn} onClick={handleSearchButtonClick}><FontAwesomeIcon
						icon={faMagnifyingGlass}/></button>
					<button className={styles.btn} onClick={handleSortButtonClick}><FontAwesomeIcon
						icon={faArrowDownAZ}/></button>
				</div>
			</div>
		</div>
	);
}

export default App;
