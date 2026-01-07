# NextApp - Production-Ready Next.js Application

A comprehensive example of a modern, production-ready Next.js application with UI development, comprehensive testing, automated CI/CD, and multiple deployment options.

## ✨ Features

- **Modern UI** - Built with Next.js 16, React 19, and Tailwind CSS 4
- **Responsive Design** - Mobile-first approach with Navbar, Footer, and Hero sections
- **Comprehensive Testing** - Full UI test coverage with Playwright (30+ test cases)
- **CI/CD Pipeline** - GitHub Actions workflow for lint, test, build, and deployment
- **Multiple Deployments** - Vercel, Netlify, Docker, or traditional Node.js hosting
- **TypeScript** - Full type safety throughout the codebase
- **Production Best Practices** - Environment variables, security headers, optimization

## 📁 Project Structure

```
next-deploy-testing/
├── .github/
│   └── workflows/
│       └── ci-cd.yml              # GitHub Actions CI/CD pipeline
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout with Navbar & Footer
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles
│   │   └── about/
│   │       └── page.tsx           # About page
│   └── components/
│       ├── Navbar.tsx             # Navigation component
│       └── Footer.tsx             # Footer component
├── e2e/
│   └── home.spec.ts               # Playwright UI tests
├── public/                         # Static assets
├── .env.example                    # Environment variables template
├── Dockerfile                      # Docker build configuration
├── docker-compose.yml              # Docker Compose configuration
├── nginx.conf                      # Nginx reverse proxy config
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ (download from [nodejs.org](https://nodejs.org))
- npm 10+ (included with Node.js)

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd next-deploy-testing
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local as needed
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

### Development

```bash
npm run dev          # Start development server with hot reload
npm run build        # Build optimized production version
npm start            # Run production build locally
```

### Testing

```bash
npm test             # Run all Playwright tests
npm run test:ui      # Run tests with Playwright UI
npm run test:debug   # Run tests in debug mode
```

### Linting

```bash
npm run lint         # Check code for linting issues
npm run lint:fix     # Automatically fix linting issues
```

## 🧪 Testing

This project uses **Playwright** for comprehensive UI testing.

### Test Coverage

- ✅ Page load and content visibility
- ✅ Navigation between pages
- ✅ Button clicks and interactions
- ✅ Mobile responsiveness
- ✅ Accessibility features
- ✅ Form interactions
- ✅ Keyboard navigation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run specific test file
npx playwright test e2e/home.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium

# Debug tests
npm run test:debug
```

### Test Reports

After running tests, view the HTML report:

```bash
npx playwright show-report
```

## 🔧 Configuration Files

### `playwright.config.ts`

Playwright configuration with:

- Multiple browser support (Chrome, Firefox, Safari)
- Mobile device testing (iPhone, Android)
- Auto-retry on failure (CI only)
- HTML report generation

### `next.config.ts`

Next.js configuration for performance optimization.

### `.env.example`

Template for environment variables. Copy to `.env.local` for local development.

## 🚢 Deployment

### Option 1: Vercel (Recommended)

1. **Connect to Vercel**

   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard**

   - Go to Settings > Environment Variables
   - Add required variables from `.env.example`

3. **Deploy**
   ```bash
   vercel --prod
   ```

**Auto-deployment**: Push to `main` branch triggers automatic deployment.

### Option 2: Netlify

