import React, {useEffect} from 'react';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {useActions} from "../hooks/useAction";

const UserPage = () => {
    const {user, loading, error} = useTypedSelector((state) => state.user);
    const navigate = useNavigate();
    const {removeUser} = useActions();

    const exitHandler = async () => {
        removeUser();
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [])

    return (
        <div>
            <h1>{user?.name}</h1>
            <button onClick={exitHandler}>Выйти</button>
        </div>
    );
};

export default UserPage;