import React, { useContext, useState } from 'react';
import { Button, Container, TextField, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import {DateField, DesktopDatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const RegisterPage = ({ setActiveComponent }) => {
    const { register } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await register(username, password, firstName, lastName, surname, dateOfBirth, email);
        if (res != null) setActiveComponent("main");
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
                    <TextField
                        label="First name"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                        />
                    <TextField
                        label="Surname"
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Last name"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Date of birth"
                            inputFormat="dd/MM/yyyy"
                            value={dateOfBirth}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(newValue) => setDateOfBirth(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        Register
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;
