# Vansutra Exports - Pre-Deployment Checklist

## Before You Start

### 1. VPS Requirements
- [ ] Ubuntu 20.04 or 22.04 LTS
- [ ] Minimum 1GB RAM (2GB recommended)
- [ ] 20GB disk space
- [ ] Root or sudo access
- [ ] Public IP address

### 2. Domain Setup
- [ ] Domain purchased: `vansutraexports.com`
- [ ] DNS A record pointing to VPS IP
- [ ] WWW subdomain configured
- [ ] DNS propagation complete (check: https://dnschecker.org)

### 3. Local Preparation
- [ ] All code tested locally
- [ ] Database populated with products
- [ ] Images uploaded to `public/assets/`
- [ ] Contact information updated
- [ ] Admin password changed

## Deployment Steps Checklist

### Phase 1: Server Setup (30 minutes)
- [ ] Connect to VPS via SSH
- [ ] Update system packages
- [ ] Install Node.js 20.x
- [ ] Install PM2 globally
- [ ] Install Nginx
- [ ] Configure firewall (UFW)

### Phase 2: Upload Files (15 minutes)
- [ ] Create `/var/www/vansutraexports` directory
- [ ] Upload project files via SCP/SFTP/Git
- [ ] Set correct permissions
- [ ] Verify all files uploaded

### Phase 3: Install Dependencies (10 minutes)
- [ ] Run `npm install` in root
- [ ] Run `npm install` in server folder
- [ ] Verify no errors

### Phase 4: Build & Start (10 minutes)
- [ ] Run `npm run build`
- [ ] Verify `dist` folder created
- [ ] Start backend with PM2
- [ ] Save PM2 configuration
- [ ] Setup PM2 startup script

### Phase 5: Nginx Configuration (20 minutes)
- [ ] Create Nginx config file
- [ ] Enable site configuration
- [ ] Test Nginx config
- [ ] Reload Nginx
- [ ] Test HTTP access

### Phase 6: SSL Certificate (10 minutes)
- [ ] Install Certbot
- [ ] Obtain SSL certificate
- [ ] Configure auto-renewal
- [ ] Test HTTPS access

### Phase 7: Testing (15 minutes)
- [ ] Homepage loads correctly
- [ ] All pages accessible
- [ ] Products display properly
- [ ] WhatsApp buttons work
- [ ] Contact form functional
- [ ] Admin panel accessible
- [ ] Mobile responsive
- [ ] SSL certificate valid

### Phase 8: Post-Deployment (10 minutes)
- [ ] Setup database backups
- [ ] Configure log rotation
- [ ] Setup monitoring (optional)
- [ ] Document server details
- [ ] Test update process

## Important Information to Save

### Server Details
```
VPS IP: ___________________
SSH Port: __________________
Username: __________________
```

### Application Details
```
Domain: vansutraexports.com
Backend Port: 3000
PM2 App Name: vansutra-backend
Project Path: /var/www/vansutraexports
```

### Credentials
```
Admin Password: ___________________
SSH Password/Key: __________________
Domain Registrar: __________________
```

## Quick Commands Reference

### SSH Connection
```bash
ssh username@your_vps_ip
```

### Application Management
```bash
# View logs
pm2 logs vansutra-backend

# Restart app
pm2 restart vansutra-backend

# Check status
pm2 status
```

### Nginx Management
```bash
# Test config
sudo nginx -t

# Reload
sudo systemctl reload nginx

# View logs
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate
```bash
# Renew
sudo certbot renew

# Check status
sudo certbot certificates
```

## Troubleshooting Quick Fixes

### Website not loading
```bash
sudo systemctl status nginx
pm2 status
```

### API errors
```bash
pm2 logs vansutra-backend
pm2 restart vansutra-backend
```

### SSL issues
```bash
sudo certbot renew --force-renewal
```

## Post-Deployment Tasks

### Immediate (Day 1)
- [ ] Submit sitemap to Google Search Console
- [ ] Test all functionality thoroughly
- [ ] Setup monitoring alerts
- [ ] Create first database backup

### Within Week 1
- [ ] Monitor error logs daily
- [ ] Check website performance
- [ ] Test email notifications (if any)
- [ ] Verify WhatsApp integration
- [ ] Check mobile experience

### Ongoing Maintenance
- [ ] Weekly: Check logs and backups
- [ ] Monthly: Update system packages
- [ ] Monthly: Review SSL certificate
- [ ] Quarterly: Security audit
- [ ] As needed: Content updates

## Support Resources

- **Deployment Guide**: See `vps-deployment-guide.md`
- **Nginx Docs**: https://nginx.org/en/docs/
- **PM2 Docs**: https://pm2.keymetrics.io/docs/
- **Let's Encrypt**: https://letsencrypt.org/docs/

## Emergency Contacts

```
VPS Provider Support: ___________________
Domain Registrar: ___________________
Developer: ___________________
```

---

**Estimated Total Time**: 2-3 hours for complete deployment

**Difficulty Level**: Intermediate

**Recommended**: Have this checklist open during deployment
