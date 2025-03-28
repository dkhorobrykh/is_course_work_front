import {useContext, useState} from "react";
import {AppBar, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import MakeAdminRequestButton from "./old/MakeAdminRequestButton";
import {addMoney, makeAdminRequest} from "../api/api";
import RoleService from "./RoleService";
import AddIcon from "@mui/icons-material/Add";
import {AuthContext} from "../context/AuthContext";
import {ErrorContext} from "../context/ErrorContext";

const Header = ({onLoginOpen, onRegisterOpen, user, logout, setActiveComponent}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {setError, setSuccess} = useContext(ErrorContext);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleFlightsClick = () => {
        setActiveComponent("flights");
        handleMenuClose();
    };

    const handleMainClick = () => {
        setActiveComponent("main");
        handleMenuClose();
    };

    const handleSchedulesClick = () => {
        setActiveComponent("schedules");
        handleMenuClose();
    };

    const handleShipsClick = () => {
        setActiveComponent("ships");
        handleMenuClose();
    };

    const handleCargoClick = () => {
        setActiveComponent("cargo");
        handleMenuClose();
    };

    const handleChatClick = () => {
        setActiveComponent("chatPage");
        handleMenuClose();
    };


    const handleAnalysisClick = () => {
        setActiveComponent("analysisPage");
        handleMenuClose();
    };


    const handleManageFlightsClick = () => {
        setActiveComponent("manageFlights");
        handleMenuClose();
    }

    const handleGalaxy = () => {
        setActiveComponent("galaxy");
        handleMenuClose();
    }

    const handleUserDocsClick = () => {
        setActiveComponent("userDocs");
        handleMenuClose();
    }

    const handleRoleClick = () => {
        setActiveComponent("rolePage");
        handleMenuClose();
    }

    const handleUserRoleClick = () => {
        setActiveComponent("userRolePage");
        handleMenuClose();
    }

    const handleCheck = () => {
        setActiveComponent("checkingPage");
        handleMenuClose();
    }

    const handleBookedFlightsClick = () => {
        setActiveComponent("bookedFlightsPage");
        handleMenuClose();
    }

    const handleInsuranceProgramClick = () => {
        setActiveComponent("insurancePrograms");
        handleMenuClose();
    }

    return (<>
            <AppBar position="static" style={{zIndex: 10}}>
                <Toolbar>
                    <Button color="inherit" onClick={handleMenuOpen}><MenuOpenIcon/></Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMainClick}>Main page</MenuItem>

                        {user && (<>
                            <MenuItem onClick={handleBookedFlightsClick}>Booked flights</MenuItem>
                            <MenuItem onClick={handleCargoClick}>Cargo</MenuItem>
                            <MenuItem onClick={handleChatClick}>Chat</MenuItem>
                            <MenuItem onClick={handleUserDocsClick}>Documents</MenuItem>
                            <MenuItem onClick={handleFlightsClick}>Flights</MenuItem>
                            <MenuItem onClick={handleGalaxy}>Galaxy</MenuItem>
                        </>)}

                        {user && RoleService.isAdmin(user) && (<>
                                <MenuItem onClick={() => {
                                }} style={{background: "#e13535"}}>----------------------</MenuItem>
                                <MenuItem onClick={() => {
                                }} style={{background: "#e13535"}}>| ADMIN ZONE |</MenuItem>
                                <MenuItem onClick={() => {
                                }} style={{background: "#e13535"}}> vvvvvvvvvvvvv</MenuItem>
                                <MenuItem onClick={handleAnalysisClick}>Analysis</MenuItem>
                                <MenuItem onClick={handleManageFlightsClick}>Manage flights</MenuItem>
                                <MenuItem onClick={handleCheck}>Pre Flight Checking</MenuItem>
                                <MenuItem onClick={handleRoleClick}>Roles</MenuItem>
                                <MenuItem onClick={handleUserRoleClick}>User roles</MenuItem>
                                <MenuItem onClick={handleSchedulesClick}>Schedules</MenuItem>
                                <MenuItem onClick={handleShipsClick}>Ships</MenuItem>
                                <MenuItem onClick={handleInsuranceProgramClick}>Insurance programs</MenuItem>
                            </>)}
                    </Menu>

                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        IS | 🪐 Intergalactic transportation 🪐 | Course project
                    </Typography>

                    {user ? (<>
                            <Typography variant="body1" sx={{mr: 2}}>
                                Hello, {user.surname} {user.firstName} {user.lastName}!
                            </Typography>

                            <Typography variant="body1" sx={{mr: 2}}>
                                Your balance is {user.balance}$
                            </Typography>
                            <Button color="#00ff00" onClick={() => addMoney(user.id, setError, setSuccess)}><AddIcon/></Button>
                            <Button color="inherit" onClick={logout}><LogoutIcon/></Button>
                        </>) : (<>
                            <Button color="inherit" onClick={onLoginOpen}>Login</Button>
                            <Button color="inherit" onClick={onRegisterOpen}>Register</Button>
                        </>)}
                </Toolbar>
            </AppBar>
        </>);
};

export default Header;
