import React, {useCallback, useEffect, useState} from 'react';
import {
    addSchedule,
    addShip,
    getAirTypeList,
    getHabitatList,
    getPlanetList, getTemperatureTypeList,
    updateSchedule,
    updateShip
} from "../../api/api";
import {
    Box,
    Button, IconButton,
    MenuItem,
    Modal,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

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

const CreateShipForm = ({onSave, onClose, setError, setSuccess, ship}) => {
    const [habitatList, setHabitatList] = useState([]);
    const [temperatureTypeList, setTemperatureTypeList] = useState([]);
    const [airTypeList, setAirTypeList] = useState([]);

    const fetchAllLists = useCallback(async () => {
        try {
            const h = await getHabitatList(setError, () => {});
            setHabitatList(h);
            const at = await getAirTypeList(setError, () => {});
            setAirTypeList(at);
            const tt = await getTemperatureTypeList(setError, () => {});
            setTemperatureTypeList(tt);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchAllLists();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchAllLists]);

    const [shipData, setShipData] = useState({
        name: "",
        photo: "",
        number: "",
        serviceClasses: [],
        passengerCapacity: 100,
        airType: {
            name: ""
        },
        habitat: {
            name: ""
        },
        temperatureType: {
            name: ""
        }
    });

    useEffect(() => {
        if (ship) {
            setShipData(ship);
        }
    });

    const handleInputChange = (e) => {
        let {name, value} = e.target;

        if (name === 'passengerCapacity')
            value = parseInt(value);

        if (name === 'habitat')
            setShipData({...shipData, habitat: {...shipData.habitat, name: value}});
        else if (name === 'temperatureType')
            setShipData({...shipData, temperatureType: {...shipData.temperatureType, name: value}});
        else if (name === 'airType')
            setShipData({...shipData, airType: {...shipData.airType, name: value}});
        else
            setShipData(prevState => ({
                ...prevState,
                [name]: value
            }));
    };

    const handleServiceClassChange = (index, field, value) => {
        const newServiceClasses = [...shipData.serviceClasses];
        newServiceClasses[index][field] = value;
        setShipData(prevState => ({
            ...prevState,
            serviceClasses: newServiceClasses
        }));
    };

    const handleAddServiceClass = () => {
        setShipData(prevState => ({
            ...prevState,
            serviceClasses: [...prevState.serviceClasses, {name: '', cost: ''}]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (shipData.serviceClasses.length === 0) {
            setError("At least one service class is required.");
            return;
        }

        if (ship) {
            await updateShip(ship.id, shipData, setError, setSuccess);
        } else {
            await addShip(shipData, setError, setSuccess);
        }
        if (onSave) onSave();
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        name="name"
                        value={shipData.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    />

                    <TextField
                        label="Number"
                        name="number"
                        value={shipData.number}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    />

                    <TextField
                        label="Photo"
                        name="photo"
                        value={shipData.photo}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    />

                    <TextField
                        label="Passenger capacity"
                        name="passengerCapacity"
                        value={shipData.passengerCapacity}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        sx={fieldSt}
                        type="number"
                        inputProps={{min:1, step: "1"}}
                    />

                    <TextField
                        select
                        label="Habitat"
                        name="habitat"
                        value={shipData.habitat.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {habitatList.map(habitat => (
                            <MenuItem value={habitat.name}>{habitat.name}</MenuItem>
                        ))};
                    </TextField>

                    <TextField
                        select
                        label="Temperature type"
                        name="temperatureType"
                        value={shipData.temperatureType.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {temperatureTypeList.map(temperature => (
                            <MenuItem value={temperature.name}>{temperature.name}</MenuItem>
                        ))};
                    </TextField>

                    <TextField
                        select
                        label="Air type"
                        name="airType"
                        value={shipData.airType.name}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {airTypeList.map(airType => (
                            <MenuItem value={airType.name}>{airType.name}</MenuItem>
                        ))};
                    </TextField>

                    <TableContainer component={Paper} sx={{marginTop: 2}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Cost</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {shipData.serviceClasses.map((serviceClass, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <TextField
                                                value={serviceClass.name}
                                                onChange={(e) => handleServiceClassChange(index, 'name', e.target.value)}
                                                fullWidth
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                value={serviceClass.cost}
                                                onChange={(e) => handleServiceClassChange(index, 'cost', e.target.value)}
                                                fullWidth
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <IconButton onClick={handleAddServiceClass} sx={{marginTop: 2}}>
                        <AddIcon />
                    </IconButton>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        {ship ? "Update ship" : "Create ship"}
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateShipForm;