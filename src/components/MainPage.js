import React from 'react';

const MainPage = () => {
    return (
        <div className="MainPage" style={{
            zIndex: -1,
            position: 'relative',
            height: '100vh',
            overflow: 'hidden',
            marginTop: '-4rem',
            marginRight: '-3rem',
            marginLeft: '-3rem',
            marginBottom: '-1.5rem',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',  // Чтобы текст и блюр были вертикально
        }}>
            <iframe
                src="https://www.youtube.com/embed/SjC5bezSaWU?autoplay=1&mute=1&loop=1&playlist=SjC5bezSaWU&controls=0&showinfo=0&rel=0&modestbranding=1"
                frameBorder="0"
                width="100%"
                height="100%"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: -4,
                    objectFit: 'cover',
                }}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            ></iframe>

            {/* Блок с блюром под текстом */}
            <div style={{
                position: 'absolute',
                height: '20%',
                top: '52.5%',  // Располагаем под текстом
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '85%', // Ширина, чтобы был отступ от краев
                padding: '1rem',
                background: 'rgb(113,112,110,.15)',  // Полупрозрачный чёрный фон
                borderRadius: '10px',
                filter: 'blur(5px)', // Добавляем блюр
                zIndex: -3,
            }}></div>

            <div style={{
                position: 'relative',
                textAlign: 'center',
                color: 'white',
                fontSize: '2rem',
                fontWeight: 'bold',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.6)',
                padding: '1rem',
                zIndex: -2,
            }}>
                <h1>🚀 Welcome to the Intergalactic Transport System 🌌</h1>
                <p>Your gateway to seamless travel across galaxies and beyond! 🌠</p>
            </div>
        </div>
    );
};

export default MainPage;
