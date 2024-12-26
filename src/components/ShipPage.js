import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../context/ErrorContext";
import {AuthContext} from "../context/AuthContext";
import {getAllShips} from "../api/api";
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddScheduleButton from "./AddScheduleButton";
import AddShipButton from "./AddShipButton";

const ShipPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllShips(setError, () => {
            });
            setEntities(data);
        } catch (err) {
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(intervalId);
    });

    if (loading) return <CircularProgress />;

    return (
        <div>
            <AddShipButton user={user}/>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no ships in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="name">Name</TableCell>
                                <TableCell key="number">Number</TableCell>
                                <TableCell key="registrationDatetime">Registration datetime</TableCell>
                                <TableCell key="photo">Photo</TableCell>
                                <TableCell key="habitat">Habitat</TableCell>
                                <TableCell key="temperatureType">Temperature type</TableCell>
                                <TableCell key="airType">Air type</TableCell>
                                <TableCell key="passengerCapacity">Passenger capacity</TableCell>
                                <TableCell key="serviceClasses">Service classes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="name">{entity.name}</TableCell>
                                    <TableCell key="number">{entity.number}</TableCell>
                                    <TableCell key="registrationDatetime">{entity.registrationDatetime}</TableCell>
                                    <TableCell key="photo">{entity.photo}</TableCell>
                                    <TableCell key="habitat">{entity.habitat.name}</TableCell>
                                    <TableCell key="temperatureType">{entity.temperatureType.name}</TableCell>
                                    <TableCell key="airType">{entity.airType.name}</TableCell>
                                    <TableCell key="passengerCapacity">{entity.passengerCapacity}</TableCell>
                                    <TableCell key="serviceClasses">
                                        <TableContainer component={Paper}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell key="name">Name</TableCell>
                                                        <TableCell key="cost">Cost</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {entity.serviceClasses.map((sc) => (
                                                        <TableRow key={sc.id}>
                                                            <TableCell key="name">{sc.name}</TableCell>
                                                            <TableCell key="cost">{sc.cost}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
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

export default ShipPage;