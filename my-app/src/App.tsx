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
import PostDetail from './pages/PostDetail';
import TodoTemplate from './components/Template';
import { createGlobalStyle } from 'styled-components';
import PostUpdate from './pages/PostUpdate';

const App = () => {
	const navigate = useNavigate();
	const _isToken = getCookie('isLogin') ? true : false;
	const _isLogin = useSelector((state: RootState) => state.user.isLogin);

	useEffect(() => {
		if (_isToken) {
			navigate('/');
		} else {
			console.log('notLogin');
		}
	}, [_isLogin, _isToken]);
	return (
		<>
			<GlobalStyle />
			<TodoTemplate>
				<Grid>
					<Header _isToken={_isToken} />
					<Routes>
						<Route path='/' element={<PostList />} />
						<Route path='/login' element={<Login />} />
						<Route path='/signup' element={<SignUp />} />
						<Route path='/write' element={<PostWrite />} />
						<Route path='/update/:id' element={<PostUpdate />} />
						<Route path='/post/:id' element={<PostDetail />} />
					</Routes>
					{_isToken ? (
						<FloatButton
							callback={() => {
								navigate('/write');
								console.log('floatbutton click!!');
							}}
						/>
					) : null}
				</Grid>
			</TodoTemplate>
		</>
	);
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

export default App;
