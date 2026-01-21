# Vansutra Exports 🌿

Welcome to the official repository for **Vansutra Exports**, a premium agricultural export business based in India. Use this application to explore our wide range of products including Fresh Vegetables, Fruits, Spices, Cereals, and more.

![Vansutra Exports Banner](public/assets/leaf.svg)

## 📖 About The Project

Vansutra Exports is dedicated to delivering the finest quality Indian agricultural produce to the global market. We prioritize freshness, quality assurance (APEDA, ISO, HACCP certified), and customer satisfaction.

This web application serves as our digital catalog and company portfolio, allowing international clients to:
- Browse our product categories (Vegetables, Fruits, Spices, Pulses, etc.).
- View detailed product information.
- Connect with us directly via WhatsApp or Email.
- Access company information and certifications.

## 🛠️ Technology Stack

We use a modern, fast, and reliable tech stack to ensure the best user experience:

- **Frontend**: React.js (v18+) with Vite for lightning-fast development and build performance.
- **Styling**: Vanilla CSS with responsive design principles for mobile adaptability.
- **Backend API**: Node.js & Express.js for handling product data and dynamic requests.
- **Database**: SQLite for a lightweight, self-contained product inventory system.
- **Deployment**: Optimized for Nginx on VPS, with PM2 for process management.

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pratyushkashyyy/vansutraexports.git
   cd vansutraexports
   ```

2. **Install Dependencies**
   ```bash
   # Install root/frontend dependencies
   npm install
   
   # Install server/backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Initialize the Database**
   The project uses a local SQLite database. It will be automatically seeded on first run.

### Running the Application

**Development Mode** (Run both frontend & backend concurrently):
```bash
npm start
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`

**Manual Start**:
- Backend: `npm run server`
- Frontend: `npm run dev`

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

This will generate a `dist/` folder containing the static assets ready for deployment (e.g., via Nginx).

## 📂 Project Structure

```
vansutraexports/
├── public/              # Static assets (images, logos, robots.txt)
├── server/              # Backend Node.js server & database
│   ├── routes/          # API routes
│   └── database.sqlite  # Product database
├── src/                 # React Frontend Source
│   ├── components/      # Reusable UI components
│   ├── pages/           # Application pages (Home, Products, etc.)
│   └── App.jsx          # Main application component
├── vite.config.js       # Vite configuration (Proxy, Plugins)
└── package.json         # Project dependencies and scripts
```

## ✨ distinct Features

- **Dynamic Product Catalog**: Products are managed via database and can be filtered by category.
- **SEO Optimized**: Includes Sitemap generation, Meta tags, and Structured Data (JSON-LD) for better search ranking.
- **Performance Tuned**: Optimized images (WebP), lazy loading, and preloading for critical assets (Clean LCP).
- **Responsive Design**: Mobile-friendly interface with optimized navigation.

## 📞 Contact

**Vansutra Exports**
- 📧 Email: info.vansutra@gmail.com
- 📱 Phone: +91 7879743528
- 🌍 Location: India

---
*Created with ❤️ for Vansutra Exports*
