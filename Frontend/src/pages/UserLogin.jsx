import React, { useState } from "react";
import { Link } from "react-router-dom";
const UserLogin = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [userData, setUserData] = useState({});

	const submitHandler = (e) => {
		e.preventDefault();
		setUserData({ email: email, password: password });
		console.log(userData.email);
		setEmail("");
		setPassword("");
	};
	return (
		<div className='p-5  flex flex-col  justify-between h-screen bg-[#f7f7f7]'>
			<div>
				
                <img
					className='  w-20 mb-5'
					src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
				/>
				<form onSubmit={submitHandler}>
					<h3 className=' text-xl font-medium  mb-2 '>What's your email</h3>
					<input
						className='font-medium  bg-[#eeeeee] mb-7 px-4 border w-full text-lg outline-none p-2 rounded '
						type='email'
						placeholder='uber@gmail.com'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
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
						New here?
						<Link to='/signup' className='text-blue-600 ml-2'>
							Create new Account
						</Link>
					</p>
				</form>
			</div>

			<Link
				to='/captain-login'
				className=' bg-[#10b461] text-white font-semibold mb-7  rounded px-4 py-2 flex items-center w-full justify-center '
				type='submit'>
				Sign in as Captain
			</Link>
		</div>
	);
};

export default UserLogin;
