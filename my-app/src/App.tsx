import { Route, Routes, useNavigate } from 'react-router-dom';
import PostList from './pages/PostList';

import { Grid, FloatButton } from './elements/index';

import Login from './pages/Login';
import Header from './components/Header';
import SignUp from './pages/SignUp';

import { useSelector } from 'react-redux';
import { RootState } from './store/configStore';
import { useEffect } from 'react';
import { getCookie } from './shared/Cookie';
import PostWrite from './pages/PostWrite';

const App = () => {
	const navigate = useNavigate();
	const _isLogin = useSelector((state: RootState) => state.isLogin);
	const _isToken = getCookie('isLogin') ? true : false;

	useEffect(() => {
		if (_isToken) {
			navigate('/');
		} else {
			console.log('notLogin');
		}
	}, [_isLogin, _isToken]);
	return (
		<>
			<Grid>
				<Header _isLogin={_isLogin} />
				<Routes>
					<Route path='/' element={<PostList />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/write' element={<PostWrite />} />
				</Routes>
				{_isLogin ? (
					<FloatButton
						callback={() => {
							navigate('/write');
							console.log('floatbutton click!!');
						}}
					/>
				) : null}
			</Grid>
		</>
	);
};

export default App;
