# Deployment Guides

## 1. Vercel (Recommended)

Vercel is the creator of Next.js and provides seamless deployment.

### Setup Steps

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub account
   - Click "Import Project"
   - Select this repository
   - Click "Import"

3. **Configure Environment Variables**

   - In Vercel dashboard, go to Settings → Environment Variables
   - Add any variables from `.env.example`
   - Mark sensitive ones as sensitive

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys to production
   - Get your URL from the dashboard

### Auto-Deployment

Every push to `main` automatically deploys:

- Merges to `main` → Production
- Merges to `develop` → Preview (optional)

### Preview URL

- Generated automatically for each branch
- Share with team for review
- Auto-delete after branch is deleted

### Custom Domain

1. Go to Settings → Domains
2. Add your domain
3. Follow DNS configuration
4. SSL certificate auto-provisioned

### Monitoring

- Real-time logs: Deployments → Logs
- Analytics: Analytics tab
- Performance: Insights tab

**Cost**: Free tier includes generous limits. Paid plans for higher usage.

---

## 2. Netlify

Alternative to Vercel with similar features.

### Setup Steps

1. **Connect Repository**

   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Authorize GitHub and select repository

2. **Configure Build Settings**

   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js version: 20.x

3. **Environment Variables**

   - Go to Site settings → Build & deploy → Environment
   - Add variables from `.env.example`

4. **Deploy**
   - Click "Deploy"
   - Netlify builds and deploys automatically

### Configure netlify.toml

```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/_next/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Monitoring

- Deploy log: Deploys tab
- Function logs: Functions tab
- Errors: Error tracking integration

**Cost**: Free tier with sufficient limits. Paid for advanced features.

---

## 3. Docker + Cloud Hosting

Deploy as Docker container to cloud providers.

### Build Docker Image

```bash
# Build image
docker build -t nextapp:latest .

# Tag for registry
docker tag nextapp:latest username/nextapp:latest

# Push to Docker Hub
docker login
docker push username/nextapp:latest
```

### Option A: AWS ECS (Elastic Container Service)

1. **Create ECR Repository**

   ```bash
   aws ecr create-repository --repository-name nextapp
   ```

2. **Push Image**

   ```bash
   docker tag nextapp:latest <aws-account>.dkr.ecr.<region>.amazonaws.com/nextapp:latest
   docker push <aws-account>.dkr.ecr.<region>.amazonaws.com/nextapp:latest
   ```

3. **Create ECS Cluster**

   - AWS Console → ECS → Create Cluster
   - Select Fargate launch type
   - Configure task definition with pushed image

4. **Create Service**
   - Set number of tasks (e.g., 2 for redundancy)
   - Configure load balancer
   - Set environment variables

**Cost**: Pay for compute resources used (starts ~$0.05/hour)

### Option B: Google Cloud Run

1. **Build and Push Image**

   ```bash
   gcloud builds submit --tag gcr.io/PROJECT_ID/nextapp
   ```

2. **Deploy Service**

   ```bash
   gcloud run deploy nextapp \
     --image gcr.io/PROJECT_ID/nextapp \
     --platform managed \
     --region us-central1 \
     --memory 512Mi \
     --set-env-vars "NEXT_PUBLIC_API_URL=https://nextapp.com"
   ```

3. **Configure Custom Domain**
   - Cloud Run Console → Services → nextapp
   - Click "Manage Custom Domains"
   - Add your domain and verify DNS

**Cost**: Free tier includes 180,000 vCPU-seconds/month

### Option C: Azure Container Instances

1. **Push to Azure Container Registry**

   ```bash
   az acr build --registry <name> --image nextapp:latest .
   ```

2. **Deploy Container**
   ```bash
   az container create \
     --resource-group mygroup \
     --name nextapp \
     --image myregistry.azurecr.io/nextapp:latest \
     --ports 3000 \
     --environment-variables NEXT_PUBLIC_API_URL="https://nextapp.com"
   ```

**Cost**: Pay per vCPU and memory (starts ~$0.002/vCPU-second)

### Monitor Container

```bash
# View logs
docker logs <container-id>

# Access container shell
docker exec -it <container-id> /bin/sh

