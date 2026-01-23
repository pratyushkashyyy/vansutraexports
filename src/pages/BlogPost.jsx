import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${slug}`);
                if (!res.ok) throw new Error('Not found');
                const data = await res.json();
                setBlog(data);
            } catch (error) {
                console.error('Error fetching blog:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}>Loading...</div>;
    if (error || !blog) return <Navigate to="/404" replace />;

    return (
        <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingBottom: '4rem' }}>
            <SEO
                title={blog.title}
                description={blog.summary}
                image={blog.image}
                url={`/blog/${blog.slug}`}
                type="article"
            />

            {/* Hero Section */}
            <div style={{ height: '400px', position: 'relative', overflow: 'hidden', backgroundColor: '#333' }}>
                {blog.image && <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8))' }}></div>
                <div className="container" style={{ position: 'absolute', bottom: '3rem', left: '0', right: '0', color: 'white' }}>
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', marginBottom: '1.5rem', opacity: 0.9 }}>
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <span style={{ backgroundColor: 'var(--color-accent)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: 'bold' }}>{blog.category}</span>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', maxWidth: '900px', lineHeight: '1.2', marginBottom: '1.5rem' }}>{blog.title}</h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontSize: '1rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} /> {blog.author}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18} /> {blog.date}</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container" style={{ maxWidth: '800px', marginTop: '4rem' }}>
                <div
                    className="blog-content"
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                    style={{ fontSize: '1.15rem', color: '#333', lineHeight: '1.8' }}
                />

                <hr style={{ margin: '3rem 0', border: 'none', borderTop: '1px solid #eee' }} />

                {/* Author Bio / Share */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8f9fa', padding: '2rem', borderRadius: '12px' }}>
                    <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>About Vansutra Exports</h4>
                        <p style={{ color: '#666', fontSize: '0.95rem' }}>Leading exporter of premium Indian agricultural products. Committed to quality, transparency, and timely delivery.</p>
                    </div>
                </div>
            </div>

            <style>{`
                .blog-content h1, .blog-content h2 { font-weight: bold; margin-top: 2.5rem; margin-bottom: 1rem; color: #1a1a1a; }
                .blog-content h2 { font-size: 1.8rem; }
                .blog-content h3 { font-size: 1.4rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.8rem; color: #2e7d32; }
                .blog-content p { margin-bottom: 1.5rem; }
                .blog-content ul, .blog-content ol { margin-bottom: 1.5rem; padding-left: 1.5rem; }
                .blog-content li { margin-bottom: 0.5rem; }
                .blog-content img { max-width: 100%; height: auto; border-radius: 8px; margin: 2rem 0; }
                .blog-content a { color: var(--color-primary); text-decoration: underline; }
                .blog-content blockquote { border-left: 4px solid var(--color-primary); padding-left: 1rem; font-style: italic; color: #555; }
            `}</style>
        </div>
    );
};

export default BlogPost;
