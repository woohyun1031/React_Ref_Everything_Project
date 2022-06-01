import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';

const App = () => {
	return (
		<>
			<Router>
				<Routes>
					<Route path='/' element={<PostList />} />
				</Routes>
			</Router>
		</>
	);
};

export default App;
