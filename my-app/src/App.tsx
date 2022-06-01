import { Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';

import { Grid } from './elements/index';

import Login from './pages/Login';
import Header from './components/Header';
import SignUp from './pages/SignUp';

const App = () => {
	return (
		<>
			<Grid>
				<Header />

				<Routes>
					<Route path='/' element={<PostList />} />
					<Route path='/login' element={<Login />} />
					<Route path='/signup' element={<SignUp />} />
				</Routes>
			</Grid>
		</>
	);
};

export default App;
