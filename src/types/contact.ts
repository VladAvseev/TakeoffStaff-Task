import {IUser} from "./user";

export interface IContact {
    id: number;
    contactName: string;
    contactPhone: string;
}

export interface ContactState {
    userId: number;
    contacts: IContact[];
    loading: boolean;
}

export enum ContactActionTypes {
    GET_CONTACTS='GET_CONTACTS',
    ADD_CONTACT= 'ADD_CONTACT',
    EDIT_CONTACT= 'EDIT_CONTACT',
    DELETE_CONTACT= 'DELETE_CONTACT',
    FETCH_CONTACT_SUCCESS= 'FETCH_CONTACT_SUCCESS'
}

interface GetContactsAction {
    type: ContactActionTypes.GET_CONTACTS;
    payload: IUser;
}

interface AddContactAction {
    type: ContactActionTypes.ADD_CONTACT;
    payload: IContact[];
}

interface EditContactAction {
    type: ContactActionTypes.EDIT_CONTACT;
    payload: IContact[];
}

interface DeleteContactAction {
    type: ContactActionTypes.DELETE_CONTACT;
    payload: IContact[];
}

interface FetchContactSuccessAction {
    type: ContactActionTypes.FETCH_CONTACT_SUCCESS;
}

export type ContactAction = GetContactsAction | AddContactAction | EditContactAction | DeleteContactAction | FetchContactSuccessAction