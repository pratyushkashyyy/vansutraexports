const product = {
    title: "New Product (See PDF)",
    category: "Vegetables",
    description: "Please check the attached PDF for product details. Placeholder created by Assistant.",
    featured: 1,
    image: "",
    highlights: ["Pending update"],
    export_markets: [],
    grading_options: { domestic: [], export: [] },
    packing_options: { domestic: [], export: [] },
    documents: []
};

fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product)
})
    .then(res => res.json())
    .then(data => console.log("Success:", data))
    .catch(err => console.error("Error:", err));
