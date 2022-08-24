import {IUser, UserAction, UserActionTypes} from "../../types/user";
import {Dispatch} from "react";
import axios from "axios";
import {} from 'graphql';

interface UserParams {
    name: string;
    password: string
}

export const loginUser = ({name, password} : UserParams) =>{
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

export const fetchUser = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.FETCH_USER});
        const graphqlQuery = {
            "operationName": "getUser",
            "query": `query getUser { user (id: ${user.id}) { id name contacts { name phone } } }`,
            "variables": {}
        };
        const res = await axios.post(`https://mockend.com/VladAvseev/takeoff-task/graphql`, graphqlQuery);
        if (res.data.id) {
            dispatch(({type: UserActionTypes.FETCH_USER_SUCCESS, payload: res.data}));
        } else {
            dispatch({
                type: UserActionTypes.FETCH_USER_ERROR,
                payload: 'Введён неверный пароль или такого пользователя не существует'
            });
        }
    }
}