import React from 'react';
import { useNavigate } from 'react-router-dom';
import EarlyDetectionGames from '../EarlyDetectionGames';

const DiagnosticDashboard = () => {
    const navigate = useNavigate();

    // Directly render the simplified Diagnostic Page (Tests & Results)
    // defaulting to 'guest' for now, or we could grab context if available.
    return (
        <EarlyDetectionGames
            studentId="guest"
            onBack={() => navigate('/')}
        />
    );
};

export default DiagnosticDashboard;
