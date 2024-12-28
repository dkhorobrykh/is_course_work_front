import React, {useCallback, useEffect, useState} from 'react';
import {addSchedule, addUserDoc, getPlanetList, getUserDocTypes, updateSchedule} from "../../api/api";
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

const CreateDocumentForm = ({setError, setSuccess, onClose}) => {
    const [userDocTypeList, setUserDocTypeList] = useState([]);

    const [docData, setDocData] = useState({
        userDocTypeName: "",
        number: "",
        series: "",
        issueDate: null,
        expirationDate: null
    });

    const fetchUserDocTypeList = useCallback(async () => {
        try {
            const data = await getUserDocTypes(setError, () => {});
            setUserDocTypeList(data);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchUserDocTypeList();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchUserDocTypeList]);

    useEffect(() => {
        fetchUserDocTypeList();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setDocData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (field, date) => {
        setDocData(prevState => ({
            ...prevState,
            [field]: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUserDoc(docData, setError, setSuccess);
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Document type"
                        name="userDocTypeName"
                        value={docData.userDocTypeName}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    >
                        {userDocTypeList.map(docType => (
                            <MenuItem value={docType.name}>{docType.name}</MenuItem>
                        ))};
                    </TextField>

                    <TextField
                        label="Number"
                        name="number"
                        value={docData.number}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <TextField
                        label="Series"
                        name="series"
                        value={docData.series}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Issue date"
                            value={docData.issueDate}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('issueDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Expiration date"
                            value={docData.expirationDate}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('expirationDate', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        Add document
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateDocumentForm;