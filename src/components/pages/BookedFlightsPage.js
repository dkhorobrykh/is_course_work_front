import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {AuthContext} from "../../context/AuthContext";
import {getAllBooks} from "../../api/api";
import {CircularProgress, Card, CardContent, Typography, Grid, Button, Box} from "@mui/material";
import AddInsuranceForPassengerButton from "../buttons/AddInsuranceForPassengerButton";

const BookedFlightsPage = () => {
    const [loading, setLoading] = useState(true);
    const {setError} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);
    const [entities, setEntities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const data = await getAllBooks(setError, () => {});
            setEntities(data);
        } catch (err) {
            setError(err.response?.data || "An error occurred");
        } finally {
            setLoading(false);
        }
    }, [setError]);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchData();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchData]);

    if (loading) return <CircularProgress />;

    return (
        <Box
            sx={{
                padding: 4,
                backgroundColor: "#f7f8fc",
                minHeight: "100vh",
            }}
        >
            {entities?.length === 0 ? (
                <Typography variant="h5" align="center" sx={{ marginTop: 4 }}>
                    No bookings found.
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {entities.map((entity) => (
                        <Grid item xs={12} md={6} key={entity.id}>
                            <Card
                                variant="outlined"
                                sx={{
                                    position: "relative",
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                    borderLeft: `8px solid ${
                                        entity.flight.flightStatus?.name === "FLIGHT" ? "#4CAF50" : "#9E9E9E"
                                    }`,
                                    display: 'flex',
                                    flexDirection: 'row',
                                }}
                            >
                                <CardContent sx={{ flex: 1 }}>
                                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                                        Flight: {entity.flight.name}
                                    </Typography>
                                    <Typography color="textSecondary" sx={{ marginBottom: 1, fontStyle: "italic" }}>
                                        Status: {entity.flight.flightStatus?.name || "Unknown"}
                                    </Typography>
                                    <Typography>
                                        <strong>Passenger:</strong> {entity.user.firstName} {entity.user.lastName} ({entity.user.surname})
                                    </Typography>
                                    <Typography>
                                        <strong>Document:</strong> {entity.userDoc.userDocType.name}, Series {entity.userDoc.series}, No. {entity.userDoc.number}
                                    </Typography>
                                    <Typography>
                                        <strong>Class:</strong> {entity.serviceClass.outputName}, Cost: {entity.serviceClass.cost}$
                                    </Typography>
                                    <Typography>
                                        <strong>Ship:</strong> {entity.flight.ship.name} ({entity.flight.ship.airType.name}, {entity.flight.ship.habitat.name})
                                    </Typography>
                                    <Typography>
                                        <strong>Planned departure:</strong> {entity.flight.flightSchedule.planetDeparture.name} — {" "}
                                        {new Date(entity.flight.flightSchedule.departureDatetime).toLocaleString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Planned arrival:</strong> {entity.flight.flightSchedule.planetArrival.name} — {" "}
                                        {new Date(entity.flight.flightSchedule.arrivalDatetime).toLocaleString()}
                                    </Typography>
                                </CardContent>
                                <Box
                                    sx={{
                                        width: '40%',
                                        padding: 2,
                                        borderLeft: "1px solid #ddd",
                                        backgroundColor: "#f9f9f9",
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 1 }}>
                                        Insurances:
                                    </Typography>
                                    {entity.insuranceIssueds.length === 0 ? (
                                        <Typography>No insurances added.</Typography>
                                    ) : (
                                        entity.insuranceIssueds.map((insurance) => (
                                            <Typography key={insurance.id}>
                                                {insurance.passengerId ? "Passenger Insurance" : "Cargo Insurance"}: {insurance.totalCost}$
                                            </Typography>
                                        ))
                                    )}
                                    <Typography>
                                        <br/><br/>
                                    </Typography>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: "16px",
                                            right: "16px",
                                        }}
                                    >
                                        <AddInsuranceForPassengerButton
                                            flightId={entity.flight.id}
                                            passenger={entity.id}
                                            user={user}
                                            onSave={() => {}}
                                            onClose={() => {}}
                                        />
                                    </Box>
                                </Box>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default BookedFlightsPage;