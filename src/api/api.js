import api from './UseAxiosErrorInterceptor';
import {BASE_API_URL} from "../config/config";
import {Vehicle} from "../models/Vehicle";

export const getAllFlights = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/flight")
        setSuccess({message: "Flights successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching flights data", error);
    }
}

export const getAllSchedules = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/admin/schedules")
        setSuccess({message: "Schedules successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching schedules data", error);
    }
}

export const getPlanetList = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/planet/all")
        setSuccess({message: "Flights successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching flights data", error);
    }
}

export const getAllShips = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/ships");
        setSuccess({message: "Ships successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching ships data", error);
    }
}

export const updateSchedule = async (scheduleId, scheduleData, setError, setSuccess) => {
    try {
        const response = await api.put(BASE_API_URL + `/admin/schedules/${scheduleId}`, scheduleData);
        setSuccess({message: "Schedule successfully updated"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error creating schedule", error);
    }
}

export const addSchedule = async (scheduleData, setError, setSuccess) => {
    try {
        const response = await api.post(BASE_API_URL + "/admin/schedules", scheduleData);
        setSuccess({message: "Schedule successfully created"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error creating schedule", error);
    }
}

export const updateShip = async (shipId, shipData, setError, setSuccess) => {
    try {
        const response = await api.put(BASE_API_URL + `/ships/${shipId}`, shipData);
        setSuccess({message: "Ship successfully updated"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error updating ship", error);
    }
}

export const addShip = async (shipData, setError, setSuccess) => {
    try {
        const response = await api.post(BASE_API_URL + "/ships/add", shipData);
        setSuccess({message: "Ship successfully created"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error creating ship", error);
    }
}

export const getHabitatList = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/habitat");
        setSuccess({message: "Habitat list successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getHabitatList", error);
    }
}

export const getTemperatureTypeList = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/temperature");
        setSuccess({message: "Temperature successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getTemperatureTypeList", error);
    }
}

export const getAirTypeList = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/air");
        setSuccess({message: "Air successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getAirTypeList", error);
    }
}

export const assignFlight = async (scheduleId, flightData, setError, setSuccess) => {
    try {
        const response = await api.post(BASE_API_URL + `/admin/schedules/${scheduleId}/assignFlight`, flightData);
        setSuccess({message: "Flight successfully assigned"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error assignFlight", error);
    }
}

export const getAllChats = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/chat");
        setSuccess({message: "Chats successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching chats", error);
    }
};

export const sendMessageToChat = async (chatId, messageData, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/chat/${chatId}/send`, messageData);
        setSuccess({message: "Message successfully sent"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error sending message", error);
    }
};

export const createChat = async (secondUserId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/chat/${secondUserId}`);
        setSuccess({message: "Chat successfully created"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error creating chat", error);
    }
};
export const getFlightAnalysisSummary = async () => {
    try {
        const response = await api.get('/flow-analysis/summary');
        return response.data;  
    } catch (error) {
        console.error("Error fetching flight analysis data:", error);
        throw error;
    }
};


export const changeFlightStatus = async (flightId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/flight/${flightId}/status-change`, flightId);
        setSuccess({message: "Flight status successfully updated"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error changing flight status", error);
    }
}

export const changeCargoStatus = async (flightId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/flight/${flightId}/cargo/status-change`, flightId);
        setSuccess({message: "Cargo status successfully updated"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error changing cargo status", error);
    }
}

export const getUserDocs = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/user/docs");
        setSuccess({message: "User docs successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getUserDocs ", error);
    }
}

export const getServiceClassList = async (flightId, setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + `/serviceClass/${flightId}`);
        setSuccess({message: "Service Class list successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getServiceClassList ", error);
    }
}

export const bookFlight = async (flightData, setError, setSuccess) => {
    try {
        const response = await api.post(BASE_API_URL + `/flight/book`, flightData);
        setSuccess({message: "Flight successfully booked"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error bookFlight", error);
    }
}


export const getAllPlanets = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/planet/all"); 
        setSuccess({ message: "Planets successfully received" });
        return response.data; 
    } catch (error) {
        setError(error.response?.data || "Error fetching planets data");
        console.error("Error fetching planets data", error);
        return []; 
    }
};

export const addUserDoc = async (docData, setError, setSuccess) => {
    try {
        const response = await api.post(BASE_API_URL + `/user/docs`, docData);
        setSuccess({message: "User doc successfully added"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error adding user doc", error);
    }
}

export const getAllUserDocs = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/user/docs`);
        setSuccess({message: "User docs successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getAllUsersDocs ", error);
    }
}

export const getUserDocTypes = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/user/docs/types`);
        setSuccess({message: "User doc types successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getUserDocTypes ", error);
    }
}

export const addRole = async (roleData, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/admin/role`, roleData);
        setSuccess({message: "User role successfully added"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error adding role", error);
    }
}

export const getAllRoles = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/admin/role`);
        setSuccess({message: "Roles successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getAllRoles ", error);
    }
}

export const getAllUserRoles = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/user/all`);
        setSuccess({message: "User roles successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error getAllUserRoles ", error);
    }
}

export const deleteUserRole = async (roleId, userId, setError, setSuccess) => {
    try {
        const response = await api.delete(`${BASE_API_URL}/admin/role/delete/${roleId}/from/${userId}`);
        setSuccess({message: "User role successfully deleted"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error deleting user role", error);
    }
}

export const addUserRole = async (roleId, userId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/admin/role/add/${roleId}/to/${userId}`, roleId);
        setSuccess({message: "User role successfully added"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error adding user role", error);
    }
}

export const performPreFlightCheck = async (scheduleId) => {
    try {
        const response = await api.post(`${BASE_API_URL}/preflight/${scheduleId}/check`);
        return response;
    } catch (error) {
        throw error; 
    }
};

export const getAllBooks = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/passenger");
        setSuccess({message: "Books successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching books data", error);
    }
}

export const getAvailableInsurancePrograms = async (flightId, setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/insurance/programs/${flightId}`);
        setSuccess({message: "Insurance programs successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching insurance programs", error);
    }
}

export const addInsurance = async (insuranceData, setError, setSuccess) => {
    try {
        const response = await api.post(BASE_API_URL + "/insurance", insuranceData);
        setSuccess({message: "Insurance successfully added"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error adding insurance", error);
    }
}

export const getAllInsurancePrograms = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/insurance/programs`);
        setSuccess({message: "Insurance programs successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching insurance programs ", error);
    }
}

