import React, { useContext, useState, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({ children }) => {
	const token = localStorage.getItem("token");
	const navigate = useNavigate();
	const { captain, setCaptain } = useContext(CaptainDataContext);
	const [isLoading, setIsLoading] = useState(CaptainDataContext);

	console.log(token);
	useEffect(() => {
		if (!token) {
			navigate("/login");
		}
	}, [token]);

	axios
		.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((response) => {
			if (response.status === 200) {
				const data = response.data;
				setCaptain(data.captain);
				setIsLoading(false);
			}
		})
		.catch((error) => {
			console.log(error);
			navigate("/captain-login");
		});

	if (isLoading) return <div>Loading...</div>;

	return <>{children}</>;
};

export default CaptainProtectedWrapper;
