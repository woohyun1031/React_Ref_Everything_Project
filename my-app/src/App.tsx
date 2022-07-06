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

import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import darkTheme from './styles/darkTheme';

import PostUpdate from './pages/PostUpdate';
import { getUserInfo } from './store/modules/user';
import SideBar from './components/SideBar';
import NotLogin from './pages/NotLogin';
import Modal from './modals/Modal';
import { closeModal } from './store/modules/modal';
import RedirectPage from './components/RedirectPage';

const App = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const _isLogin = useSelector((state: RootState) => state.user.isLogin);
	const _isDark = useSelector((state: RootState) => state.user.isDark);

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
			<ThemeProvider theme={_isDark ? darkTheme : theme}>
				<GlobalStyle />
				<Header _isLogin={_isLogin} _isDark={_isDark} />
				<Template>
					<SideBar _isLogin={_isLogin} />
					<Grid width='100%' margin='0% 0% 0% 210px'>
						<Routes>
							<Route
								path='/'
								element={_isLogin ? <PostList /> : <NotLogin />}
							/>
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
							<Route path='/externalLink/:id' element={<RedirectPage />} />
							<Route path='/login' element={<Login />} />
							<Route path='/signup' element={<SignUp />} />
						</Routes>
					</Grid>
				</Template>
				<Modal />
			</ThemeProvider>
		</>
	);
};

export default App;
