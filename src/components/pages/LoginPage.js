import React, { useContext, useState } from 'react';
import { Button, Container, TextField, Box } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = ({ setActiveComponent }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await login(username, password);
        if (result) {
            setActiveComponent('main');
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh'
                }}
            >
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default LoginPage;
