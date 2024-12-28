import React, {useCallback, useEffect, useState} from 'react';
import {addSchedule, bookFlight, getPlanetList, getServiceClassList, getUserDocs, updateSchedule} from "../../api/api";
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

const BookFlightForm = ({onSave, onClose, setError, setSuccess, flightId, user}) => {
    const [docList, setDocList] = useState([]);
    const [serviceClassList, setServiceClassList] = useState([]);

    const [flightData, setFlightData] = useState({
        userDocId: null,
        flightId: flightId,
        serviceClassId: null,
        userDocType: "",
        serviceClassName: ""
    });

    const fetchUserDocsList = useCallback(async () => {
        try {
            const data = await getUserDocs(setError, () => {});
            setDocList(data);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchUserDocsList();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchUserDocsList]);

    useEffect(() => {
        fetchUserDocsList();
    }, []);

    const fetchServiceClassList = useCallback(async () => {
        try {
            const data = await getServiceClassList(flightId, setError, () => {});
            setServiceClassList(data);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchServiceClassList();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchServiceClassList]);

    useEffect(() => {
        fetchServiceClassList();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'userDocId') {
            const selectedDoc = docList.find((doc) => doc.id === value);
            setFlightData((prevState) => ({
                ...prevState,
                userDocType: selectedDoc?.userDocType?.name || "",
                userDocId: value,
            }));
        }

        if (name === 'serviceClassId') {
            const selectedClass = serviceClassList.find((serviceClass) => serviceClass.id === value);
            setFlightData((prevState) => ({
                ...prevState,
                serviceClassName: selectedClass?.name || "",
                serviceClassId: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await bookFlight(flightData, setError, setSuccess);
        if (onSave) onSave();
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Document"
                        name="userDocId"
                        value={flightData.userDocId || ""}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    >
                        {docList.map(userDoc => (
                            <MenuItem key={userDoc.id} value={userDoc.id}> {/* Передаём только ID */}
                                {userDoc.userDocType?.name} ({userDoc.series} {userDoc.number}   /   {userDoc.expirationDate})
                            </MenuItem>
                        ))};
                    </TextField>

                    <TextField
                        select
                        label="Service class"
                        name="serviceClassId"
                        value={flightData.serviceClassId || ""}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    >
                        {serviceClassList.map(serviceClass => (
                            <MenuItem key={serviceClass.id} value={serviceClass.id}>
                                {serviceClass.name} ({serviceClass.cost}$)
                            </MenuItem>
                        ))};
                    </TextField>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        Book flight
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default BookFlightForm;