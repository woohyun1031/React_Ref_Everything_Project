import { DefaultTheme } from 'styled-components'; //ts

const colors = {
	//font
	title: '#dbdbdb',
	subTitle: '#dbdbdb',
	blueTitle: '#718AFF',
	//Header
	header_border: '#333333',
	//side_bar
	side_title: '#dbdbdb',
	side_border: '#333333',
	side_background: '#121212',
	side_background_hover: '#e9e9e9',
	//button
	button_title: '#738cff',
	button_background: '#121212',
	button_hover: '#f4f4f4',
	button_active: '#e1e1e1',
	//modal
	modal_button_title: '#121212',
	modal_button_background: '#718aff',
	modal_border: '#333333',
	//reject
	reject: '#D97E7E',
	//background
	background: '#121212',
	subBackground: '#1e1e1e',
	//border
	border: '1px #000000 solid',
};

const commons = {
	blur_background: `
  background-color: rgba(219,219,219, 0.1);
	backdrop-filter: blur(2px);
  `,
	button_event: `  
  :hover {
    background-color: #292929;
  } 
  :active {
    background-color: #3d3d3d;
  }
`,
};

const darkTheme: DefaultTheme = {
	colors,
	commons,
};

export default darkTheme;
