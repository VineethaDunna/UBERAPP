import { Link } from "react-router-dom";
const Start = () => {
	return (
		<div>
			<div className='bg-cover bg-center bg-[url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Modern_British_LED_Traffic_Light.jpg/640px-Modern_British_LED_Traffic_Light.jpg)] h-screen pt-8 flex flex-col justify-between w-full'>
				<img
					className='  w-20 ml-8'
					src='https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png'
				/>

				<div className='bg-white py-5 px-10  '>
					<h2 className='text-2xl font-bold'>Get Started with Uber</h2>
					<Link
						to='/login'
						className='flex items-center justify-center w-full rounded-lg bg-black text-white py-3 mt-4'>
						continue
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Start;
