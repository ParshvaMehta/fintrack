"use client";
import Layout from "@/components/layout/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Layout>
			{children}
			<ToastContainer />
		</Layout>
	);
}
