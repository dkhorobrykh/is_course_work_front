import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {AuthContext} from "../../context/AuthContext";
import {deleteUserRole, getAllSchedules, getAllUserRoles} from "../../api/api";
import {
    CircularProgress,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import AddScheduleButton from "../buttons/AddScheduleButton";
import AssignFlightForm from "../forms/AssignFlightForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddUserRoleButton from "../buttons/AddUserRoleButton";

const UserRoleListPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllUserRoles(setError, () => {
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

    const handleDelete = async (roleId, userId) => {
        await deleteUserRole(roleId, userId, setError, setSuccess);
    }

    if (loading) return <CircularProgress/>;

    return (
        <div>
            <AddUserRoleButton user={user}/>
            {entities?.length === 0 ? (
                <p>
                    Sorry, there are no user roles in the database :( <br/>
                </p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell key="id">Id</TableCell>
                                <TableCell key="user">User</TableCell>
                                <TableCell key="UserRole">Role</TableCell>
                                <TableCell key="deleteButton">Deactivate</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {entities.map((entity) => (<>
                            {entity.roles?.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell key="id">{role.id}</TableCell>
                                    <TableCell key="user">{entity.firstName} (id {entity.id})</TableCell>
                                    <TableCell key="role">{role.name} (id {role.id})</TableCell>
                                    <TableCell key="delete">
                                        <IconButton
                                            onClick={() => handleDelete(role.id, entity.id)}
                                            style={{color: "inherit"}}
                                        >
                                            <DeleteIcon color="error"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </>))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default UserRoleListPage;