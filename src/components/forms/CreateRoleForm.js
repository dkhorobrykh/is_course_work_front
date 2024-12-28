import React, {useCallback, useEffect, useState} from 'react';
import {addRole, addUserDoc, getUserDocTypes} from "../../api/api";
import {Box, Button, MenuItem, Modal, TextField} from "@mui/material";
import {DesktopDateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const fieldSt = {
    my: 1.25,
};

const CreateRoleForm = ({onClose, onSave, setError, setSuccess}) => {
    const [roleData, setRoleData] = useState({
        name: "",
        flightId: "",
        planetId: null,
        active: true,
        expirationDatetime: null
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setRoleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (field, date) => {
        setRoleData(prevState => ({
            ...prevState,
            [field]: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addRole(roleData, setError, setSuccess);
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={roleData.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                   />

                    <TextField
                        type="number"
                        label="Flight ID"
                        name="flightId"
                        value={roleData.flightId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    />

                    <TextField
                        type="number"
                        label="Planet ID"
                        name="planetId"
                        value={roleData.planetId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Expiration datetime"
                            value={roleData.expirationDatetime}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('expirationDatetime', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        Add role
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateRoleForm;