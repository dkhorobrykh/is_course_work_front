import React, {useCallback, useContext, useEffect, useState} from 'react';
import {addSchedule, assignFlight, getAllShips, getPlanetList, updateSchedule} from "../../api/api";
import {Box, Button, MenuItem, Modal, TextField} from "@mui/material";

const style = {
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const fieldSt = {
    my: 1.25,
};

const AssignFlightForm = ({onSave, onClose, setError, setSuccess, scheduleId}) => {
    const [shipList, setShipList] = useState([]);

    const [flightData, setFlightData] = useState({
        shipName: "",
        flightName: ""
    });

    const fetchShipList = useCallback(async () => {
        try {
            const data = await getAllShips(setError, () => {});
            setShipList(data);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchShipList();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchShipList]);

    useEffect(() => {
        fetchShipList();
    }, []);

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setFlightData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await assignFlight(scheduleId, flightData, setError, setSuccess);
        if (onSave) onSave();
        onClose();
    }

    return (
            <Box sx={style}>
                <form onSubmit={handleSubmit}>

                    <TextField
                        label="Name"
                        name="flightName"
                        value={flightData.flightName}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        />

                    <TextField
                        select
                        label="Ship name"
                        name="shipName"
                        value={flightData.shipName}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {shipList.map(ship => (
                            <MenuItem value={ship.name}>{ship.name}</MenuItem>
                        ))};
                    </TextField>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        "Assign ship"
                    </Button>
                </form>
            </Box>
    );
};

export default AssignFlightForm;