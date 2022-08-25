import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {useActions} from "../hooks/useAction";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";

interface InputContact {
    name: string;
    phone: string;
}

interface EditState {
    isEdit: boolean;
    contactId: number;
}

const UserPage = () => {
    const [inputContact, setInputContact] = useState<InputContact>({
        name: '',
        phone: ''
    });
    const [editState, setEditState] = useState<EditState>({
        isEdit: false,
        contactId: 0
    });
    const {user} = useTypedSelector((state) => state.user);
    const {contacts, loading} = useTypedSelector((state) => state.contact)
    const navigate = useNavigate();
    const {removeUser, addContact, editContact, deleteContact, getContacts} = useActions();

    const exitHandler = async () => {
        removeUser();
        navigate('/');
    };

    const addContactHandler = () => {
        if (user) {
            addContact(user.id, contacts, inputContact.name, inputContact.phone);
            setInputContact({
                name: '',
                phone: ''
            });
        }
    };

    const editContactHandler = (id: number) => {
        if (user) {
            editContact(user.id, contacts, id, inputContact.name, inputContact.phone);
            setInputContact({
                name: '',
                phone: ''
            });
            setEditState({
                isEdit: false,
                contactId: 0
            });
        }
    };

    const deleteContactHandler = (id: number) => {
        if (user) {
            deleteContact(user.id, contacts, id);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        } else {
            getContacts(user);
        }
    }, []);


    return (
        <div style={{ margin: 25}}>
            <div style={{display: 'flex', gap: 20}}>
                <Button
                    onClick={exitHandler}
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Выйти
                </Button>
                <h1>username: {user?.name}</h1>
            </div>
                <div style={{display:'flex', gap: 20}}>
                    <Input
                        type="text"
                        placeholder="Имя"
                        disabled={loading}
                        value={inputContact.name}
                        onChange={(event) => {
                            setInputContact((prev) => {
                                return {...prev, name: event.target.value}
                            });
                        }}
                    />
                    <Input
                        type="text"
                        placeholder="Контакт"
                        value={inputContact.phone}
                        disabled={loading}
                        onChange={(event) => {
                            setInputContact((prev) => {
                                return {...prev, phone: event.target.value}
                            });
                        }}
                    />
                    <Button
                        onClick={() => {
                            if (editState.isEdit) {
                                editContactHandler(editState.contactId);
                            } else {
                                addContactHandler();
                            }
                        }}
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        {editState.isEdit ? 'Изменить контакт' : 'Добавить контакт' }
                    </Button>
                    {editState.isEdit ? (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                            onClick={() => {
                                setEditState({
                                    isEdit: false,
                                    contactId: 0
                                });
                                setInputContact({
                                    name: '',
                                    phone: ''
                                })
                            }}
                        >
                            Отменить изменение
                        </Button>
                    ) : null}
                </div>
            {contacts.map((contact) => (
                <div
                    style={{
                        display: 'flex',
                        gap: 10,
                        margin: 10,
                        padding: '0 10px',
                        border: '2px solid #000',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '1.5rem'}}
                    key={contact.id}
                >
                    <div>{contact.contactName}: {contact.contactPhone}</div>
                    <div
                        style={{display: 'flex', gap: 10, alignItems: 'center'}}>
                        <Button
                            sx={{ mt: 3, mb: 2 }}
                            disabled={loading}
                            onClick={() => {
                                setEditState({
                                    isEdit: true,
                                    contactId: contact.id
                                })
                                setInputContact({
                                    name: contact.contactName,
                                    phone: contact.contactPhone
                                })
                                console.log(contact.id);
                            }
                            }
                        >изменить</Button>
                        <Button
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => deleteContactHandler(contact.id)}
                        >удалить</Button>
                    </div>
                </div>))}
        </div>
    );
};

export default UserPage;