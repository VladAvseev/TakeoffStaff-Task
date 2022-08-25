import {ContactAction, ContactActionTypes, IContact} from "../../types/contact";
import {Dispatch} from "react";
import axios from "axios";
import {IUser} from "../../types/user";

export const getContacts = (user: IUser) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        dispatch({type: ContactActionTypes.GET_CONTACTS, payload: user});
    }
}

export const addContact = (userId: number, contacts: IContact[], name: string, phone: string) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        const contact: IContact = {
            id: new Date().getTime(),
            contactName: name,
            contactPhone: phone
        }
        const newContacts: IContact[] = [...contacts, contact];
        const res = await axios.patch<IUser>(`http://localhost:3000/users/${userId}`, {
            contacts: newContacts
        })
        dispatch({type: ContactActionTypes.ADD_CONTACT, payload: res.data.contacts});
        dispatch({type: ContactActionTypes.FETCH_CONTACT_SUCCESS});
    }
}

export const editContact = (userId: number, contacts: IContact[], contactID: number, name: string, phone: string) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        const newContacts: IContact[] = contacts.map((contact: IContact) => {
            if (contact.id === contactID) {
                return {
                    id: contactID,
                    contactName: name,
                    contactPhone: phone
                }
            }
            return contact;
        });
        const res = await axios.patch<IUser>(`http://localhost:3000/users/${userId}`, {
            contacts: newContacts
        })
        dispatch({type: ContactActionTypes.EDIT_CONTACT, payload: res.data.contacts});
        dispatch({type: ContactActionTypes.FETCH_CONTACT_SUCCESS});
    }
}

export const deleteContact = (userId: number, contacts: IContact[], contactId: number) => {
    return async (dispatch: Dispatch<ContactAction>) => {
        const newContacts: IContact[] = contacts.filter((contact) => contact.id !== contactId);
        const res = await axios.patch<IUser>(`http://localhost:3000/users/${userId}`, {
            contacts: newContacts
        });
        dispatch({type: ContactActionTypes.DELETE_CONTACT, payload: res.data.contacts});
        dispatch({type: ContactActionTypes.FETCH_CONTACT_SUCCESS});
    }
}