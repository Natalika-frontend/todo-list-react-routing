import styles from "./footer.module.css";
import { Button } from "../button/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const Footer = ({
						   taskText,
						   setTaskText,
						   isCreating,
						   handleAddButtonClick,
						   isEditing,
						   toggleSearch,
						   isSorting,
						   onChangeSorting,
						   setError
					   }) => {
	return (
		<div className={styles.footer}>
			<input
				type="text"
				value={taskText}
				onChange={({target}) => {
					setTaskText(target.value);
					setError('');
				}}
				placeholder="Введите задачу"
				className={styles.input}
			/>
			<Button disabled={isCreating || taskText.trim() === ''}
					onClick={handleAddButtonClick}>{isEditing ?
				<FontAwesomeIcon icon={faPenToSquare}/> : '+'}
			</Button>
			<Button onClick={toggleSearch}>
				<FontAwesomeIcon icon={faMagnifyingGlass}/>
			</Button>
			<input
				type="checkbox"
				className={styles.sortCheckbox}
				checked={isSorting}
				onChange={onChangeSorting}
			/>
		</div>
	);
};
