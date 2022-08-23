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
                `https://mockend.com/VladAvseev/takeoff-task/user?name_contains=${name}&password_contains=${password}`
            );
            if (res.data[0].id) {
                dispatch(({type: UserActionTypes.FETCH_USER_SUCCESS, payload: res.data[0]}));
            } else {
                dispatch({
                    type: UserActionTypes.FETCH_USER_ERROR,
                    payload: 'Введён неверный пароль или такого пользователя не существует'
                });
            }
        } catch (e) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Server error',
            });
        }
    }
}

export const removeUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
            dispatch({type: UserActionTypes.REMOVE_USER});
    }
}

export const addContact = () => {

}