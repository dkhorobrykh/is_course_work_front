import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, Checkbox, FormControlLabel, MenuItem, Modal, TextField} from "@mui/material";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DesktopDatePicker, DesktopDateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {addSchedule, getPlanetList, updateSchedule} from "../../api/api";

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

const CreateScheduleForm = ({schedule, onClose, onSave, setError, setSuccess}) => {
    const [planetList, setPlanetList] = useState([]);

    const [scheduleData, setScheduleData] = useState({
        planetDeparture: "",
        departureDatetime: null,
        planetArrival: "",
        arrivalDatetime: null,
    });

    const fetchPlanetList = useCallback(async () => {
        try {
            const data = await getPlanetList(setError, () => {});
            setPlanetList(data);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchPlanetList();
        }, 1000);

        return () => clearInterval(intervalId);
    }, [fetchPlanetList]);

    useEffect(() => {
        if (schedule) {
            setScheduleData(schedule);
        }
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setScheduleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDateChange = (field, date) => {
        setScheduleData(prevState => ({
            ...prevState,
            [field]: date
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (schedule) {
            await updateSchedule(schedule.id, scheduleData, setError, setSuccess);
        } else {
            await addSchedule(scheduleData, setError, setSuccess);
        }
        if (onSave) onSave();
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Departure planet"
                        name="planetDeparture"
                        value={scheduleData.planetDeparture}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {planetList.map(planet => (
                            <MenuItem value={planet.name}>{planet.name}</MenuItem>
                        ))};
                    </TextField>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Departure datetime"
                            value={scheduleData.departureDatetime}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('departureDatetime', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <TextField
                        select
                        label="Arrival planet"
                        name="planetArrival"
                        value={scheduleData.planetArrival}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {planetList.map(planet => (
                            <MenuItem value={planet.name}>{planet.name}</MenuItem>
                        ))};
                    </TextField>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                            sx={{ width: '100%', marginTop: 2, marginBottom: 1 }}
                            label="Arrival datetime"
                            value={scheduleData.arrivalDatetime}
                            slotProps={{
                                textField: {
                                    required: true,
                                },
                            }}
                            onChange={(date) => handleDateChange('arrivalDatetime', date)}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" required />}
                        />
                    </LocalizationProvider>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        {schedule ? "Update schedule" : "Create schedule"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateScheduleForm;