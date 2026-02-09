import React from 'react';

const RadarChart = ({ data, size = 300 }) => {
    // data format: [{ label: 'Lógica', value: 80 }, ...]
    const levels = 5; // Cantidad de anillos concéntricos
    const padding = 50;
    const center = size / 2;
    const radius = center - padding;
    const angleStep = (Math.PI * 2) / data.length;

    // Generar los puntos para el polígono de datos
    const points = data.map((d, i) => {
        const val = (d.value / 100) * radius;
        const x = center + val * Math.cos(i * angleStep - Math.PI / 2);
        const y = center + val * Math.sin(i * angleStep - Math.PI / 2);
        return `${x},${y}`;
    }).join(' ');

    // Generar las líneas de la cuadrícula (telaraña)
    const gridPoints = [];
    for (let i = 1; i <= levels; i++) {
        const levelRadius = (radius / levels) * i;
        gridPoints.push(data.map((_, j) => {
            const x = center + levelRadius * Math.cos(j * angleStep - Math.PI / 2);
            const y = center + levelRadius * Math.sin(j * angleStep - Math.PI / 2);
            return `${x},${y}`;
        }).join(' '));
    }

    return (
        <div className="relative flex items-center justify-center select-none">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                {/* Cuadrícula de fondo */}
                {gridPoints.map((gp, i) => (
                    <polygon
                        key={i}
                        points={gp}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                    />
                ))}

                {/* Ejes */}
                {data.map((_, i) => {
                    const x = center + radius * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + radius * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={x}
                            y2={y}
                            stroke="#e2e8f0"
                            strokeWidth="1"
                        />
                    );
                })}

                {/* Polígono de Datos (La forma del cerebro) */}
                <polygon
                    points={points}
                    fill="rgba(99, 102, 241, 0.2)"
                    stroke="#6366f1"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    className="animate-in fade-in duration-1000"
                >
                    <animate
                        attributeName="points"
                        dur="1s"
                        from={`${center},${center} `.repeat(data.length)}
                        to={points}
                    />
                </polygon>

                {/* Etiquetas */}
                {data.map((d, i) => {
                    const labelRadius = radius + 20;
                    const x = center + labelRadius * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + labelRadius * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <text
                            key={i}
                            x={x}
                            y={y}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-[10px] font-black uppercase tracking-tighter fill-gray-500"
                        >
                            {d.label}
                        </text>
                    );
                })}

                {/* Puntos en los vértices */}
                {data.map((d, i) => {
                    const val = (d.value / 100) * radius;
                    const x = center + val * Math.cos(i * angleStep - Math.PI / 2);
                    const y = center + val * Math.sin(i * angleStep - Math.PI / 2);
                    return (
                        <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="4"
                            className="fill-indigo-600 shadow-xl"
                        />
                    );
                })}
            </svg>
        </div>
    );
};

export default RadarChart;
