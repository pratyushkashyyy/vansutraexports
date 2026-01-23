import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Breadcrumbs = ({ items }) => {
    // items format: [{ label: 'Name', path: '/url' }, ...]

    // Schema.org BreadcrumbList
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vansutraexports.com"
            },
            ...items.map((item, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": item.label,
                "item": `https://vansutraexports.com${item.path}`
            }))
        ]
    };

    return (
        <>
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(schema)}</script>
            </Helmet>
            <nav style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', color: '#666', textDecoration: 'none' }} aria-label="Home">
                    <Home size={16} />
                </Link>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <ChevronRight size={14} style={{ color: '#ccc' }} />
                        {index === items.length - 1 ? (
                            <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>{item.label}</span>
                        ) : (
                            <Link to={item.path} style={{ color: '#666', textDecoration: 'none' }}>{item.label}</Link>
                        )}
                    </React.Fragment>
                ))}
            </nav>
        </>
    );
};

export default Breadcrumbs;
