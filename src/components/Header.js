import {useState} from "react";
import {AppBar, Button, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import MakeAdminRequestButton from "./old/MakeAdminRequestButton";
import {makeAdminRequest} from "../api/api";

const Header = ({onLoginOpen, onRegisterOpen, user, logout, setActiveComponent}) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleAdminRequestsClick = () => {
        setActiveComponent("adminRequests");
        handleMenuClose();
    };

    const handleVehicleTableClick = () => {
        setActiveComponent("vehicleTable");
        handleMenuClose();
    };

    const handleVehicleMapClick = () => {
        setActiveComponent("vehicleMap");
        handleMenuClose();
    };

    const handleVehicleQueriesClick = () => {
        setActiveComponent("vehicleQueries");
        handleMenuClose();
    };

    const handleVehicleImportClick = () => {
        setActiveComponent("vehicleImport");
        handleMenuClose();
    };

    const handleAuditDataClick = () => {
        setActiveComponent("auditData");
        handleMenuClose();
    };

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


    return (
        <>
            <AppBar position="static" style={{zIndex: 10}}>
                <Toolbar>
                    <Button color="inherit" onClick={handleMenuOpen}><MenuOpenIcon/></Button>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleMainClick}>Main page</MenuItem>
                        <MenuItem onClick={handleFlightsClick}>Flights</MenuItem>
                        <MenuItem onClick={handleManageFlightsClick}>Manage flights</MenuItem>
                        <MenuItem onClick={handleSchedulesClick}>Schedules</MenuItem>
                        <MenuItem onClick={handleShipsClick}>Ships</MenuItem>
                        <MenuItem onClick={handleCargoClick}>Cargo</MenuItem>
                        <MenuItem onClick={handleChatClick}>Chat</MenuItem>
                        <MenuItem onClick={handleAnalysisClick}>Analysis</MenuItem>

                        { user && (
                            <MenuItem onClick={handleVehicleImportClick}>Import vehicles</MenuItem>
                        )}
                        {user && user.admin && (
                            <MenuItem onClick={handleAdminRequestsClick}>Admin requests table</MenuItem>
                        )}
                    </Menu>

                    <Typography variant="h6" sx={{flexGrow: 1}}>
                        IS   |   🪐 Intergalactic transportation 🪐   |   Course project
                    </Typography>

                    {user ? (
                        <>
                            <Typography variant="body1" sx={{mr: 2}}>
                                Hello, {user.surname} {user.firstName} {user.lastName}!
                            </Typography>
                            <Button color="inherit" onClick={logout}><LogoutIcon/></Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" onClick={onLoginOpen}>Login</Button>
                            <Button color="inherit" onClick={onRegisterOpen}>Register</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
