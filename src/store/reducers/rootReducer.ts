import { userReducer } from './UserReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>