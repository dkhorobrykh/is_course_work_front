import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {
    getAllCargo,
    addCargo,
    getAllCargoWhereCurrentUserIsSender,
    getAllCargoWhereCurrentUserIsRecipient,
    getAllCargoByFlightId
} from "../../api/api";
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TablePagination, Box
} from "@mui/material";
import AddInsuranceForPassengerButton from "../buttons/AddInsuranceForPassengerButton";
import {AuthContext} from "../../context/AuthContext";

const CargoPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);
    const [open, setOpen] = useState(false);
    const [newCargo, setNewCargo] = useState({
        senderId: '',
        recipientId: '',
        weight: '',
        insuranceProgramId: '',
        shipId: '',
        cargoCondition: {
            airTypeId: '',
            habitatId: '',
            temperatureTypeId: ''
        },
        flightId: ''
    });

    const [filter, setFilter] = useState('all');
    const [flightId, setFlightId] = useState('');

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchData = useCallback(async () => {
        try {
            let data;
            if (filter === 'sender') {
                data = await getAllCargoWhereCurrentUserIsSender(setError, () => {
                });
            } else if (filter === 'recipient') {
                data = await getAllCargoWhereCurrentUserIsRecipient(setError, () => {
                });
            } else if (filter === 'flight') {
                data = await getAllCargoByFlightId(flightId, setError, () => {
                });
            } else {
                data = await getAllCargo(setError, () => {
                });
            }
            setEntities(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.response?.data || 'An error occurred');
        } finally {
            setLoading(false);
        }
    }, [setError, filter, flightId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAddCargo = async () => {
        try {
            if (Object.values(newCargo).some(field => field === '') ||
                Object.values(newCargo.cargoCondition).some(field => field === '')) {
                setError('All fields are required.');
                return;
            }

            const numericFields = ['senderId', 'recipientId', 'weight', 'insuranceProgramId', 'shipId', 'flightId'];
            const cargoConditionFields = ['airTypeId', 'habitatId', 'temperatureTypeId'];

            for (const field of numericFields) {
                if (newCargo[field] !== '' && Number(newCargo[field]) < 0) {
                    setError(`${field} cannot be negative.`);
                    return;
                }
            }

            for (const field of cargoConditionFields) {
                if (newCargo.cargoCondition[field] !== '' && Number(newCargo.cargoCondition[field]) < 0) {
                    setError(`${field} in cargo condition cannot be negative.`);
                    return;
                }
            }

            if (!Number.isInteger(Number(newCargo.weight)) || newCargo.weight <= 0) {
                setError('Weight must be a positive integer.');
                return;
            }

            await addCargo(newCargo, setError, setSuccess);
            setSuccess('Cargo added successfully');
            setOpen(false);
            fetchData();
        } catch (err) {
            setError(err.response?.data || 'An error occurred');
        }
    };

    if (loading) return <CircularProgress/>;

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>Add Cargo</Button>
            <Button variant="contained" onClick={() => setFilter('all')}>All Cargo</Button>
            <Button variant="contained" onClick={() => setFilter('sender')}>Sender Cargo</Button>
            <Button variant="contained" onClick={() => setFilter('recipient')}>Recipient Cargo</Button>
            <TextField
                label="Flight ID"
                type="number"
                value={flightId}
                onChange={(e) => setFlightId(e.target.value)}
                size="small"
                sx={{width: '150px'}}
            />
            <Button variant="contained" onClick={() => setFilter('flight')}>Filter by Flight ID</Button>

            {entities?.length === 0 ? (
                <p>Sorry, there are no cargo in the database :( <br/></p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Sender</TableCell>
                                <TableCell>Recipient</TableCell>
                                <TableCell>Flight Id</TableCell>
                                <TableCell>Cargo insurance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {entities.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entity) => (
                                <TableRow key={entity.id}>
                                    <TableCell>{entity.id}</TableCell>
                                    <TableCell>{entity.name}</TableCell>
                                    <TableCell>{entity.senderId}</TableCell>
                                    <TableCell>{entity.recipientId}</TableCell>
                                    <TableCell>{entity.flight ? entity.flight.id : 'not assigned'}</TableCell>
                                    <TableCell>
                                        {entity.insuranceIssueds?.length === 1
                                            ? "✔ Issued"
                                            : (
                                                <Box sx={{textAlign: 'left'}}>
                                                    <AddInsuranceForPassengerButton
                                                        flightId={entity.flight?.id}
                                                        cargoId={entity.id}
                                                        user={user}
                                                        onSave={() => {
                                                        }}
                                                        onClose={() => {
                                                        }}
                                                        disabled={!entity.flight}
                                                    />
                                                </Box>
                                            )
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={entities.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Cargo</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Sender ID"
                        type="number"
                        fullWidth
                        value={newCargo.senderId}
                        onChange={(e) => setNewCargo({...newCargo, senderId: e.target.value})}
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Recipient ID"
                        type="number"
                        fullWidth
                        value={newCargo.recipientId}
                        onChange={(e) => setNewCargo({...newCargo, recipientId: e.target.value})}
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Weight"
                        type="number"
                        fullWidth
                        value={newCargo.weight}
                        onChange={(e) => setNewCargo({...newCargo, weight: e.target.value})}
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Insurance Program ID"
                        type="number"
                        fullWidth
                        value={newCargo.insuranceProgramId}
                        onChange={(e) => setNewCargo({...newCargo, insuranceProgramId: e.target.value})}
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Ship ID"
                        type="number"
                        fullWidth
                        value={newCargo.shipId}
                        onChange={(e) => setNewCargo({...newCargo, shipId: e.target.value})}
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Air Type ID"
                        type="number"
                        fullWidth
                        value={newCargo.cargoCondition.airTypeId || ''}
                        onChange={(e) =>
                            setNewCargo({
                                ...newCargo,
                                cargoCondition: {
                                    ...newCargo.cargoCondition,
                                    airTypeId: e.target.value,
                                },
                            })
                        }
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Habitat ID"
                        type="number"
                        fullWidth
                        value={newCargo.cargoCondition.habitatId || ''}
                        onChange={(e) =>
                            setNewCargo({
                                ...newCargo,
                                cargoCondition: {
                                    ...newCargo.cargoCondition,
                                    habitatId: e.target.value,
                                },
                            })
                        }
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Temperature Type ID"
                        type="number"
                        fullWidth
                        value={newCargo.cargoCondition.temperatureTypeId || ''}
                        onChange={(e) =>
                            setNewCargo({
                                ...newCargo,
                                cargoCondition: {
                                    ...newCargo.cargoCondition,
                                    temperatureTypeId: e.target.value,
                                },
                            })
                        }
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="Flight ID"
                        type="number"
                        fullWidth
                        value={newCargo.flightId}
                        onChange={(e) => setNewCargo({...newCargo, flightId: e.target.value})}
                        InputProps={{
                            inputProps: {min: 1}
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddCargo}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CargoPage;