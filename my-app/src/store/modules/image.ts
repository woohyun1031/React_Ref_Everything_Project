import { createSlice } from '@reduxjs/toolkit';


//initialState
const initialState= {
	image_url:'',
  uploading:true,
  preview:''
};

export const image = createSlice({
	name: 'post',
	initialState,	
  reducers:{    
		uploadComplete : (state,actions) => {			
			state.image_url = actions.payload
      state.preview = ''
			state.uploading = true;      
		},
    uploading : (state) => {						
			state.uploading = false;      
		},
    setPreviewUrl : (state,actions) => {
      state.preview = actions.payload			      
    },    
  },
	},
);

export const {uploadComplete, uploading,setPreviewUrl } = image.actions;
export default image.reducer;
