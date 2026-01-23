import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch('/api/blogs');
                const data = await res.json();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingBottom: '4rem' }}>
            <SEO
                title="Market Insights & News"
                description="Latest updates on agricultural exports, spice market trends, and farming innovations from Vansutra Exports."
            />

            <div style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: '3rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Market Insights</h1>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Expert analysis on the global agricultural trade</p>
                </div>
            </div>

            <div className="container" style={{ marginTop: '3rem' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>Loading insights...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {blogs.map(blog => (
                            <article key={blog.id} style={{ backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.3s', display: 'flex', flexDirection: 'column' }}>
                                <Link to={`/blog/${blog.slug}`} style={{ overflow: 'hidden', height: '200px', display: 'block', backgroundColor: '#eee' }}>
                                    {blog.image ? (
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                                            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                                        />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>No Image</div>
                                    )}
                                </Link>
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: '#888', marginBottom: '0.8rem' }}>
                                        <span style={{ color: 'var(--color-accent)', fontWeight: 'bold', textTransform: 'uppercase' }}>{blog.category}</span>
                                        <span>•</span>
                                        <span>{blog.date}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '1rem', lineHeight: '1.4' }}>
                                        <Link to={`/blog/${blog.slug}`} style={{ color: '#333', textDecoration: 'none' }}>{blog.title}</Link>
                                    </h2>
                                    <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                        {blog.summary}
                                    </p>
                                    <Link to={`/blog/${blog.slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', fontWeight: 'bold', textDecoration: 'none' }}>
                                        Read Article <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Blog;
