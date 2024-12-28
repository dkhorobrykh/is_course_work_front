import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {AuthContext} from "../../context/AuthContext";
import {getAllInsurancePrograms, getAllSchedules} from "../../api/api";
import {CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import AddScheduleButton from "../buttons/AddScheduleButton";
import AssignFlightForm from "../forms/AssignFlightForm";
import AddInsuranceProgramButton from "../buttons/AddInsuranceProgramButton";

const InsuranceProgramPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllInsurancePrograms(setError, () => {
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
        }, 5000);

        return () => clearInterval(intervalId);
    });

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <CircularProgress />;

    return (
        <div>
            <AddInsuranceProgramButton user={user}/>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no insurance programs in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="Name">Name</TableCell>
                                <TableCell key="rank">Rank</TableCell>
                                <TableCell key="minCost">Minimal cost</TableCell>
                                <TableCell key="refundAmount">Refund amount</TableCell>
                                <TableCell key="startDatetime">Start datetime</TableCell>
                                <TableCell key="endDatetime">End datetime</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell key="id">{entity.id}</TableCell>
                                    <TableCell key="Name">{entity.name}</TableCell>
                                    <TableCell key="rank">{entity.rank}</TableCell>
                                    <TableCell key="minCost">{entity.minCost}</TableCell>
                                    <TableCell key="refundAmount">{entity.refundAmount}</TableCell>
                                    <TableCell key="startDatetime">{entity.startDatetime}</TableCell>
                                    <TableCell key="endDatetime">{entity.endDatetime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default InsuranceProgramPage;