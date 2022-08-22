import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = {
    user: null,
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.REMOVE_USER:
            return {...initialState}
        case UserActionTypes.FETCH_USER:
            return {loading: true, error: null, user: null}
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {error: null, loading: false, user: action.payload}
        case UserActionTypes.FETCH_USER_ERROR:
            return {user: null, loading: false, error: action.payload}
        default:
            return {...state}
    }
}