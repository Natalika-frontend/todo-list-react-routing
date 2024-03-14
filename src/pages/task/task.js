import styles from '../main-page/main-page.module.css';
import stylesTaskPage from './task.module.css';
import { Link } from "react-router-dom";

export const TaskPage = () => {
	return (
		<div className={`${styles.container} ${stylesTaskPage.container}`}>
			<h1 className={stylesTaskPage.title}>Задача успешно удалена</h1>
			<h3><Link to={"/"}>Вернуться на главную страницу</Link></h3>
		</div>
	);
};
