import { useState } from "react";

export const useTaskText = () => {
	const [taskText, setTaskText] = useState('');
	return { taskText, setTaskText };
};
