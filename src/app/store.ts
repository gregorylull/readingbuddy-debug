import { combineReducers, configureStore, createAsyncThunk } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { api } from './apiSlice';
import { useDispatch, useSelector } from 'react-redux';

const rootReducer = combineReducers({
    [api.reducerPath]: api.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState, // for testing
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(api.middleware);
        },
    });
};

export const store = setupStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
}>();