1. **Connect to Netlify**

   - Push repository to GitHub
   - Visit [netlify.com](https://netlify.com)
   - Connect your repository
   - Set Build Settings:
     - Build command: `npm run build`
     - Publish directory: `.next`

2. **Set environment variables**

   - Build & deploy → Environment variables

3. **Deploy**
   - Netlify auto-deploys on git push

### Option 3: Docker

1. **Build Docker image**

   ```bash
   docker build -t nextapp:latest .
   ```

2. **Run locally**

   ```bash
   docker run -p 3000:3000 -e NODE_ENV=production nextapp:latest
   ```

3. **Using Docker Compose**

   ```bash
   docker-compose up -d
   ```

4. **Deploy to Docker hosting**
   - [Docker Hub](https://hub.docker.com) - Push and manage images
   - [AWS ECS](https://aws.amazon.com/ecs/) - Container orchestration
   - [Google Cloud Run](https://cloud.google.com/run) - Serverless containers
   - [Azure Container Instances](https://azure.microsoft.com/en-us/products/container-instances/) - Azure container hosting

### Option 4: Traditional Node.js Hosting

1. **Build the app**

   ```bash
   npm run build
   ```

2. **Upload to server**

   ```bash
   scp -r . user@server:/app
   ssh user@server
   cd /app && npm install --omit=dev
   npm start
   ```

3. **Use process manager (PM2)**

   ```bash
   npm install -g pm2
   pm2 start npm --name "nextapp" -- start
   pm2 startup
   pm2 save
   ```

4. **Nginx reverse proxy** (see `nginx.conf`)
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/nextapp
   sudo ln -s /etc/nginx/sites-available/nextapp /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

### Option 5: AWS/GCP/Azure

Each platform has Next.js specific deployment guides:

- **AWS**: [AWS Amplify](https://aws.amazon.com/amplify/) or [AWS App Runner](https://aws.amazon.com/apprunner/)
- **GCP**: [Cloud Run](https://cloud.google.com/run) or [App Engine](https://cloud.google.com/appengine)
- **Azure**: [App Service](https://azure.microsoft.com/en-us/services/app-service/)

## 🔄 CI/CD Pipeline

GitHub Actions workflow automatically:

1. **Lints** code with ESLint
2. **Tests** UI with Playwright (30+ test cases)
3. **Builds** Next.js application
4. **Deploys** to Vercel or Netlify on main branch

### Setup CI/CD

1. **Add GitHub Secrets**

   - For Vercel:

     - `VERCEL_TOKEN` - [Get token](https://vercel.com/account/tokens)
     - `VERCEL_ORG_ID` - From Vercel dashboard
     - `VERCEL_PROJECT_ID` - From Vercel dashboard

   - For Netlify:
     - `NETLIFY_AUTH_TOKEN` - [Get token](https://app.netlify.com/account/applications)
     - `NETLIFY_SITE_ID` - From Netlify dashboard

2. **Trigger pipeline**

   - Push to `main` or `develop` branch
   - Pipeline runs automatically

3. **Monitor progress**
   - Go to Actions tab in GitHub
   - View test reports and logs

## 🛠️ Tech Stack

| Category       | Technology   | Version |
| -------------- | ------------ | ------- |
| **Framework**  | Next.js      | 16.1.1  |
| **UI Library** | React        | 19.2.3  |
| **Styling**    | Tailwind CSS | 4       |
| **Language**   | TypeScript   | 5       |
| **Testing**    | Playwright   | 1.48    |
| **Linting**    | ESLint       | 9       |
| **Node**       | Node.js      | 20+     |

## 📊 Performance

Built-in optimizations:

- Image optimization with Next.js
- Automatic code splitting
- CSS purging with Tailwind
- Font optimization
- Gzip compression in Nginx
- Browser caching headers

Check performance:

```bash
npm run build
# Analyze bundle size
npx next-bundle-analyzer
```

## 🔐 Security

Best practices implemented:

- ✅ Content Security Policy headers
- ✅ X-Frame-Options for clickjacking protection
- ✅ X-Content-Type-Options for MIME type protection
- ✅ Input validation in components
- ✅ Environment variables for sensitive data
- ✅ No hardcoded secrets in code

## 📱 Browser Support

- ✅ Chrome/Edge (latest 2 versions)
- ✅ Firefox (latest 2 versions)
- ✅ Safari (latest 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests: `npm test`
4. Run lint: `npm run lint:fix`
5. Create a Pull Request

## 📄 License

MIT License - feel free to use in personal or commercial projects.

## 🆘 Troubleshooting

### Tests fail locally but pass in CI

- Clear `.next` cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Ensure dev server is running: `npm run dev`

### Port 3000 already in use

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Docker build fails

- Update Docker: `docker --version` should be latest
- Clear cache: `docker system prune -a`
- Rebuild: `docker build --no-cache -t nextapp .`

### Deployment fails

- Check environment variables are set correctly
- Review build logs in CI/CD platform
- Verify Node version matches (use 20+)

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Playwright Documentation](https://playwright.dev)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 🎯 Next Steps

After deployment:

1. Set up monitoring/logging (Sentry, LogRocket)
2. Add analytics (Google Analytics, Mixpanel)
3. Implement error tracking
4. Set up automated backups
5. Monitor performance metrics
6. Plan scaling strategy
