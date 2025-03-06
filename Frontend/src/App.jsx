import { Routes, Route } from "react-router-dom";

import { useContext } from "react";
import UserLogout from "./pages/UserLogout.jsx";
import Home from "./pages/Home.jsx";

import UserLogin from "./pages/UserLogin.jsx";
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import Start from "./pages/Start.jsx";
import CaptainHome from "./pages/CaptainHome.jsx";
import { UserDataContext } from "./context/UserContext.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx";
import CaptainProtectedWrapper from "./pages/CaptainProtectedWrapper.jsx";
import CaptainLogout from "./pages/CaptainLogout.jsx";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path='/' element={<Start />} />
				<Route path='/login' element={<UserLogin />} />
				<Route path='/signup' element={<UserSignup />} />
				<Route path='/captain-login' element={<CaptainLogin />} />
				<Route path='/captain-signup' element={<CaptainSignup />} />
				<Route
					path='/home'
					element={
						<UserProtectedWrapper>
							<Home />
						</UserProtectedWrapper>
					}
				/>
				<Route
					path='/user/logout'
					element={
						<UserProtectedWrapper>
							<UserLogout />
						</UserProtectedWrapper>
					}
				/>
				<Route
					path='/captain-home'
					element={
						<CaptainProtectedWrapper>
							<CaptainHome />
						</CaptainProtectedWrapper>
					}
				/>
				<Route
					path='/captain-logout'
					element={
						<CaptainProtectedWrapper>
							<CaptainLogout/>
						</CaptainProtectedWrapper>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
