"use client";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
	const [theme, setTheme] = useState(
		typeof window !== "undefined" && localStorage.getItem("theme") === "dark"
			? "dark"
			: "light"
	);

	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(theme === "dark" ? "light" : "dark");
		root.classList.add(theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-dark-text"
		>
			Toggle Theme
		</button>
	);
};

export default ThemeToggle;
