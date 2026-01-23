const product = {
    title: "Chinnor Rice (GI Tagged)",
    subtitle: "The 'Scent of Madhya Pradesh' - Balaghat's Pride",
    category: "Cereals",
    description: "Chinnor Rice is the first GI-tagged rice variety from Madhya Pradesh, exclusively grown in the Balaghat district. Famous for its distinct, mild sweet aroma and buttery-soft texture, it is often preferred over Basmati for traditional dishes like Kheer. Grown in the pristine wainganga river basin, this heritage grain is naturally rich in minerals and offers an unparalleled culinary experience.",
    featured: 1,
    image: "/assets/products/chinnor_rice.jpg",
    origin: "Balaghat, Madhya Pradesh, India (GI Certificate No. 642)",
    hs_code: "1006.30.90",
    quality: "Premium Heritage Grade (Aged 12+ Months)",
    size_grade: "Short-Medium Bolt Grain",
    supply_type: "Export & Premium Retail",
    loading_location: "Nagpur Dry Port / Nhava Sheva",
    highlights: [
        "First GI Tagged Rice of M.P.",
        "Unique Sweet Aroma (Natural)",
        "Buttery Soft Texture",
        "Ideal for Risotto, Kheer & Pulao",
        "Sourced from Tribal Farmers"
    ],
    export_markets: ["USA", "Middle East", "Europe", "South East Asia"],
    grading_options: {
        domestic: ["Traditional Hand-Pounded", "Polished Premium"],
        export: ["Sortex Cleaned (0% Broken)", "Sortex Cleaned (5% Broken)"]
    },
    packing_options: {
        domestic: ["1kg Vacuum Pack", "5kg Cloth Bag", "10kg Non-Woven"],
        export: ["5kg/10kg/25kg PP / Jute Bags", "Private Labeling Available"]
    },
    specifications: {
        "GI Registry No": "642",
        "Aroma": "Strong, Sweet, Floral",
        "Average Length": "5.5mm - 6.0mm",
        "Amylose Content": "Low (Easy to Digest)",
        "Texture": "Soft & Non-Sticky"
    },
    documents: ["GI Authorized User Certificate", "Certificate of Origin", "Phytosanitary Certificate", "Lab Test Report"]
};

fetch('http://localhost:3000/api/products/51', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
})
    .then(res => res.json())
    .then(data => console.log("Enrichment Success:", data))
    .catch(err => console.error("Error:", err));
