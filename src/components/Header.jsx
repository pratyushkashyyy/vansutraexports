import React, { useState } from 'react';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? { color: 'var(--color-primary)', backgroundColor: 'rgba(46, 125, 50, 0.1)', padding: '0.5rem 1rem', borderRadius: '20px' } : { padding: '0.5rem 1rem' };

  const productCategories = [
    { name: 'Vegetables', slug: 'vegetables' },
    { name: 'Fruits', slug: 'fruits' },
    { name: 'Spices', slug: 'spices' },
    { name: 'Cereals', slug: 'cereals' },
    { name: 'Pulses', slug: 'pulses' },
    { name: 'IQF', slug: 'iqf' },
    { name: 'Animal Feed', slug: 'feed' },
    { name: 'Organic Fertilizer', slug: 'organic' },
    { name: 'Flowers', slug: 'flowers' },
    { name: 'Dairy Products', slug: 'dairy' }
  ];

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      {/* Top Bar */}
      <div className="top-bar" style={{ backgroundColor: 'var(--color-primary)', color: 'white', fontSize: '0.875rem', padding: '0.5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="contact-info" style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Phone size={14} /> +91 7879743528</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Mail size={14} /> info.vansutra@gmail.com</span>
          </div>
          <div className="trust-badges" style={{ display: 'flex', gap: '1rem' }}>
            <span>Global Delivery</span>
            <span>Quality Assured</span>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container" style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '1.5rem', color: 'var(--color-primary)', textDecoration: 'none' }}>
          <img src="/assets/leaf.svg" alt="Vansutra Exports" style={{ height: '32px' }} />
          VANSUTRA EXPORTS
        </Link>

        {/* Desktop Menu */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '0.5rem', fontWeight: '500', alignItems: 'center' }}>
          <Link to="/" style={{ ...isActive('/'), textDecoration: 'none', color: '#333', transition: 'all 0.3s' }}>Home</Link>

          {/* Products Dropdown */}
          <div
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <Link
              to="/products"
              style={{
                ...isActive('/products'),
                textDecoration: 'none',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                transition: 'all 0.3s'
              }}
            >
              Products <ChevronDown size={16} />
            </Link>

            {/* Dropdown Menu */}
            {isProductsOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  backgroundColor: 'white',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                  borderRadius: '8px',
                  padding: '0.5rem 0',
                  paddingTop: '0.5rem',
                  minWidth: '200px',
                  marginTop: '0',
                  zIndex: 1001
                }}
              >
                {productCategories.map((category) => (
                  <Link
                    key={category.slug}
                    to={`/products?category=${category.slug}`}
                    style={{
                      display: 'block',
                      padding: '0.75rem 1.5rem',
                      color: '#333',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/about" style={{ ...isActive('/about'), textDecoration: 'none', color: '#333', transition: 'all 0.3s' }}>About Us</Link>
          <Link to="/contact" style={{ ...isActive('/contact'), textDecoration: 'none', color: '#333', transition: 'all 0.3s' }}>Contact</Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} style={{ display: window.innerWidth > 768 ? 'none' : 'block', background: 'none', border: 'none', cursor: 'pointer' }}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: 'white', borderBottom: '1px solid #eee', padding: '1rem', zIndex: 1000 }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>About Us</Link>
            <Link to="/products" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>Products</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#333' }}>Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
