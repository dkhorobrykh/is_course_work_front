import React, { useEffect, useState } from 'react';
import { getFlightAnalysisSummary } from "../../api/api";
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
    TablePagination
} from "@mui/material";

const AnalysisPage = () => {
    const [loading, setLoading] = useState(false);
    const [analysisData, setAnalysisData] = useState([]);
    const [flightNameFilter, setFlightNameFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const fetchFlightAnalysis = async () => {
        setLoading(true);
        try {
            const data = await getFlightAnalysisSummary();
            setAnalysisData(data);
        } catch (err) {
            console.error('Error fetching flight analysis:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlightAnalysis();
    }, []);

    const filteredData = analysisData.filter(row =>
        flightNameFilter ? row.flight.toLowerCase().includes(flightNameFilter.toLowerCase()) : true
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const dataToDisplay = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div>
            <Button
                variant="contained"
                onClick={fetchFlightAnalysis}
                style={{
                    margin: '16px 0',
                    width: '300px',
                }}
            >
                Load Flight Analysis
            </Button>

            <TextField
                label="Filter by Flight Name"
                variant="outlined"
                value={flightNameFilter}
                onChange={(e) => setFlightNameFilter(e.target.value)}
                style={{
                    margin: '16px 0',
                    width: '200px',
                }}
            />

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Flight Name</TableCell>
                                <TableCell>Passenger Count</TableCell>
                                <TableCell>Total Cargo Weight</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataToDisplay.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3}>No data available</TableCell>
                                </TableRow>
                            ) : (
                                dataToDisplay.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.flight}</TableCell>
                                        <TableCell>{row.passengers}</TableCell>
                                        <TableCell>{row.totalCargoWeight} kg</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
        </div>
    );
};

export default AnalysisPage;
