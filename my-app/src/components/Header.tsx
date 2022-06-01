import { Grid, Text, Button } from '../elements/index';
import { useNavigate } from 'react-router-dom';

type HeaderProps = {
	label?: string | undefined;
	placeholder?: string | undefined;
	callback?: (() => {}) | undefined;
	children?: any | undefined;
};

const Header = (props: HeaderProps) => {
	const navigate = useNavigate();
	return (
		<>
			<Grid is_flex>
				<Grid>
					<Text size='24px' bold>
						안녕하세요
					</Text>
				</Grid>

				<Grid is_flex width='50%'>
					<Button
						text='로그인'
						callback={() => {
							navigate('/login');
						}}
					/>
					<Button
						text='회원가입'
						callback={() => {
							navigate('/signup');
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default Header;
