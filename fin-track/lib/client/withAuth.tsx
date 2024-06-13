import { useRouter } from "next/navigation";
import { useEffect } from "react";
import storageService from "./storage";

const withAuth = (WrappedComponent: React.ComponentType) => {
	const AuthenticatedComponent = (props: any) => {
		const router = useRouter();
		const token = storageService.getItem("token");

		useEffect(() => {
			if (!token) {
				router.replace("/auth/login");
			}
		}, [token, router]);

		if (!token) {
			return null; // or a loading spinner or message
		}

		return <WrappedComponent {...props} />;
	};

	return AuthenticatedComponent;
};

export default withAuth;
