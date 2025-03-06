import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignup = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userData, setUserData] = useState({});
	const [vehicleColor, setVehicleColor] = useState("");
	const [vehiclePlate, setVehiclePlate] = useState("");
	const [vehicleCapacity, setVehicleCapacity] = useState("");
	const [vehicleType, setVehicleType] = useState("");

	const { captain, setCaptain } = useContext(CaptainDataContext);

	const submitHandler = async (e) => {
		e.preventDefault();
		const captainData = {
			fullname: {
				firstname: firstName,
				lastname: lastName,
			},
			email: email,
			password: password,
			vehicle: {
				color: vehicleColor,
				plate: vehiclePlate,
				capacity: vehicleCapacity,
				vehicleType: vehicleType,
			},
		};

		const response = await axios.post(
			`${import.meta.env.VITE_BASE_URL}/captains/register`,
			captainData
		);
		if (response.status === 201) {
			const data = response.data;
			setCaptain(data.captain);
			localStorage.setItem("token", data.token);
			navigate("/captain-home");
		}
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
		setVehicleCapacity("");
		setVehicleColor("");
		setVehicleType("");
		setVehiclePlate("");
	};
	return (
		<div className='p-5  flex flex-col  justify-between h-screen bg-[#f7f7f7]'>
			<div>
				<img
					className='  w-20 mb-5'
					src='https://pngimg.com/d/uber_PNG24.png'
				/>
				<form onSubmit={submitHandler}>
					<h3 className=' w-1/2  font-medium  mb-3 '>
						What's our Captain's name
					</h3>
					<div className='flex gap-2 mb-3 '>
						<input
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='first name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
						<input
							className='font-medium w-1/2   bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='last name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
					<h3 className=' w-1/2 font-medium  mb-3 '>
						What's our captain's email
					</h3>

					<input
						className='font-medium w-1/2 bg-[#eeeeee] mb-3  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
						type='email'
						placeholder='uber@gmail.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<h3 className=' font-medium mb-3 '>What's your password</h3>
					<input
						className='font-medium mb-3 w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
						type='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<h3 className=' w-1/2 font-medium  mb-2 '>Vehicle Information</h3>
					<div className='flex gap-2 mb-3'>
						<input
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='Vehicle Color'
							value={vehicleColor}
							onChange={(e) => setVehicleColor(e.target.value)}
							required
						/>
						<input
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='Vehicle Plate'
							value={vehiclePlate}
							onChange={(e) => setVehiclePlate(e.target.value)}
							required
						/>
					</div>
					<div className='flex gap-2 mb-3'>
						<input
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='Vehicle Capacity'
							value={vehicleCapacity}
							onChange={(e) => setVehicleCapacity(e.target.value)}
							required
						/>
						<select
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							value={vehicleType}
							onChange={(e) => setVehicleType(e.target.value)}
							required>
							<option value='' disabled>
								Select Vehicle Type
							</option>
							<option value='car'>Car</option>
							<option value='van'>Van</option>
							<option value='auto'>Auto</option>
							<option value='motorcycle'>Motorcycle</option>
						</select>
					</div>
					<button
						className='bg-[#111] text-white font-semibold mt-5 mb-7 rounded px-4 py-2 flex items-center w-full justify-center '
						type='submit'>
						Create Captain Account
					</button>
					<p className='text-center font-bold'>
						Already have an account?
						<Link to='/captain-login' className='text-blue-600 ml-2'>
							Log in here
						</Link>
					</p>
				</form>
			</div>

			<div>
				<p className='text-[12px] text-center'>
					This site is protected by reCAPTCHA and the
					<span className='underline'>Google Privacy Policy</span> and{" "}
					<span className='underline'>Terms of Service</span> apply.
				</p>
			</div>
		</div>
	);
};

export default CaptainSignup;
