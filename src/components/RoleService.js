const RoleService = {
    isAdmin(user) {
        if (!user || !user.roles) return false;
        return user.roles.some(role => role.name === 'ADMIN');
    },

    hasAccessToFlight(user, flightId) {
        if (!user || !user.roles || !flightId) return false;
        return user.roles.some(role => role.flight?.id === flightId);
    }
};

export default RoleService;