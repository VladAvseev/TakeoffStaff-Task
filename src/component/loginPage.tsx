import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {FC, useEffect, useState} from "react";
import {useActions} from "../hooks/useAction";
import {useNavigate} from "react-router-dom";

interface UserInput {
    name: string;
    password: string;
}

const LoginPage: FC = () => {
    const {user, loading, error} = useTypedSelector((state) => state.user);
    const [userInput, setUserInput] = useState<UserInput>({
        name: '',
        password: ''
    })
    const {loginUser} = useActions();
    const navigate = useNavigate();

    const login = async () => {
        loginUser({
            name: userInput.name,
            password: userInput.password
        });
    }

    useEffect(() => {
        if (user?.id) {
            navigate(`/user/${user.id}`);
        }
    }, [user]);

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Вход / Регистрация
                </Typography>
                {error ?
                    <div style={{color: '#AA0000'}}>{error}</div>
                    : null
                }
                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        value={userInput.name}
                        onChange={(event) => {
                            const changedUserInput: UserInput = {
                                ...userInput,
                                name: event.target.value
                            }
                            setUserInput(changedUserInput);
                        }}
                        margin="normal"
                        required
                        fullWidth
                        disabled={loading}
                        id="email"
                        label="Имя пользователя"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        value={userInput.password}
                        onChange={(event) => {
                            const changedUserInput: UserInput = {
                                ...userInput,
                                password: event.target.value
                            }
                            setUserInput(changedUserInput);
                        }}
                        margin="normal"
                        required
                        fullWidth
                        disabled={loading}
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                        <Button
                            onClick={() => login()}
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage