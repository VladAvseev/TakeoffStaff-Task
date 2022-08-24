import React, {useEffect, useState} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {useActions} from "../hooks/useAction";
import Button from "@mui/material/Button";
import {Input} from "@mui/material";

const UserPage = () => {
    const [inputContact, setInputContact] = useState<string>('');
    const {user, loading, error} = useTypedSelector((state) => state.user);
    const navigate = useNavigate();
    const {removeUser, addContact} = useActions();

    const exitHandler = async () => {
        removeUser();
        navigate('/');
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [])

    return (
        <div>
            <div style={{display: 'flex'}}>
                <Button
                    onClick={exitHandler}
                    variant="contained"
                    disabled={loading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Выйти
                </Button>
                <h1>{user?.name}</h1>
            </div>
                <div style={{display:'flex'}}>
                    <Input
                        type="text"
                        placeholder="Контакт"
                        value={inputContact}
                        onChange={(event) => {
                            setInputContact(event.target.value);
                        }}
                    />
                    <Button
                        onClick={() => {
                            if (user) {
                                addContact(user)
                            }
                        }}
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Добавить контакт
                    </Button>
                </div>
        </div>
    );
};

export default UserPage;