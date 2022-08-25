import {ContactAction, ContactActionTypes, ContactState} from "../../types/contact";

const initialState: ContactState = {
    userId: 0,
    contacts: [],
    loading: false
}

export const contactReducer = (state = initialState, action: ContactAction): ContactState => {
    switch (action.type) {
        case ContactActionTypes.GET_CONTACTS:
            return {...state, userId: action.payload.id, contacts: action.payload.contacts};
        case ContactActionTypes.ADD_CONTACT:
            return {...state, loading: true, contacts: action.payload}
        case ContactActionTypes.EDIT_CONTACT:
            return {...state, loading: true, contacts: action.payload}
        case ContactActionTypes.DELETE_CONTACT:
            return {...state, loading: true, contacts: action.payload}
        case ContactActionTypes.FETCH_CONTACT_SUCCESS:
            return {...state, loading: false}
        default:
            return {...state}
    }
}