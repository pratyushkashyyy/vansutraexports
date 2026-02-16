import React from 'react';
import { Phone } from 'lucide-react';

const FloatingCallButton = () => {
    const phoneNumber = '+917879743528';

    return (
        <a
            href={`tel:${phoneNumber}`}
            className="floating-action-button call-button"
            style={{
                position: 'fixed',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0, 123, 255, 0.4)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.6)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 123, 255, 0.4)';
            }}
        >
            <Phone className="button-icon" />
            <style>
                {`
                    .call-button {
                        bottom: 100px;
                        right: 30px;
                        padding: 1rem;
                        animation: pulse-blue 2s infinite;
                    }
                    .call-button .button-icon {
                        width: 32px;
                        height: 32px;
                    }

                    @media (max-width: 768px) {
                        .call-button {
                            bottom: 85px;
                            right: 20px;
                            padding: 0.8rem;
                        }
                        .call-button .button-icon {
                            width: 24px;
                            height: 24px;
                        }
                    }

                    @keyframes pulse-blue {
                        0%, 100% {
                            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
                        }
                        50% {
                            box-shadow: 0 4px 20px rgba(0, 123, 255, 0.8);
                        }
                    }
                `}
            </style>
        </a>
    );
};

export default FloatingCallButton;
