import { configureStore  } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from './modules/user';
import post from './modules/post';
import image from './modules/image';
import comment from './modules/comment';
import component from './modules/component';


const store = configureStore({ 
  reducer: {user,post,image,comment,component},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch