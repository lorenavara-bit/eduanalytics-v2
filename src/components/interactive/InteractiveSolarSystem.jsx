/**
 * Sistema Solar Interactivo
 */

import { useState } from 'react';
import './InteractiveSolarSystem.css';

const PLANETS = [
    { id: 1, name: 'Mercurio', radius: 15, distance: 80, color: '#8c7853', info: 'El planeta más cercano al Sol' },
    { id: 2, name: 'Venus', radius: 22, distance: 120, color: '#ffd970', info: 'El planeta más caliente' },
    { id: 3, name: 'Tierra', radius: 24, distance: 170, color: '#4169e1', info: 'Nuestro hogar 🌍' },
    { id: 4, name: 'Marte', radius: 18, distance: 220, color: '#cd5c5c', info: 'El planeta rojo' },
    { id: 5, name: 'Júpiter', radius: 45, distance: 300, color: '#daa520', info: 'El planeta más grande' },
    { id: 6, name: 'Saturno', radius: 38, distance: 380, color: '#f4a460', info: 'El del los anillos' },
    { id: 7, name: 'Urano', radius: 28, distance: 450, color: '#4fd5d6', info: 'Gira de lado' },
    { id: 8, name: 'Neptuno', radius: 27, distance: 510, color: '#4169e1', info: 'El más lejano' },
];

const InteractiveSolarSystem = ({ mode = 'explore', targetPlanet = null, onAnswer }) => {
    const [selectedPlanet, setSelectedPlanet] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState([]);

    const handlePlanetClick = (planet) => {
        setSelectedPlanet(planet);

        if (mode === 'identify' && targetPlanet) {
            const isCorrect = planet.name.toLowerCase() === targetPlanet.toLowerCase();

            if (isCorrect) {
                setCorrectAnswers([...correctAnswers, planet.id]);
                onAnswer?.(true, planet.name);
            } else {
                onAnswer?.(false, planet.name);
            }
        } else {
            onAnswer?.(null, planet.name);
        }
    };

    const center = 300;

    return (
        <div className="interactive-solar-system-container">
            <h3 style={{ textAlign: 'center', color: '#f59e0b', margin: '0 0 1rem 0' }}>🪐 Sistema Solar</h3>

            <svg
                viewBox="0 0 600 600"
                className="solar-system-svg"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Sol */}
                <circle
                    cx={center}
                    cy={center}
                    r="40"
                    fill="url(#sunGradient)"
                    filter="url(#glow)"
                />
                <text
                    x={center}
                    y={center + 70}
                    textAnchor="middle"
                    style={{ fontSize: '16px', fontWeight: 'bold', fill: '#ff6b00' }}
                >
                    Sol ☀️
                </text>

                {/* Órbitas y planetas */}
                {PLANETS.map((planet) => (
                    <g key={planet.id}>
                        {/* Órbita */}
                        {<circle
                            cx={center}
                            cy={center}
                            r={planet.distance}
                            fill="none"
                            stroke={correctAnswers.includes(planet.id) ? '#4ade80' : '#e0e0e0'}
                            strokeWidth="1"
                            strokeDasharray="5,5"
                            opacity="0.5"
                        />}

                        {/* Planeta */}
                        <circle
                            cx={center + planet.distance}
                            cy={center}
                            r={planet.radius}
                            fill={planet.color}
                            stroke={selectedPlanet?.id === planet.id ? '#fff' : '#333'}
                            strokeWidth={selectedPlanet?.id === planet.id ? '3' : '2'}
                            className="planet-circle"
                            onClick={() => handlePlanetClick(planet)}
                            style={{ cursor: 'pointer' }}
                        />

                        {/* Nombre del planeta */}
                        <text
                            x={center + planet.distance}
                            y={center + planet.radius + 18}
                            textAnchor="middle"
                            style={{ fontSize: '11px', fontWeight: '600', fill: '#333' }}
                        >
                            {planet.name}
                        </text>
                    </g>
                ))}

                {/* Gradientes */}
                <defs>
                    <radialGradient id="sunGradient">
                        <stop offset="0%" stopColor="#ffeb3b" />
                        <stop offset="100%" stopColor="#ff6b00" />
                    </radialGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {selectedPlanet && (
                <div className="selected-planet-info">
                    <h4>{selectedPlanet.name}</h4>
                    <p>{selectedPlanet.info}</p>
                    <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Planeta #{selectedPlanet.id} desde el Sol</p>
                </div>
            )}
        </div>
    );
};

export default InteractiveSolarSystem;
