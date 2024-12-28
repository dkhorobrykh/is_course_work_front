import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddRoleButton from "../buttons/AddRoleButton";
import {getAllRoles} from "../../api/api";

const RoleListPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllRoles(setError, () => {
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
        }, 2500);

        return () => clearInterval(intervalId);
    });

    if (loading) return <CircularProgress />;

    return (
        <div>
            <AddRoleButton user={user}/>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no roles in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="name">Name</TableCell>
                                <TableCell key="Flight">Flight</TableCell>
                                <TableCell key="Planet">Planet</TableCell>
                                <TableCell key="active">Active</TableCell>
                                <TableCell key="expirationDatetime">Expiration datetime</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="name">{entity.name}</TableCell>
                                    <TableCell key="flight">{entity.flight?.name}</TableCell>
                                    <TableCell key="planet">{entity.planet?.name}</TableCell>
                                    <TableCell key="active">{entity.active}</TableCell>
                                    <TableCell key="expirationDatetime">{entity.expirationDatetime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default RoleListPage;