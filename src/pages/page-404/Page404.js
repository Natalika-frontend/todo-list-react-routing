import styles from './page-404.module.css';
import { Link } from "react-router-dom";
export const Page404 = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>404</h1>
			<div className={styles.notFound}>Такой страницы не существует</div>
			<h3><Link to={"/"}>Вернуться на главную страницу</Link></h3>
		</div>
	);
};
