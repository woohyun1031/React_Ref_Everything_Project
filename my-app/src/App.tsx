import { Route, Routes, useNavigate } from 'react-router-dom';
import PostList from './pages/PostList';

import { Grid, FloatButton } from './elements/index';

import Login from './pages/Login';
import Header from './components/Header';
import SignUp from './pages/SignUp';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/configStore';
import { useEffect } from 'react';
import { getCookie } from './shared/Cookie';
import PostWrite from './pages/PostWrite';
import PostDetail from './pages/PostDetail';
import Template from './components/Template';
import { createGlobalStyle } from 'styled-components';
import PostUpdate from './pages/PostUpdate';
import { getUserInfo } from './store/modules/user';
import SideBar from './components/SideBar';

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const _isLogin = useSelector((state: RootState) => state.user.isLogin);

	useEffect(() => {
		dispatch(getUserInfo());
		if (_isLogin) {
			navigate('/');
		} else {
			console.log('notLogin');
		}
	}, [_isLogin]);
	return (
		<>
			<Header _isLogin={_isLogin} />
			<GlobalStyle />
			<Template>
				<SideBar />
				<Grid width='100%' margin='0% 0% 0% 20%'>
					<Routes>
						<Route path='/' element={<PostList />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/write' element={<PostWrite />} />
						<Route path='/update/:id' element={<PostUpdate />} />
						<Route path='/post/:id' element={<PostDetail />} />
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
			</Template>
		</>
	);
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

export default App;
