import './App.css';
import VehicleTable from "./components/old/VehicleTable";
import {useCallback, useContext, useEffect, useState} from "react";
import {getEntities} from "./api/api";
import {AuthContext} from "./context/AuthContext";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Header from "./components/Header";
import VehicleMap from "./components/old/VehicleMap";
import AdminRequestsTable from "./components/old/AdminRequestsTable";
import {ErrorContext} from "./context/ErrorContext";
import {setupInterceptors} from "./api/UseAxiosErrorInterceptor";
import VehicleQueryTable from "./components/old/queries/VehicleQueryTable";
import AuditDataTable from "./components/old/AuditDataTable";
import VehicleImportTable from "./components/old/VehicleImportTable";
import FlightsPage from "./components/pages/FlightsPage";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ShipPage from "./components/pages/ShipPage";
import CargoPage from "./components/CargoPage";
import ChatPage from "./components/pages/ChatPage";

function App() {
    const {setError, setSuccess} = useContext(ErrorContext);

    useEffect(() => {
        setupInterceptors(setError);
    }, [setError]);

    const [activeComponent, setActiveComponent] = useState("main");
    const {user, logout} = useContext(AuthContext);

    return (
        <div className="App">
            <Header
                onLoginOpen={() => setActiveComponent("loginPage")}
                onRegisterOpen={() => setActiveComponent("registerPage")}
                setActiveComponent={setActiveComponent}
                user={user}
                logout={logout}
            />

            <div className="activeElement" style={{
                paddingTop: 0,
                paddingRight: '3rem',
                paddingLeft: '3rem',
                paddingBottom: '1.5rem'
            }}>
                {activeComponent === "loginPage" && <LoginPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "registerPage" && <RegisterPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "flights" && <FlightsPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "main" && <MainPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "schedules" && <SchedulePage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "cargo" && <CargoPage setActiveComponent={setActiveComponent}/>} 

                {activeComponent === "ships" && <ShipPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "chatPage" && <ChatPage setActiveComponent={setActiveComponent}/>}
            </div>
        </div>
    );
}

export default App;