export const addInsuranceProgram = async (insuranceProgramData, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/insurance/programs`, insuranceProgramData);
        setSuccess({message: "Successfully added insurance program"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error adding new insurance program ", error);
    }
}

export const fuelUpdate = async (shipId, fuelLevel, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/ship-status/${shipId}`, {fuelLevel: fuelLevel});
        setSuccess({message: "Fuel level successfully updated"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error updating fuel type", error);
    }
}

export const addMoney = async (userId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/user/${userId}/balance?amount=5000`);
        setSuccess({message: "Balance successfully updated"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error updating user balance", error);
    }
}

// -----------------------------------------------------------------------------

export const getImportHistory = async (setError, setSuccess) => {
    try {
        const response = await api.get(BASE_API_URL + "/import");
        setSuccess({message: "Import history successfully received"});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching import history data", error);
    }
}

export const importVehicles = async (formData, setError, setSuccess) => {
    try {
        await api.post(BASE_API_URL + "/import", formData, {
            headers: {'Content-Type': 'multipart/form-data'},
        });
        setSuccess({message: "Successfully imported!"});
    } catch (error) {
        setError(error.response.data);
        console.error("Error importing vehicle data", error);
    }
}

export const getAuditData = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/audit`);
        setSuccess({message: "Audit Data was successfully received."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching audit data:", error);
    }
}

export const getEntities = async (filters, setFilters, setError, setSuccess) => {
    try {
        let {name, fuelType, vehicleType, sortBy, ascending, page, size} = filters;

        let response = await api.get(`${BASE_API_URL}/vehicle`, {
            params: {
                name,
                fuelType,
                vehicleType,
                sortBy,
                ascending,
                page,
                size
            }
        })

        if (response.data.length === 0 && filters.page > 0) {
            setFilters(prev => ({
                ...prev,
                page: prev.page -= 1
            }));

            response = await getEntities(filters, setFilters, setError, setSuccess);
        }

        setSuccess({message: "Vehicles was successfully updated."});

        return response.data.map(entity => Vehicle.fromApiData(entity));
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching entities: ", error);
    }
}

