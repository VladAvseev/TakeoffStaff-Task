import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useState} from "react";
import {useActions} from "../hooks/useAction";

interface UserInput {
    name: string;
    password: string;
}

export default function LoginPage() {
    const {user, loading, error} = useTypedSelector((state) => state.user);
    const [userInput, setUserInput] = useState<UserInput>({
        name: '',
        password: ''
    })
    const {fetchUser} = useActions();

    const login = async () => {
        fetchUser({
            name: userInput.name,
            password: userInput.password
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            {JSON.stringify(user)}
            {JSON.stringify(error)}
            {JSON.stringify(loading)}
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
                    <div style={{display: 'flex', gap: 10}}>
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Зарегистрироваться
                        </Button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
}