import { Route, Routes, useNavigate } from 'react-router-dom';
import PostList from './pages/PostList';

import { Grid } from './elements/index';

import Login from './pages/Login';
import Header from './components/Header';
import SignUp from './pages/SignUp';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/configStore';
import { useEffect } from 'react';
import PostWrite from './pages/PostWrite';
import PostDetail from './pages/PostDetail';
import Template from './components/Template';
import { createGlobalStyle } from 'styled-components';
import PostUpdate from './pages/PostUpdate';
import { getUserInfo } from './store/modules/user';
import SideBar from './components/SideBar';
import NotLogin from './pages/NotLogin';
import Modal from './modals/Modal';
import { closeModal } from './store/modules/modal';

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const _isLogin = useSelector((state: RootState) => state.user.isLogin);

	useEffect(() => {
		dispatch(getUserInfo());
		if (_isLogin) {
			dispatch(closeModal());
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
				<SideBar _isLogin={_isLogin} />
				<Grid width='100%' margin='0% 0% 0% 15%'>
					<Routes>
						<Route path='/' element={_isLogin ? <PostList /> : <NotLogin />} />
						<Route
							path='/write'
							element={_isLogin ? <PostWrite /> : <NotLogin />}
						/>
						<Route
							path='/update/:id'
							element={_isLogin ? <PostUpdate /> : <NotLogin />}
						/>
						<Route
							path='/post/:id'
							element={_isLogin ? <PostDetail /> : <NotLogin />}
						/>
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
					</Routes>
				</Grid>
			</Template>
			<Modal />
		</>
	);
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

export default App;
