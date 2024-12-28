import React, { useState, useEffect } from "react";
import { getAllPlanets } from "../../api/api";

const GalaxyCards = () => {
    const [galaxyData, setGalaxyData] = useState({});
    const [selectedGalaxy, setSelectedGalaxy] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchPlanets = async () => {
            const data = await getAllPlanets(setError, setSuccess);
            if (data.length > 0) {
                const groupedData = data.reduce((acc, planet) => {
                    const galaxyId = planet.galaxy.id;
                    if (!acc[galaxyId]) {
                        acc[galaxyId] = {
                            galaxy: planet.galaxy,
                            planets: [],
                        };
                    }
                    acc[galaxyId].planets.push(planet);
                    return acc;
                }, {});

                setGalaxyData(groupedData);
            }
        };

        fetchPlanets();
    }, []);

    const handleGalaxyClick = (galaxyId) => {
        setSelectedGalaxy(galaxyId === selectedGalaxy ? null : galaxyId);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Explore the Galaxies</h1>
            {error && <div style={styles.error}>{error}</div>}
            {success && <div style={styles.success}>{success.message}</div>}
            <div style={styles.cardsContainer}>
                {Object.values(galaxyData).map(({ galaxy, planets }) => (
                    <div
                        key={galaxy.id}
                        style={{
                            ...styles.galaxyCard,
                            background: selectedGalaxy === galaxy.id
                                ? "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)"
                                : "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)"
                        }}
                        onClick={() => handleGalaxyClick(galaxy.id)}
                    >
                        <div style={styles.galaxyHeader}>
                            <h2>{galaxy.outputName}</h2>
                        </div>
                        {selectedGalaxy === galaxy.id && (
                            <div style={styles.planetList}>
                                <h3>Planets</h3>
                                <ul>
                                    {planets.map((planet) => (
                                        <li key={planet.id}>{planet.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        textAlign: "center",
        background: "linear-gradient(120deg, #1e1e2f, #2a2a47)",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        fontSize: "2.5em",
        marginBottom: "20px",
        color: "#ffffff",
    },
    error: {
        color: "#ff4c4c",
        fontSize: "1.2em",
        margin: "20px 0",
    },
    success: {
        color: "#2ecc71",
        fontSize: "1.2em",
        margin: "20px 0",
    },
    cardsContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap", 
        gap: "20px",
        justifyContent: "center", 
        width: "100%",
    },
    galaxyCard: {
        width: "250px",
        borderRadius: "10px",
        boxShadow: "0 8px 15px rgba(0, 0, 0, 0.3)",
        padding: "15px",
        color: "#fff",
        cursor: "pointer",
        transition: "transform 0.3s, box-shadow 0.3s",
        position: "relative",
        textAlign: "center",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
    },
    galaxyHeader: {
        fontSize: "1.5em",
        marginBottom: "10px",
    },
    planetList: {
        marginTop: "15px",
        textAlign: "left",
        background: "rgba(0, 0, 0, 0.5)",
        padding: "10px",
        borderRadius: "8px",
        boxShadow: "inset 0 4px 8px rgba(0, 0, 0, 0.3)",
    },
    planetListTitle: {
        margin: "0 0 10px 0",
        fontSize: "1.2em",
        color: "#ffdd59",
    },
};



export default GalaxyCards;
