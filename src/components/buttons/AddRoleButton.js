import React, {useContext} from 'react';
import {ErrorContext} from "../../context/ErrorContext";
import {Box, Button, Tooltip} from "@mui/material";
import CreateScheduleForm from "../forms/CreateScheduleForm";
import CreateRoleForm from "../forms/CreateRoleForm";
import {AuthContext} from "../../context/AuthContext";

const AddRoleButton = () => {
    const [openCreateForm, setOpenCreateForm] = React.useState(false);
    const {setError, setSuccess} = useContext(ErrorContext);
    const {user} = useContext(AuthContext);

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
                            disabled={!Boolean(user)}
                        >
                            Add new role
                        </Button>
                    </div>
                </Tooltip>

                {openCreateForm &&
                    <CreateRoleForm onSave={handleSave} onClose={handleCloseCreateForm} setError={setError}
                                        setSuccess={setSuccess}/>
                }
            </Box>
        </div>
    );
};

export default AddRoleButton;