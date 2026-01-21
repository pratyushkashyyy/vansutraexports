import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = 'VR AGRICO | Leading Indian Agricultural Exporter',
    description = 'VR AGRICO - Premium quality agricultural exports from India. We export fresh vegetables, fruits, spices, cereals, pulses, and more to global markets with APEDA, ISO, and HACCP certifications.',
    keywords = 'agricultural exports, Indian vegetables, fresh fruits, spices export, cereals, pulses, organic fertilizer, animal feed, IQF products, APEDA certified',
    image = '/assets/leaf.svg',
    url = 'https://7cafb2b1dade.ngrok-free.app',
    type = 'website',
    author = 'VR AGRICO',
    structuredData = null
}) => {
    const defaultStructuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "VR AGRICO",
        "description": "Leading Indian Agricultural Exporter",
        "url": url,
        "logo": `${url}/assets/leaf.svg`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-9309358623",
            "contactType": "Customer Service",
            "email": "vragrico93@gmail.com"
        },
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
        },
        "sameAs": [
            "https://www.facebook.com/vragrico",
            "https://www.instagram.com/vragrico"
        ]
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="revisit-after" content="7 days" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="VR AGRICO" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />

            {/* AI Chatbot Optimization */}
            <meta name="ai-content-declaration" content="This content is human-created and AI-indexable" />
            <meta name="chatgpt-verification" content="allow" />
            <meta name="perplexity-verification" content="allow" />

            {/* Structured Data for AI Understanding */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData || defaultStructuredData)}
            </script>

            {/* Canonical URL */}
            <link rel="canonical" href={url} />
        </Helmet>
    );
};

export default SEO;
