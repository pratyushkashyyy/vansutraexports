#!/bin/bash

# Vansutra Exports - VPS Deployment Preparation Script
# This script prepares your project for VPS deployment

echo "======================================"
echo "Vansutra Exports - Deployment Prep"
echo "======================================"
echo ""

# 1. Create deployment package directory
echo "Creating deployment package..."
mkdir -p deployment-package

# 2. Copy necessary files
echo "Copying project files..."
cp -r src deployment-package/
cp -r public deployment-package/
cp -r server deployment-package/
cp package.json deployment-package/
cp package-lock.json deployment-package/
cp index.html deployment-package/
cp vite.config.js deployment-package/
cp .gitignore deployment-package/ 2>/dev/null || true

# 3. Create .env file template
echo "Creating .env template..."
cat > deployment-package/.env.example << 'EOF'
NODE_ENV=production
PORT=3000
EOF

# 4. Create deployment instructions
echo "Creating deployment README..."
cat > deployment-package/DEPLOY.md << 'EOF'
# Deployment Instructions

## Quick Start

1. Upload this entire folder to your VPS: `/var/www/vansutraexports`
2. Install dependencies: `npm install && cd server && npm install && cd ..`
3. Build frontend: `npm run build`
4. Start backend: `pm2 start server/index.js --name vansutra-backend`
5. Configure Nginx (see main deployment guide)
6. Setup SSL with Certbot

## Important Files

- `server/database.sqlite` - Your product database
- `public/assets/` - Product images and assets
- `dist/` - Built frontend (created after `npm run build`)

## Environment Variables

Copy `.env.example` to `.env` and configure if needed.

## Support

Refer to the main VPS Deployment Guide for detailed instructions.
EOF

# 5. Create PM2 ecosystem file
echo "Creating PM2 configuration..."
cat > deployment-package/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'vansutra-backend',
    script: './server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

# 6. Create logs directory
mkdir -p deployment-package/logs

# 7. Create backup script
echo "Creating backup script..."
cat > deployment-package/backup.sh << 'EOF'
#!/bin/bash
# Backup script for Vansutra Exports

BACKUP_DIR="/var/www/vansutraexports/backups"
DB_FILE="/var/www/vansutraexports/server/database.sqlite"
DATE=$(date +%Y%m%d-%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

# Backup database
cp $DB_FILE $BACKUP_DIR/database-$DATE.sqlite

# Keep only last 30 backups
cd $BACKUP_DIR
ls -t | tail -n +31 | xargs rm -f

echo "Backup completed: database-$DATE.sqlite"
EOF

chmod +x deployment-package/backup.sh

# 8. Create update script
echo "Creating update script..."
cat > deployment-package/update.sh << 'EOF'
#!/bin/bash
# Update script for Vansutra Exports

echo "Updating Vansutra Exports..."

# Pull latest changes (if using git)
# git pull origin main

# Install dependencies
npm install
cd server && npm install && cd ..

# Build frontend
npm run build

# Restart backend
pm2 restart vansutra-backend

# Reload Nginx
sudo systemctl reload nginx

echo "Update completed!"
EOF

chmod +x deployment-package/update.sh

# 9. Create archive
echo "Creating deployment archive..."
tar -czf vansutra-deployment.tar.gz deployment-package/

echo ""
echo "======================================"
echo "Deployment package ready!"
echo "======================================"
echo ""
echo "Files created:"
echo "  - deployment-package/ (folder with all files)"
echo "  - vansutra-deployment.tar.gz (compressed archive)"
echo ""
echo "Next steps:"
echo "  1. Upload vansutra-deployment.tar.gz to your VPS"
echo "  2. Extract: tar -xzf vansutra-deployment.tar.gz"
echo "  3. Follow the deployment guide"
echo ""
