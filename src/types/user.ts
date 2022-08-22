import {IContact} from "./comment";

export interface IUser {
    id: number;
    name: string;
    password: string;
    contacts: IContact[];
}

export interface UserState {
    user: IUser | null;
    loading: boolean;
    error: null | string;
}

export enum UserActionTypes {
    REMOVE_USER="REMOVE_USER",
    FETCH_USER = 'FETCH_USER',
    FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
    FETCH_USER_ERROR = 'FETCH_USER_ERROR',
    CREATE_USER = 'CREATE_USER',
    CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR = 'CREATE_USER_ERROR'
}

interface RemoveUserAction {
    type: UserActionTypes.REMOVE_USER;
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: IUser;
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}

interface CreateUserAction {
    type: UserActionTypes.CREATE_USER;
}

interface CreateUserSuccessAction {
    type: UserActionTypes.CREATE_USER_SUCCESS;
    payload: IUser;
}

interface CreateUserErrorAction {
    type: UserActionTypes.CREATE_USER_ERROR;
    payload: string;
}

export type UserAction =
    FetchUserAction
    | FetchUserSuccessAction
    | FetchUserErrorAction
    | CreateUserAction
    | CreateUserSuccessAction
    | CreateUserErrorAction
    | RemoveUserAction