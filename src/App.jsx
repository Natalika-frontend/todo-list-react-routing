import styles from './App.module.css';
import { useEffect, useState } from "react";

function App() {
	const [taskText, setTaskText] = useState('');
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isCreating, setIsCreating] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	useEffect(() => {
		fetchTodos();
	}, []);

	const fetchTodos = () => {
		setIsLoading(true);
		fetch('http://localhost:3015/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => {
				setIsLoading(false)
			});
	};

	const requestAddTask = (taskText) => {
		// console.log(taskText);
		setIsCreating(true);
		fetch('http://localhost:3015/todos', {
			method: 'POST',
			headers: {'Content-Type': 'application/json; charset=utf-8'},
			body: JSON.stringify({
				title: taskText,
				complete: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				fetchTodos();
				setTaskText('');
			})
			.finally(() => setIsCreating(false));
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

	return (
		<div className={styles.app}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h1>Список задач</h1>
				</div>
				<div className={styles.taskList}>
					{isLoading
						? <div className={styles.loader}></div>
						: todos.map(({id, title}) => (
							<div key={id} className={styles.task}>{title}
								<button className={styles.btnDelete} disabled={isDeleting}
										onClick={() => requestDeleteTask(id)}>Удалить
								</button>
							</div>
						))
					}
				</div>
				<div className={styles.footer}>
					<input
						type="text"
						value={taskText}
						onChange={({target}) => setTaskText(target.value)}
						placeholder="Введите задачу"
						className={styles.input}
					/>
					<button className={styles.btn} disabled={isCreating} onClick={() => {
						if (taskText.trim() !== '') {
							requestAddTask(taskText);
						}
					}}>+
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
