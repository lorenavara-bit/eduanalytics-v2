// Componente de ejemplo: Mostrar info del plan del usuario
// Este componente muestra cómo usar el hook usePlan

import React from 'react';
import { usePlan } from '../hooks/usePlan';

function PlanBadge() {
    const {
        plan,
        planName,
        planPrice,
        isPremium,
        isBeta,
        loading
    } = usePlan();

    if (loading) {
        return (
            <div className="plan-badge loading">
                Cargando...
            </div>
        );
    }

    return (
        <div className={`plan-badge ${plan}`}>
            {isPremium && <span className="icon">💎</span>}
            {isBeta && <span className="icon">🆓</span>}
            <span className="plan-name">{planName}</span>
            <span className="plan-price">{planPrice}</span>

            <style jsx>{`
        .plan-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .plan-badge.beta {
          background: #e3f2fd;
          color: #1976d2;
          border: 1px solid #bbdefb;
        }
        
        .plan-badge.premium {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
        }
        
        .plan-badge.loading {
          background: #f5f5f5;
          color: #999;
        }
        
        .icon {
          font-size: 18px;
        }
        
        .plan-price {
          font-size: 12px;
          opacity: 0.9;
        }
      `}</style>
        </div>
    );
}

export default PlanBadge;
