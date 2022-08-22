import {UserAction, UserActionTypes} from "../../types/user";
import {Dispatch} from "react";
import axios from "axios";

interface UserParams {
    name: string;
    password: string
}

export const fetchUser = ({name, password} : UserParams) =>{
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const res = await axios.get(
                `https://mockend.com/org/takeoff-task/user?name_contains=${name}&password_contains=${password}`
            );
            console.log(res);
            dispatch(({type: UserActionTypes.FETCH_USER_SUCCESS, payload: res.data}));
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Введён неверный пароль или такого пользователя не существует'
            });
        }
    }
}

export const createUser = ({name, password} : UserParams) =>{
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const res = await axios.get('');
            dispatch(({type: UserActionTypes.FETCH_USER_SUCCESS, payload: res.data}));
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Пользователь с таким именем уже существует'
            });
        }
    }
}