import React, { useState } from "react";
import { Link } from "react-router-dom";

const captainlogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [captainData, setCaptainData] = useState({});
	const submitHandler = (e) => {
		e.preventDefault();
		setCaptainData({ email: email, password: password });
		console.log(captainData.email);
		setEmail("");
		setPassword("");
	};
	return (
		<div className='p-5  flex flex-col  justify-between h-screen bg-[#f7f7f7]'>
			<div>
				<img
					className='  w-20 mb-5'
					src='https://pngimg.com/d/uber_PNG24.png'
				/>
				<form onSubmit={submitHandler}>
					<h3 className=' text-xl font-medium  mb-2 '>What's your email</h3>
					<input
						className='font-medium  bg-[#eeeeee] mb-7 px-4 border w-full text-lg outline-none p-2 rounded '
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='uber@gmail.com'
						required
					/>
					<h3 className=' text-xl font-medium mb-2 '>What's your password</h3>
					<input
						className='bg-[#eeeeee] font-medium  mb-7 px-4 border w-full text-lg outline-none p-2 rounded '
						type='password'
						placeholder='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button
						className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 flex items-center w-full justify-center '
						type='submit'>
						Login
					</button>
					<p className='text-center font-bold'>
						Join a fleed?
						<Link to='/captain-signup' className='text-blue-600 ml-2'>
							Register as Captain
						</Link>
					</p>
				</form>
			</div>

			<Link
				to='/login'
				className=' bg-[#d56226] text-white font-semibold mb-7  rounded px-4 py-2 flex items-center w-full justify-center '
				type='submit'>
				Sign in as User
			</Link>
		</div>
	);
};

export default captainlogin;
