import styles from "./main-page.module.css";
import { Task } from "../../components/task/task";
import { Search } from "../../components/searh/search";
import { useEffect, useState } from "react";
import { Header } from "../../components/header/header";
import { Footer } from "../../components/footer/footer";
import { useRequestCreateTask, useRequestReadTasks } from "../../hooks";

export const MainPage = ({taskText, setTaskText}) => {
	const [searchPhrase, setSearchPhrase] = useState('');
	const [filteredTodos, setFilteredTodos] = useState([]);
	const [showSearch, setShowSearch] = useState(false);

	const [isSearching, setIsSearching] = useState(false);
	const [isSearch, setIsSearch] = useState(false);
	const [isSorting, setIsSorting] = useState(false);

	const {todos, isLoading, fetchTodos} = useRequestReadTasks();

	const {
		requestAddTask,
		isCreating,
		error: addTaskError,
		setError,
	} = useRequestCreateTask(fetchTodos, todos, setTaskText, setIsSearching);

	const handleAddButtonClick = () => {
		if (taskText.trim() !== '') {
			requestAddTask(taskText);
		}
	};

	const onChangeSorting = ({target}) => {
		setIsSorting(target.checked);
		const sortedTodos = [...todos].sort((a, b) => a.title.localeCompare(b.title));
		setFilteredTodos(sortedTodos);
		setError('');
	};

	const toggleSearch = () => {
		setShowSearch(!showSearch);
		setIsSearch(!isSearch);
		setError('');
	};

	const handleSearch = (searchValue) => {
		setSearchPhrase(searchValue);
	};

	useEffect(() => {
		const filtered = todos.filter(({title}) =>
			title.toLowerCase().includes(searchPhrase.toLowerCase())
		);
		setFilteredTodos(filtered);
	}, [searchPhrase, todos]);

	return (
		<div className={styles.container}>
			<Header headerTitle={"Список задач"}/>
			{addTaskError && <div className={styles.error}>Такая задача уже есть</div>}
			<ul className={`${styles.taskList} ${styles.scrollableContainer}`}>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					((isSearch || isSorting) ? filteredTodos : todos).map(({id, title}) => (
						<Task key={id}
							  id={id}
							  title={title}/>
					)))
				}
			</ul>
			{showSearch && (
				<Search onSearch={handleSearch} setIsSearching={setIsSearching}/>
			)}
			<Footer taskText={taskText}
					setTaskText={setTaskText}
					isCreating={isCreating}
					handleAddButtonClick={handleAddButtonClick}
					toggleSearch={toggleSearch}
					isSorting={isSorting}
					onChangeSorting={onChangeSorting}
					setError={setError}/>
		</div>
	);
};
