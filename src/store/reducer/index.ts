import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {contactReducer} from "./contactReduser";


export const rootReducer = combineReducers({
    user: userReducer,
    contact: contactReducer
});

export type RootState = ReturnType<typeof rootReducer>;