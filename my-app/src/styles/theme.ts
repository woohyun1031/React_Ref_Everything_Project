const colors = {
  //font
	title: '#000000',
  subTitle:'#626262',
  blueTitle:'#718AFF',  
  //side_bar
  side_title: '#585858',
  side_border: '#e9e9e9',
  side_background:'#FFFFFF',  
  side_background_hover:'#e9e9e9',
	//button
  button_title: '#738cff',
  button_background: '#ffffff',
  button_hover: '#f4f4f4',
  button_active: '#e1e1e1',
  //modal
  modal_button_title: '#ffffff',
  modal_button_background: '#718aff',
  modal_border: '#e9e9e9',
  //reject
  reject: '#D97E7E',
  //background
  background: '#FFFFFF',  
  subBackground:"#F8F8F8",
  
};

const commons = {
  blur_background: `
  background-color: rgba(0, 0, 0, 0.1);
	backdrop-filter: blur(2px);
  `,
}



const fontSizes = {
  titleSize:'30px',
  xxxlg:'26px',
  xxlg:'24px',
  xlg:'20px',
  large:'18px',
  base:'14px',
  small:'13px',
  xs:'12px',
};

const theme = {
	colors,  
  fontSizes,  
  commons,
};


export default theme;
