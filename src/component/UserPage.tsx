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
    const [searchInput, setSearchInput] = useState<string>('');
    const {user} = useTypedSelector((state) => state.user);
    const {contacts} = useTypedSelector((state) => state.contact)
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
                    sx={{ mt: 3, mb: 2 }}
                >
                    Выйти
                </Button>
                <h1>username: {user?.name}</h1>
            </div>
                <div style={{display:'flex', gap: 20}}>
                    <Input
                        sx={{ mt: 3, mb: 2 }}
                        type="text"
                        placeholder="Имя"
                        value={inputContact.name}
                        onChange={(event) => {
                            setInputContact((prev) => {
                                return {...prev, name: event.target.value}
                            });
                        }}
                    />
                    <Input
                        sx={{ mt: 3, mb: 2 }}
                        type="text"
                        placeholder="Контакт"
                        value={inputContact.phone}
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
                        sx={{ mt: 3, mb: 2 }}
                        >
                        {editState.isEdit ? 'Изменить контакт' : 'Добавить контакт' }
                    </Button>
                    {editState.isEdit ? (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
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
            <div style={{display: 'flex', gap: 20}}>
                <h1>Контакты:</h1>
                <Input
                    sx={{ mt: 3, mb: 3 }}
                    fullWidth
                    type="text"
                    placeholder="Поиск"
                    value={searchInput}
                    onChange={(event) => {
                        setSearchInput(event.target.value);
                    }}
                />
            </div>
            {contacts.map((contact) => {
                if (contact.contactName.toUpperCase().includes(searchInput.toUpperCase())) {
                    return (
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
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={() => deleteContactHandler(contact.id)}
                                >удалить</Button>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    );
};

export default UserPage;