export const updateEntity = async (id, updatedEntity, setError, setSuccess) => {
    try {
        const response = await api.put(`${BASE_API_URL}/vehicle/${id}`, updatedEntity);
        setSuccess({message: `Vehicle with id [${id}] was successfully updated.`});
        return response.data;
    } catch (error) {
        console.error('Error updating entity:', error);
        setError(error.response.data);
    }
}

export const addVehicle = async (addedEntity, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/vehicle/add`, {...addedEntity});
        setSuccess({message: "Vehicle was successfully added."})
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error('Error adding entity:', error);
    }
}

export const getAllCargo = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/cargo`);
        setSuccess({message: "Cargo successfully received."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching cargo data:", error);
    }
};


export const addCargo = async (cargoData, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/cargo`, cargoData);
        if (setSuccess) setSuccess({message: "Cargo successfully added."});
        return response.data;
    } catch (error) {
        if (setError) setError(error.response?.data || "Error adding cargo");
        console.error("Error adding cargo:", error);
    }
};

export const getAllCargoWhereCurrentUserIsSender = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/cargo/sender`);
        setSuccess({message: "Cargo successfully received."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching cargo data:", error);
    }
};

export const getAllCargoWhereCurrentUserIsRecipient = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/cargo/recipient`);
        setSuccess({message: "Cargo successfully received."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching cargo data:", error);
    }
};

export const getAllCargoByFlightId = async (flightId, setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/cargo/${flightId}`);
        setSuccess({message: "Cargo successfully received."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error fetching cargo data:", error);
    }
};



export const deleteEntity = async (vehicleId, setError, setSuccess) => {
    try {
        const response = await api.delete(`${BASE_API_URL}/vehicle/${vehicleId}`);
        setSuccess({message: `Vehicle with id [${vehicleId}] was successfully deleted.`});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error('Error deleting entity: ', error);
    }
}

export const makeAdminRequest = async (userId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/user/admin/request`);
        setSuccess({message: "Admin request was successfully sent."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error('Error making admin request:', error);
    }
}

export const getAdminRequests = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/user/admin/requests`);
        setSuccess({message: "Admin requests was successfully got."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error('Error getting admin requests:', error);
    }
}

export const approveAdminRequest = async (requestId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/user/admin/request/${requestId}/approve`);
        setSuccess({message: `Admin request with id [${requestId}] was successfully approved.`});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error('Error approving admin request:', error);
    }
}

export const declineAdminRequest = async (requestId, setError, setSuccess) => {
    try {
        const response = await api.post(`${BASE_API_URL}/user/admin/request/${requestId}/decline`);
        setSuccess({message: `Admin request with id [${requestId}] was successfully declined.`});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error('Error declining admin request:', error);
    }
}

export const groupByEnginePower = async (setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/vehicle/query/group-by-engine-power`);
        setSuccess({message: "Grouped by engine power successfully."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error grouping by engine power: ", error);
    }
};

export const countByFuelConsumption = async (neededFuelConsumption, setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/vehicle/query/count-by-fuel-consumption/${neededFuelConsumption}`);
        setSuccess({message: "Count by fuel consumption retrieved successfully."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error counting by fuel consumption: ", error);
    }
};

export const countByFuelTypeLessThan = async (neededFuelType, setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/vehicle/query/count-by-fuel-type-less-than/${neededFuelType}`);
        setSuccess({message: "Count by fuel type retrieved successfully."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error counting by fuel type: ", error);
    }
};

export const findByEnginePowerRange = async (minPower, maxPower, setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/vehicle/query/find-by-engine-power-range/${minPower}/${maxPower}`);
        setSuccess({message: "Vehicles by engine power range retrieved successfully."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error finding by engine power range: ", error);
    }
};

export const findByWheelCountRange = async (minNumber, maxNumber, setError, setSuccess) => {
    try {
        const response = await api.get(`${BASE_API_URL}/vehicle/query/find-by-wheel-count-range/${minNumber}/${maxNumber}`);
        setSuccess({message: "Vehicles by wheel count range retrieved successfully."});
        return response.data;
    } catch (error) {
        setError(error.response.data);
        console.error("Error finding by wheel count range: ", error);
    }
};