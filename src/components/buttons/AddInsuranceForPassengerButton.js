import React, {useContext} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {Box, Button, Tooltip} from "@mui/material";
import CreateScheduleForm from "../forms/CreateScheduleForm";
import CreateInsuranceForm from "../forms/CreateInsuranceForm";

const AddInsuranceForPassengerButton = ({passenger, flightId, cargoId, user, disabled}) => {
    const [openCreateForm, setOpenCreateForm] = React.useState(false);
    const {setError, setSuccess} = useContext(ErrorContext);

    const handleOpenCreateForm = () => setOpenCreateForm(true);
    const handleCloseCreateForm = () => setOpenCreateForm(false);

    const handleSave = () => {
        handleCloseCreateForm();
    }

    return (
        <div>
            <Box sx={{textAlign: 'center'}}>
                <Tooltip title={Boolean(user) ? "" : "First, log in!"} style={{margin: 0}} placement="top">
                    <div style={{padding: 0}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenCreateForm}
                            sx={{mb: 0}}
                            disabled={!Boolean(user) || disabled}
                        >
                            Add new insurance
                        </Button>
                    </div>
                </Tooltip>

                {openCreateForm &&
                    <CreateInsuranceForm onSave={handleSave} onClose={handleCloseCreateForm} setError={setError}
                                        setSuccess={setSuccess} passengerId={passenger} flightId={flightId} cargoId={cargoId} user={user}/>
                }
            </Box>
        </div>
    );
};

export default AddInsuranceForPassengerButton;