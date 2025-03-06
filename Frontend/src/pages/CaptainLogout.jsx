import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	console.log("logout");
	console.log(token);
	console.log(localStorage.getItem("token"));

	axios
		.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		.then((response) => {
			if (response.status === 200) {
				localStorage.removeItem("token");
				navigate("/captain-login");
			}
		});
	return <div>Captain logout</div>;
};

export default CaptainLogout;
