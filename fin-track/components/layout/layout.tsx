"use client";
import { ReactNode } from "react";
import ThemeToggle from "../theme_toggle/theme_toggle";

const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<nav className="p-4 shadow-md flex justify-between items-center bg-light-background dark:bg-dark-background">
				<h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
					FinTrack
				</h1>
				<ThemeToggle />
			</nav>
			<div className="p-4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
				{children}
			</div>
		</>
	);
};

export default Layout;
