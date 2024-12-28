import React, {useCallback, useEffect, useState} from 'react';
import {
    addInsurance,
    addSchedule,
    bookFlight,
    getAvailableInsurancePrograms,
    getPlanetList,
    updateSchedule
} from "../../api/api";
import {Box, Button, MenuItem, Modal, TextField} from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const fieldSt = {
    my: 1.25,
};

const CreateInsuranceForm = ({passengerId, flightId, cargoId, user, setError, setSuccess, onSave, onClose}) => {
    const [availablePrograms, setAvailablePrograms] = useState([]);

    const [insuranceData, setInsuranceData] = useState({
        passengerId: passengerId,
        cargoId: cargoId,
        flightId: flightId,
        insuranceProgramId: null,
        insuranceProgramName: ""
    });

    const fetchAvailablePrograms = useCallback(async () => {
        try {
            const data = await getAvailableInsurancePrograms(flightId, setError, () => {});
            setAvailablePrograms(data);
        } catch (error) {
            setError(error.response.data);
        }
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            fetchAvailablePrograms();
        }, 5000);

        return () => clearInterval(intervalId);
    }, [fetchAvailablePrograms]);

    useEffect(() => {
        fetchAvailablePrograms();
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'insuranceProgramName') {
            const selectedProgram = availablePrograms.find((program) => program.id === value);
            setInsuranceData((prevState) => ({
                ...prevState,
                insuranceProgramName: selectedProgram?.name || "",
                insuranceProgramId: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addInsurance(insuranceData, setError, setSuccess);
        if (onSave) onSave();
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        select
                        label="Insurance program"
                        name="insuranceProgramName"
                        value={insuranceData.insuranceProgramId || ""}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                    >
                        {availablePrograms.map(program => (
                            <MenuItem value={program.id || ""}>{program.name} -- refund: {program.refundAmount}$ -- cost: {program.minCost}</MenuItem>
                        ))};
                    </TextField>

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        Add insurance
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateInsuranceForm;