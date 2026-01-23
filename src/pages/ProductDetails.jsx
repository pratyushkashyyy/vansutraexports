import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, Phone, Mail, FileText, Globe, Package, Truck, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';

const ProductDetails = () => {
    const { id } = useParams(); // Route uses :id, which can be an ID or Slug
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setProduct(data);
                } else {
                    console.error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading product details...</div>;
    if (!product) return <div style={{ padding: '4rem', textAlign: 'center' }}>Product not found. <Link to="/products">Back to Products</Link></div>;

    // Safe JSON Parse Helper
    const safeParse = (data, fallback) => {
        try {
            if (!data) return fallback;
            // Handle corrupted "[object Object]" strings in DB
            if (typeof data === 'string' && data.includes('[object Object]')) return fallback;
            return JSON.parse(data);
        } catch (error) {
            console.warn('JSON parse error for product data:', error);
            return fallback;
        }
    };

    // Parse JSON fields
    const highlights = safeParse(product.highlights, []);
    const gradingOptions = safeParse(product.grading_options, {});
    const packingOptions = safeParse(product.packing_options, {});
    const exportMarkets = safeParse(product.export_markets, []);
    const documents = safeParse(product.documents, []);

    // Breadcrumb Items
    const breadcrumbItems = [
        { label: 'Products', path: '/products' },
        { label: product.category, path: `/products?category=${product.category.toLowerCase()}` },
        { label: product.title, path: `/products/${product.slug || product.id}` }
    ];

    // Product Schema (JSON-LD)
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "image": product.image ? `https://vansutraexports.com${product.image}` : undefined,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Vansutra Exports"
        },
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "price": "0.00" // Requires quote
        }
    };

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
            <SEO
                title={product.title}
                description={`Export quality ${product.title} from India. ${product.description ? product.description.substring(0, 150) : ''}...`}
                image={product.image}
                url={`/products/${product.slug || product.id}`}
                keywords={`${product.title}, buy ${product.title}, ${product.title} exporter india, ${product.category} export`}
            />
            <Helmet>
                <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
            </Helmet>

            {/* Header / Breadcrumb */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                <div className="container">
                    <div style={{ marginBottom: '0.5rem' }}>
                        <Breadcrumbs items={breadcrumbItems} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {product.category}
                            </span>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.2rem 0', color: '#1a1a1a' }}>{product.title}</h1>
                            <p style={{ color: '#555', fontSize: '1.1rem' }}>{product.subtitle}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '0.5rem 1rem', borderRadius: '8px', display: 'inline-block' }}>
                                <span style={{ fontSize: '0.8rem', display: 'block', fontWeight: '600' }}>HS CODE</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'monospace' }}>{product.hs_code}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start' }}>

                {/* Left Column: Image, Highlights, CTA, & Quick Info (Sticky) */}
                <div className="product-details-sidebar">
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                        <img
                            src={product.image && product.image.startsWith('http') ? product.image : (product.image || '/assets/leaf.svg')}
                            alt={product.title}
                            width="600"
                            height="350"
                            loading="eager" // Main LCP image should be eager
                            fetchpriority="high"
                            style={{ width: '100%', height: '350px', objectFit: 'cover' }}
                            onError={(e) => { e.target.src = '/assets/leaf.svg'; e.target.style.objectFit = 'contain'; e.target.style.padding = '2rem'; }}
                        />
                    </div>

                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={20} color="var(--color-primary)" /> Quick Highlights
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {highlights.map((item, index) => (
                                <li key={index} style={{ marginBottom: '0.8rem', paddingLeft: '1.5rem', position: 'relative', color: '#444' }}>
                                    <span style={{ position: 'absolute', left: 0, top: '4px', color: 'var(--color-primary)' }}>•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Buttons */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                        <a
                            href={`https://wa.me/917879743528?text=${encodeURIComponent(`Hi, I need a quote for *${product.title}* (HS Code: ${product.hs_code}).`)}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{
                                backgroundColor: '#25D366', color: 'white', padding: '1rem', borderRadius: '8px',
                                textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)'
                            }}
                        >
                            <Phone size={20} /> Get Quote on WhatsApp
                        </a>
                        <Link to="/contact" style={{
                            backgroundColor: 'white', color: '#333', border: '2px solid #eee', padding: '1rem', borderRadius: '8px',
                            textAlign: 'center', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
                        }}>
                            <Mail size={20} /> Request Quotation
                        </Link>
                    </div>

                    {/* Moved Section: Export Markets (Mini View) */}
                    <div style={{ marginBottom: '1.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
                            <Globe size={18} color="var(--color-primary)" /> Export Markets
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {exportMarkets.map((market, i) => (
                                <span key={i} style={{ backgroundColor: '#e3f2fd', color: '#1565c0', padding: '0.4rem 0.8rem', borderRadius: '15px', fontSize: '0.85rem', fontWeight: '600' }}>
                                    {market}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Moved Section: Documents (Mini View) */}
                    <div style={{ backgroundColor: '#f1f8e9', padding: '1.5rem', borderRadius: '12px', border: '1px solid #c5e1a5' }}>
                        <h4 style={{ color: '#2e7d32', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                            <FileText size={18} /> Documents Provided
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {documents.map((doc, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#333' }}>
                                    <CheckCircle size={14} color="#2e7d32" style={{ flexShrink: 0 }} /> <span>{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Details */}
                <div>
                    {/* 1. Overview */}
                    <div style={{ marginBottom: '3rem' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                            <h2 style={{ marginTop: 0, fontSize: '1.8rem', color: '#333', marginBottom: '1rem' }}>Product Overview</h2>
                            <p style={{ color: '#555', lineHeight: '1.8', fontSize: '1.1rem' }}>{product.description}</p>
                            <p style={{ color: '#555', lineHeight: '1.8', marginTop: '1rem' }}>
                                We supply Premium <strong>{product.title}</strong> for both domestic and export markets.
                                Our products are properly sorted, graded, and packed as per destination country requirements.
                            </p>
                        </div>
                    </div>

                    {/* 2. Specifications Table */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>Product Specification</h2>
                        <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #eee' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                                <tbody>
                                    {[
                                        ['Product Name', product.title],
                                        ['HS Code', product.hs_code],
                                        ['Type', product.category],
                                        ['Quality', product.quality],
                                        ['Size / Grade', product.size_grade],
                                        ['Origin', product.origin],
                                        ['Packing', product.packing],
                                        ['Supply Ability', 'Bulk / Container Orders'],
                                        ['Loading Location', product.loading_location]
                                    ].map(([label, value], i) => (
                                        <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                            <td style={{ padding: '1.2rem', color: '#555', fontWeight: '600', width: '35%', backgroundColor: '#f9f9f9' }}>{label}</td>
                                            <td style={{ padding: '1.2rem', color: '#333', fontWeight: '500' }}>{value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* 3. Grading */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>Size / Grading Available</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {gradingOptions.export && (
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                    <h4 style={{ color: '#2e7d32', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                        <Globe size={20} /> Export Grades
                                    </h4>
                                    <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
                                        {gradingOptions.export.map((g, i) => <li key={i}>{g}</li>)}
                                    </ul>
                                </div>
                            )}
                            {gradingOptions.domestic && (
                                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                                    <h4 style={{ color: '#f57c00', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                                        <Truck size={20} /> Domestic Grades
                                    </h4>
                                    <ul style={{ paddingLeft: '1.5rem', color: '#555', lineHeight: '1.8' }}>
                                        {gradingOptions.domestic.map((g, i) => <li key={i}>{g}</li>)}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 4. Packing (Accordion style or Grid) */}
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>Packing Options</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                            {Object.entries(packingOptions).map(([market, options]) => (
                                <div key={market} style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                                    <h5 style={{ textTransform: 'capitalize', color: '#333', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem', fontSize: '1.05rem' }}>
                                        {market.replace('_', ' ')}
                                    </h5>
                                    <ul style={{ paddingLeft: '1.2rem', margin: 0, fontSize: '0.95rem', color: '#555', lineHeight: '1.6' }}>
                                        {options.map((opt, i) => <li key={i} style={{ marginBottom: '0.3rem' }}>{opt}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: '#e3f2fd', borderRadius: '8px', color: '#0d47a1', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                            <Package size={20} />
                            <span style={{ fontWeight: '500' }}>Custom packing & private labeling can be provided on request.</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
