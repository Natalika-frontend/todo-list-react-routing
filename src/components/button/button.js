import styles from "./button.module.css";

export const Button = ({ onClick, disabled, children }) => {
	return (
		<button className={styles.btn} onClick={onClick} disabled={disabled}>
			{children}</button>
	);
};
