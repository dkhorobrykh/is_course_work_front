import React, {useState} from 'react';
import {addUserRole} from "../../api/api";
import {Box, Button, Modal, TextField} from "@mui/material";

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

const CreateUserRoleForm = ({setError, setSuccess, onClose, onSave}) => {
    const [userRoleData, setUserRoleData] = useState({
        userId: null,
        roleId: null
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;

        setUserRoleData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addUserRole(userRoleData.roleId, userRoleData.userId, setError, setSuccess);
        onClose();
    }

    return (
        <Modal open onClose={onClose}>
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        type="number"
                        label="User ID"
                        name="userId"
                        value={userRoleData.userId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <TextField
                        type="number"
                        label="Role ID"
                        name="roleId"
                        value={userRoleData.roleId}
                        onChange={handleInputChange}
                        fullWidth
                        sx={fieldSt}
                        required
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth sx={fieldSt}>
                        Add role to user
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateUserRoleForm;