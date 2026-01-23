import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            padding: '2rem'
        }}>
            <SEO title="Page Not Found" description="The page you are looking for does not exist." />

            <h1 style={{ fontSize: '6rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0' }}>404</h1>
            <h2 style={{ fontSize: '2rem', color: '#333', marginBottom: '1rem' }}>Page Not Found</h2>
            <p style={{ color: '#666', maxWidth: '500px', margin: '0 auto 2rem', fontSize: '1.1rem' }}>
                Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link to="/" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                    <Home size={20} /> Go Home
                </Link>
                <Link to="/products" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'white',
                    color: '#333',
                    border: '1px solid #ddd',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                    <Search size={20} /> Browse Products
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
