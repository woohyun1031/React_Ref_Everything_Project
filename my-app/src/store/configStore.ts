import { configureStore  } from '@reduxjs/toolkit';
import user from './modules/user';
import logger from 'redux-logger';


const store = configureStore({ 
  reducer: user,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch