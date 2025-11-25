import React from 'react';
import './SuccessBanner.css';

interface SuccessBannerProps {
    message: string;
}

const SuccessBanner: React.FC<SuccessBannerProps> = ({ message }) => (
    <div className="dashboard-banner-success">
        <span>{message}</span>
    </div>
);

export default SuccessBanner;