# Check health
curl http://localhost:3000/api/health
```

---

## 4. Traditional Linux Server (VPS/Dedicated)

Deploy to own Linux server with Nginx.

### Prerequisites

- Linux server (Ubuntu 20.04+)
- Node.js 20+ installed
- Nginx installed
- Git installed
- Domain name with DNS pointing to server

### Setup Steps

1. **SSH into Server**

   ```bash
   ssh root@your-server-ip
   ```

2. **Clone Repository**

   ```bash
   cd /var/www
   git clone <your-repo-url> nextapp
   cd nextapp
   ```

3. **Install Dependencies**

   ```bash
   npm install --omit=dev
   ```

4. **Build Application**

   ```bash
   npm run build
   ```

5. **Install PM2** (Process Manager)

   ```bash
   npm install -g pm2

   # Start application
   pm2 start npm --name "nextapp" -- start

   # Auto-restart on reboot
   pm2 startup
   pm2 save
   ```

6. **Configure Nginx**

   ```bash
   sudo nano /etc/nginx/sites-available/nextapp
   # Copy content from nginx.conf in repo

   sudo ln -s /etc/nginx/sites-available/nextapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL Certificate** (Let's Encrypt)

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

8. **Setup Auto-Renewal**
   ```bash
   sudo systemctl enable certbot.timer
   sudo systemctl start certbot.timer
   ```

### Monitoring & Maintenance

```bash
# View PM2 logs
pm2 logs nextapp

# Monitor processes
pm2 monit

# Update code
cd /var/www/nextapp
git pull origin main
npm install --omit=dev
npm run build
pm2 reload nextapp
```

### Firewall Configuration

```bash
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS
sudo ufw enable
```

**Cost**: Typically $5-50/month depending on resources

---

## 5. GitHub Pages (Static Export)

For static-only hosting (no dynamic APIs).

### Setup

1. **Enable Static Export**

   ```bash
   # In next.config.ts
   export default {
     output: 'export'
   };
   ```

2. **Build Static Files**

   ```bash
   npm run build
   # Creates 'out' directory with static files
   ```

3. **Deploy to GitHub Pages**

   ```bash
   npx gh-pages -d out
   ```

4. **Configure Repository**
   - Go to Settings → Pages
   - Select "Deploy from branch"
   - Branch: gh-pages
   - Directory: / (root)

**Pros**: Free hosting with GitHub account
**Cons**: No server-side rendering, API routes, or database access

---

## Environment Variables Setup

### For Each Platform

**Vercel**

```
Settings → Environment Variables
- Add each variable
- Mark sensitive variables
- Redeploy after changes
```

**Netlify**

```
Site settings → Build & deploy → Environment
- Add variables
- Rebuild after changes
```

**Docker/Server**

```
Create .env file or pass as env variables:
docker run -e NEXT_PUBLIC_API_URL="https://api.example.com" ...

Or in systemd service:
Environment="NEXT_PUBLIC_API_URL=https://api.example.com"
```

### Required Variables

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

---

## Monitoring & Analytics

### Sentry (Error Tracking)

```javascript
// Add to app layout
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### Google Analytics

```javascript
// Add Google Analytics tracking
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
```

### Nginx Monitoring

- Use `nginx-module-geoip2` for geo tracking
- Parse logs with `goaccess`
- Setup Prometheus + Grafana

---

## Scaling Considerations

### When to Scale

- Traffic > 1000 requests/min
- Response time > 2 seconds
- CPU usage > 80%

### Scaling Strategies

1. **Database Caching**

   - Redis for session/cache

2. **CDN**

   - CloudFlare, AWS CloudFront
   - Cache static assets
   - Global distribution

3. **Load Balancing**

   - Multiple application instances
   - Behind load balancer (nginx, HAProxy)

4. **Horizontal Scaling**
   - Docker orchestration (Kubernetes)
   - Auto-scaling groups
   - Multi-region deployment

---

## Rollback Procedures

### Vercel

```
Deployments tab → Select previous version → Promote to Production
```

### Netlify

```
Deploys tab → Right-click previous deploy → Publish deploy
```

### Docker/Server

```bash
git revert <commit-hash>
npm run build
pm2 reload nextapp
```

### GitHub

```bash
git tag v1.0.0
git push origin v1.0.0
# Reference tags for quick rollback
```
