import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = ({ productName = null, productCategory = null }) => {
    const phoneNumber = '917879743528';

    const getMessage = () => {
        if (productName && productCategory) {
            return `Hello! I'm interested in *${productName}* from your ${productCategory} category. Can you please provide more details?`;
        }
        return 'Hello! I would like to inquire about your products.';
    };

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(getMessage())}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: 'fixed',
                bottom: '30px',
                right: '30px',
                backgroundColor: '#25D366',
                color: 'white',
                padding: '1rem',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
                zIndex: 9999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: 'pulse 2s infinite'
            }}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
            }}
        >
            <MessageCircle size={32} />
            <style>
                {`
                    @keyframes pulse {
                        0%, 100% {
                            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
                        }
                        50% {
                            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.8);
                        }
                    }
                `}
            </style>
        </a>
    );
};

export default WhatsAppButton;
