import styles from './App.module.css';
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/main-page/main-page";
import { TaskDetails } from "./pages/task-details/task-details";
import { Page404 } from "./pages/page-404/Page404";
import { TaskPage } from "./pages/task/task";

function App() {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage />}></Route>
				<Route path="/task/:id" element={<TaskDetails />}></Route>
				<Route path="/task-delete" element={<TaskPage />}></Route>
				<Route path="*" element={<Page404/>}></Route>
			</Routes>
		</div>
	);
}

export default App;
