export interface IUser {
    id: number;
    name: string;
    password: string;
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
    ADD_CONTACT= 'ADD_CONTACT'
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

interface AddContactAction {
    type: UserActionTypes.ADD_CONTACT;
}

export type UserAction =
    FetchUserAction
    | FetchUserSuccessAction
    | FetchUserErrorAction
    | RemoveUserAction
    | AddContactAction