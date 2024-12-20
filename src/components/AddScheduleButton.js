import React, {useContext} from 'react';
import {ErrorContext} from "../context/ErrorContext";
import {Box, Button, Tooltip} from "@mui/material";
import CreateVehicleForm from "./old/CreateVehicleForm";
import CreateScheduleForm from "./CreateScheduleForm";

const AddScheduleButton = ({onScheduleAdding, user}) => {
    const [openCreateForm, setOpenCreateForm] = React.useState(false);
    const {setError, setSuccess} = useContext(ErrorContext);

    const handleOpenCreateForm = () => setOpenCreateForm(true);
    const handleCloseCreateForm = () => setOpenCreateForm(false);

    const handleSave = () => {
        if (onScheduleAdding) onScheduleAdding();
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
                            disabled={!Boolean(user)}
                        >
                            Add new schedule
                        </Button>
                    </div>
                </Tooltip>

                {openCreateForm &&
                    <CreateScheduleForm onSave={handleSave} onClose={handleCloseCreateForm} setError={setError}
                                       setSuccess={setSuccess}/>
                }
            </Box>
        </div>
    );
};

export default AddScheduleButton;