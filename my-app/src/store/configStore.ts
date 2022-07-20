import { configureStore  } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import user from './modules/user';
import image from './modules/image';
import component from './modules/component';
import item from './modules/item';
import modal from './modules/modal';


const store = configureStore({ 
  reducer: {user,image,component,item,modal},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch