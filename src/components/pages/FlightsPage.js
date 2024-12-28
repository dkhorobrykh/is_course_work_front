import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {getAllFlights} from "../../api/api";
import {
    Button,
    CircularProgress, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import BookFlightButton from "../buttons/BookFlightButton";
import {AuthContext} from "../../context/AuthContext";

const FlightsPage = () => {
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

    useEffect(() => {
        fetchData();
    }, []);

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
                                <TableCell key="planetDeparture">DeparturePlanet</TableCell>
                                <TableCell key="departureDatetime">Departure datetime</TableCell>
                                <TableCell key="planetArrival">Arrival planet</TableCell>
                                <TableCell key="arrivalDatetime">Arrival datetime</TableCell>
                                <TableCell key="seats">Seats</TableCell>
                                <TableCell key="bookFlightButton"/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="name">{entity.name}</TableCell>
                                    <TableCell key="shipName">{entity.ship?.name}</TableCell>
                                    <TableCell key="planetDeparture">{entity.flightSchedule.planetDeparture.name}</TableCell>
                                    <TableCell key="departureDatetime">{entity.flightSchedule.departureDatetime}</TableCell>
                                    <TableCell key="planetArrival">{entity.flightSchedule.planetArrival.name}</TableCell>
                                    <TableCell key="arrivalDatetime">{entity.flightSchedule.arrivalDatetime}</TableCell>
                                    <TableCell key="seats">`{entity.bookedSeats} / {entity.totalSeats}`</TableCell>
                                    <TableCell key="book"><BookFlightButton flightId={entity.id} user={user} onSave={() => {}} onClose={() => {}}/></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default FlightsPage;