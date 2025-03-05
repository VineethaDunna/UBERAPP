import React, { useState } from "react";

import { Link } from "react-router-dom";

const UserSignup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userData, setUserData] = useState({});
	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({
			fullname: {
				firstName: firstName,
				lastName: lastName,
			},
			email: email,
			password: password,
		});
		console.log(userData);
		setEmail("");
		setPassword("");
		setFirstName("");
		setLastName("");
	};
	return (
		<div className='p-5  flex flex-col  justify-between h-screen bg-[#f7f7f7]'>
			<div>
				<img
					className='  w-20 mb-5'
					src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
				/>
				<form onSubmit={submitHandler}>
					<h3 className=' w-1/2  font-medium  mb-2 '>What's your name</h3>
					<div className='flex gap-2  '>
						<input
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='first name'
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
						<input
							className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
							type='text'
							placeholder='last name'
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</div>
					<h3 className=' w-1/2 font-medium  mb-2 '>What's your email</h3>

					<input
						className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
						type='email'
						placeholder='uber@gmail.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<h3 className=' font-medium mb-2 '>What's your password</h3>
					<input
						className='font-medium w-1/2 bg-[#eeeeee]  px-4 py-2  w-full text-medium placeholder:text-sm  rounded '
						type='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						className='bg-[#111] text-white font-semibold mt-5 mb-7 rounded px-4 py-2 flex items-center w-full justify-center '
						type='submit'>
						Login
					</button>
					<p className='text-center font-bold'>
						Already have an account?
						<Link to='/login' className='text-blue-600 ml-2'>
							Log in here
						</Link>
					</p>
				</form>
			</div>

			<div>
				<p className='text-[12px] text-center'>
					By proceeding, you consent to get calls, whatsapp or SMS messages,
					including by automated means, from Uber and its afiliates to the
					number provided
				</p>
			</div>
		</div>
	);
};

export default UserSignup;
