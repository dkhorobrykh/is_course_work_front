import React, {useCallback, useEffect, useState} from 'react';
import {addInsuranceProgram, addSchedule, getPlanetList, updateSchedule} from "../../api/api";
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

const CreateInsuranceProgramForm = ({setError, setSuccess, user, onSave, onClose}) => {
    const [insuranceProgramData, setInsuranceProgramData] = useState({
        name: "",
        rank: null,
        minCost: null,
        refundAmount: null,
        startDatetime: null,
        endDatetime: null,
        active: true
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setInsuranceProgramData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (field, date) => {
        setInsuranceProgramData(prevState => ({
            ...prevState,
            [field]: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addInsuranceProgram(insuranceProgramData, setError, setSuccess);
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={insuranceProgramData.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <TextField
                        type="number"
                        label="Rank"
                        name="rank"
                        value={insuranceProgramData.rank}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <TextField
                        type="number"
                        label="Minimal cost"
                        name="minCost"
                        value={insuranceProgramData.minCost}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <TextField
                        type="number"
                        label="Refund amount"
                        name="refundAmount"
                        value={insuranceProgramData.refundAmount}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Start datetime"
                            value={insuranceProgramData.startDatetime}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('startDatetime', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="End datetime"
                            value={insuranceProgramData.endDatetime}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('endDatetime', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        Add insurance program
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateInsuranceProgramForm;