import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {AuthContext} from "../../context/AuthContext";
import {changeCargoStatus, changeFlightStatus, getAllFlights, getAllUserDocs} from "../../api/api";
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
import AddUserDocButton from "../buttons/AddUserDocButton";

const UserDocPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllUserDocs(setError, () => {
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

    if (loading) return <CircularProgress/>;

    return (
        <div>
            <AddUserDocButton/>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no user docs in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="type">Flight name</TableCell>
                                <TableCell key="series">Ship name</TableCell>
                                <TableCell key="number">Flight status</TableCell>
                                <TableCell key="issueDate">Cargo status</TableCell>
                                <TableCell key="expirationDate">DeparturePlanet</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="type">{entity.userDocType?.name}</TableCell>
                                    <TableCell key="series">{entity.series}</TableCell>
                                    <TableCell key="number">{entity.number}</TableCell>
                                    <TableCell key="issueDate">{entity.issueDate}</TableCell>
                                    <TableCell key="expirationDate">{entity.expirationDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default UserDocPage;