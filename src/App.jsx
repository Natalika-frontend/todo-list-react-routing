import styles from './App.module.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { TaskDetails } from "./pages/task-details/task-details";
import { Page404 } from "./pages/page-404/Page404";
import { TaskDelete } from "./pages/task/task";
import { useTaskText } from "./hooks";

function App() {
	const { taskText, setTaskText } = useTaskText();

	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage taskText={taskText} setTaskText={setTaskText} />} />
				<Route path="/task/task-delete" element={<TaskDelete />} />
				<Route path="/task/:id" element={<TaskDetails taskText={taskText} setTaskText={setTaskText} />} />
				<Route path="*" element={<Page404/>} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
}

export default App;
