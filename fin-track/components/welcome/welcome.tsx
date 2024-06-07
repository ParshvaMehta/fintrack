import React from "react";

interface WelcomeProps {
	name: string; // Define an interface for props
}

const Welcome: React.FC<WelcomeProps> = ({ name }) => {
	return (
		<div>
			<h1>Welcome to {name}'s Fintech App!</h1>
		</div>
	);
};

export default Welcome;
