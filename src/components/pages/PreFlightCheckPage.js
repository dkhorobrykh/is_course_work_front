import React, { useState } from 'react';
import { Button, CircularProgress, TextField, Paper, Typography, Grid, Box } from '@mui/material';
import { performPreFlightCheck } from "../../api/api";

const PreFlightCheckPage = () => {
    const [loading, setLoading] = useState(false);
    const [scheduleId, setScheduleId] = useState('');
    const [checkResult, setCheckResult] = useState('');
    const [error, setError] = useState('');

    const handlePreFlightCheck = async () => {
        if (!scheduleId || isNaN(scheduleId)) {
            setError('Пожалуйста, введите корректный числовой Schedule ID.');
            return;
        }

        const scheduleIdNumeric = Number(scheduleId);

        setLoading(true);
        setError('');
        setCheckResult('');

        try {
            const result = await performPreFlightCheck(scheduleIdNumeric);
            setCheckResult(result.data);
        } catch (err) {
            setError('Не удалось выполнить предполетную проверку.');
            console.error('Ошибка при выполнении предполетной проверки:', err);
        } finally {
            setLoading(false);
        }
    };

    const getColorForStatus = (status, type) => {
        if (type === 'engine') {
            switch (status) {
                case 'OK':
                    return 'green';
                case 'WARNING':
                    return 'orange';
                case 'CRITICAL':
                    return 'red';
                default:
                    return 'black';
            }
        } else if (type === 'fuel') {
            switch (status) {
                case 'FULL':
                    return 'green';
                case 'LOW':
                    return 'orange';
                case 'CRITICAL':
                    return 'red';
                default:
                    return 'black';
            }
        } else if (type === 'radiation') {
            switch (status) {
                case 'RESISTANT':
                    return 'green';
                case 'NON_RESISTANT':
                    return 'red';
                default:
                    return 'black';
            }
        }
    };

    return (
        <div>
            <Paper style={{ padding: '16px', marginTop: '16px' }}>
                <Typography variant="h5">Предполетная проверка</Typography>

                <TextField
                    label="Введите Schedule ID"
                    variant="outlined"
                    value={scheduleId}
                    onChange={(e) => setScheduleId(e.target.value)}
                    style={{
                        margin: '16px 0',
                        width: '250px',
                    }}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />

                {error && <Typography color="error">{error}</Typography>}

                <Button
                    variant="contained"
                    onClick={handlePreFlightCheck}
                    style={{
                        margin: '16px 0',
                        width: '250px',
                    }}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : 'Запустить предполетную проверку'}
                </Button>
                
                <Typography variant="h6" style={{ marginTop: '16px' }}>
                    Возможные состояния:
                </Typography>

                <Grid container spacing={2} style={{ marginTop: '16px' }}>
                    <Grid item xs={4}>
                        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                            <strong>Engine Status</strong>
                        </Typography>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('OK', 'engine'),
                            }}
                        >
                            OK
                        </Box>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('WARNING', 'engine'),
                            }}
                        >
                            WARNING
                        </Box>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('CRITICAL', 'engine'),
                            }}
                        >
                            CRITICAL
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                            <strong>Fuel Status</strong>
                        </Typography>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('FULL', 'fuel'),
                            }}
                        >
                            FULL
                        </Box>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('LOW', 'fuel'),
                            }}
                        >
                            LOW
                        </Box>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('CRITICAL', 'fuel'),
                            }}
                        >
                            CRITICAL
                        </Box>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="subtitle1" style={{ textAlign: 'center' }}>
                            <strong>Radiation Resistance</strong>
                        </Typography>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('RESISTANT', 'radiation'),
                            }}
                        >
                            RESISTANT
                        </Box>
                        <Box
                            style={{
                                textAlign: 'center',
                                color: getColorForStatus('NON_RESISTANT', 'radiation'),
                            }}
                        >
                            NON_RESISTANT
                        </Box>
                    </Grid>
                </Grid>

                {checkResult && (
                    <div style={{ marginTop: '16px' }}>
                        <Typography variant="body1">{checkResult}</Typography>
                    </div>
                )}
            </Paper>
        </div>
    );
};

export default PreFlightCheckPage;
