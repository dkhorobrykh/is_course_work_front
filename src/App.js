import './App.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "./context/AuthContext";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import Header from "./components/Header";
import {ErrorContext} from "./context/ErrorContext";
import {setupInterceptors} from "./api/UseAxiosErrorInterceptor";
import FlightsPage from "./components/pages/FlightsPage";
import MainPage from "./components/pages/MainPage";
import SchedulePage from "./components/pages/SchedulePage";
import ShipPage from "./components/pages/ShipPage";
import CargoPage from "./components/pages/CargoPage";
import ChatPage from "./components/pages/ChatPage";
import ManageFlightsPage from "./components/pages/ManageFlightsPage";
import GalaxyPage from "./components/pages/GalaxyPage";
import UserDocPage from "./components/pages/UserDocPage";
import RoleListPage from "./components/pages/RoleListPage";
import AnalysisPage from "./components/pages/AnalysisPage";
import UserRoleListPage from "./components/pages/UserRoleListPage";
import PreFlightCheckPage from "./components/pages/PreFlightCheckPage";
import BookedFlightsPage from "./components/pages/BookedFlightsPage";
import InsuranceProgramPage from "./components/pages/InsuranceProgramPage";

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

                {activeComponent === "manageFlights" && <ManageFlightsPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "galaxy" && <GalaxyPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "userDocs" && <UserDocPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "rolePage" && <RoleListPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "analysisPage" && <AnalysisPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "userRolePage" && <UserRoleListPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "checkingPage" && <PreFlightCheckPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "bookedFlightsPage" && <BookedFlightsPage setActiveComponent={setActiveComponent}/>}

                {activeComponent === "insurancePrograms" && <InsuranceProgramPage setActiveComponent={setActiveComponent}/>}
            </div>
        </div>
    );
}

export default App;
