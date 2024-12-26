import React, {useCallback, useContext, useEffect, useState} from 'react';
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getAllSchedules} from "../../api/api";
import {ErrorContext} from "../../context/ErrorContext";
import AddScheduleButton from "../buttons/AddScheduleButton";
import {AuthContext} from "../../context/AuthContext";
import AssignFlightForm from "../forms/AssignFlightForm";

const SchedulePage = (callback, deps) => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllSchedules(setError, () => {
            });
            setEntities(data);
        } catch (err) {
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    }, deps);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    });

    if (loading) return <CircularProgress />;

    return (
        <div>
            <AddScheduleButton user={user}/>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no schedules in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="flight">Assigned flight</TableCell>
                                <TableCell key="departurePlanet">DeparturePlanet</TableCell>
                                <TableCell key="departureDatetime">Departure datetime</TableCell>
                                <TableCell key="arrivalPlanet">Arrival planet</TableCell>
                                <TableCell key="arrivalDatetime">Arrival datetime</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="flight">
                                        {entity.flight == null ? (
                                            <AssignFlightForm scheduleId={entity.id} setError={setError} setSuccess={setSuccess} onClose={() => {}}/>
                                        ) : (
                                            <>
                                                {entity.flight.name}
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell key="departurePlanet">{entity.planetDeparture.name}</TableCell>
                                    <TableCell key="departureDatetime">{entity.departureDatetime}</TableCell>
                                    <TableCell key="arrivalPlanet">{entity.planetArrival.name}</TableCell>
                                    <TableCell key="arrivalDatetime">{entity.arrivalDatetime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default SchedulePage;