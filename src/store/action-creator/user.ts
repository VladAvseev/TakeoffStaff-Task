import {IUser, UserAction, UserActionTypes} from "../../types/user";
import {Dispatch} from "react";
import axios from "axios";

interface UserParams {
    name: string;
    password: string
}

export const loginUser = ({name, password} : UserParams) =>{
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            dispatch({type: UserActionTypes.FETCH_USER});
            const res = await axios.get<IUser[]>(
                `http://localhost:3000/users?name=${name}&password=${password}`
            );
            if (res.data.length) {
                dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: res.data[0]});
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

export const regUser = ({name, password}: UserParams) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.FETCH_USER});
        const res = await axios.get(
            `http://localhost:3000/users?name=${name}`
        );
        if (res.data.length) {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Пользователь с таким именем уже существует'
            });
        } else {
            const res = await axios.post<IUser>(`http://localhost:3000/users`, {
                name: name,
                password: password,
                contacts: []
            });
            dispatch(({type: UserActionTypes.FETCH_USER_SUCCESS, payload: res.data}));
        }
    }
}