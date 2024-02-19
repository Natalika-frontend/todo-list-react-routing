import styles from './App.module.css';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownAZ, faMagnifyingGlass, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useRequestAddTask, useRequestDeleteTask, useRequestUpdateTask } from './hooks';

function App() {

	const [taskText, setTaskText] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [sortedTodos, setSortedTodos] = useState([]);
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const [isSearching, setIsSearching] = useState(false);
	const [isSorting, setIsSorting] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

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

	const { requestAddTask, isCreating, error: addTaskError } = useRequestAddTask(fetchTodos, todos, setTaskText, setIsSearching);
	const { isDeleting, requestDeleteTask } = useRequestDeleteTask(fetchTodos);
	const { isEditing, editingTaskId, requestUpdateTask, setIsEditing, setEditingTaskId } = useRequestUpdateTask( fetchTodos, todos, taskText, setTaskText);

	useEffect(() => {
		if (taskText.trim() === '') {
			setFilteredTodos(todos);
		} else {
			const filtered = todos.filter(todo => todo.title.toLowerCase().includes(taskText.toLowerCase()));
			setFilteredTodos(filtered);
		}
	}, [taskText, todos]);

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

	const handleSearch = _.debounce((searchQuery) => {
		setIsSearching(true);
		const filtered = todos.filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase().trim()));
		setFilteredTodos(filtered);
	}, 1000);

	const handleSearchButtonClick = () => {
		handleSearch(taskText);
		setIsSearching(false);
		setTaskText('');
	};

	const handleSortButtonClick = () => {
		setIsSorting(true);
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setFilteredTodos(sortedTodos);
		setSortedTodos(sortedTodos);
	};

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Список задач</h1>
				</div>
				{addTaskError && <div className={styles.error}>Такая задача уже есть</div>}
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
							setIsSorting(false);
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
