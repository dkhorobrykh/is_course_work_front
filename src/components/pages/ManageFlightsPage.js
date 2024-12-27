import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {changeCargoStatus, changeFlightStatus, getAllFlights} from "../../api/api";
import {
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {AuthContext} from "../../context/AuthContext";

const ManageFlightsPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllFlights(setError, () => {
            });
            setEntities(data);
        } catch (err) {
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    }, [setError, setEntities]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchData]);

    const handleChangeFlightStatus = async (flightId) => {
        try {
            await changeFlightStatus(flightId, setError, setSuccess);
        } catch (err) {
            setError(err.response.data);
        }
    }

    const handleChangeCargoStatus = async (flightId) => {
        try {
            await changeCargoStatus(flightId, setError, setSuccess);
        } catch (err) {
            setError(err.response.data);
        }
    }

    if (loading) return <CircularProgress/>;

    return (
        <div>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no flights in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="name">Flight name</TableCell>
                                <TableCell key="shipName">Ship name</TableCell>
                                <TableCell key="flightStatus">Flight status</TableCell>
                                <TableCell key="cargoStatus">Cargo status</TableCell>
                                <TableCell key="planetDeparture">DeparturePlanet</TableCell>
                                <TableCell key="departureDatetime">Departure datetime</TableCell>
                                <TableCell key="planetArrival">Arrival planet</TableCell>
                                <TableCell key="arrivalDatetime">Arrival datetime</TableCell>
                                <TableCell key="seats">Seats</TableCell>
                                <TableCell key="changeFlightStatus">Change flight status</TableCell>
                                <TableCell key="changeCargoStatus">Change cargo status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="name">{entity.name}</TableCell>
                                    <TableCell key="shipName">{entity.ship?.name}</TableCell>
                                    <TableCell key="flightStatus">{entity.flightStatus.name}</TableCell>
                                    <TableCell key="cargoStatus">{entity.cargoStatus.name}</TableCell>
                                    <TableCell
                                        key="planetDeparture">{entity.flightSchedule.planetDeparture.name}</TableCell>
                                    <TableCell
                                        key="departureDatetime">{entity.flightSchedule.departureDatetime}</TableCell>
                                    <TableCell
                                        key="planetArrival">{entity.flightSchedule.planetArrival.name}</TableCell>
                                    <TableCell
                                        key="arrivalDatetime">{entity.flightSchedule.arrivalDatetime}</TableCell>
                                    <TableCell key="seats">`{entity.bookedSeats} / {entity.totalSeats}`</TableCell>
                                    <TableCell key="changeFlightStatus">
                                        <div style={{padding: 0}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleChangeFlightStatus(entity.id)}
                                                sx={{mb: 0}}
                                                disabled={!Boolean(user) || entity.flightStatus?.name === 'COMPLETED'}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell key="changeCargoStatus">
                                        <div style={{padding: 0}}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => handleChangeCargoStatus(entity.id)}
                                                sx={{mb: 0}}
                                                disabled={!Boolean(user) || entity.cargoStatus.name === 'COMPLETED'}
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default ManageFlightsPage;