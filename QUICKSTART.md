# Quick Start Guide

Get your production-ready Next.js app running in 5 minutes!

## ⚡ 5-Minute Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Start Development Server (1 min)

```bash
npm run dev
```

→ Open [http://localhost:3000](http://localhost:3000)

### 3. Run Tests (2 min)

```bash
npm test
```

Should see 30+ tests pass ✅

### 4. Build Production (1 min)

```bash
npm run build
npm start
```

## 📖 Available Commands

```bash
# Development
npm run dev          # Start dev server

# Testing
npm test             # Run all tests
npm run test:ui      # Interactive test mode
npm run test:debug   # Debug tests

# Code Quality
npm run lint         # Check code
npm run lint:fix     # Auto-fix issues

# Production
npm run build        # Build for production
npm start            # Run production build
```

## 🗂️ Key Files to Know

| File                        | Purpose                |
| --------------------------- | ---------------------- |
| `src/app/page.tsx`          | Home page (edit here!) |
| `src/app/about/page.tsx`    | About page             |
| `src/components/Navbar.tsx` | Top navigation         |
| `src/components/Footer.tsx` | Bottom section         |
| `e2e/home.spec.ts`          | Tests                  |
| `.env.example`              | Environment template   |

## 🎨 Making Changes

### Update Home Page

Edit `src/app/page.tsx` and save. Changes appear instantly at http://localhost:3000

### Add Navigation Link

1. Edit `src/components/Navbar.tsx`
2. Add new `<Link>` component
3. Test with `npm test`

### Create New Page

1. Create folder: `src/app/newpage/`
2. Create file: `page.tsx`
3. Add content and export component
4. Auto-accessible at `/newpage`

### Add Test Case

1. Edit `e2e/home.spec.ts`
2. Add new test function
3. Run: `npm test` or `npm run test:ui`

## 🚀 Deploy in 30 Seconds

### To Vercel

```bash
npm install -g vercel
vercel --prod
# Follow prompts, done!
```

### To Netlify

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select repository
5. Done! Auto-deploys on push

### To Docker

```bash
docker build -t nextapp .
docker run -p 3000:3000 nextapp
```

## 🔍 Check Everything Works

Run this to verify setup:

```bash
npm run lint       # ✅ No lint errors
npm test           # ✅ All tests pass
npm run build      # ✅ Build succeeds
```

If all pass, you're ready to deploy! 🎉

## 📚 Want to Learn More?

- **Full docs**: See [README_COMPLETE.md](README_COMPLETE.md)
- **Testing guide**: See [TESTING.md](TESTING.md)
- **Deployment options**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **CI/CD setup**: See [CI_CD.md](CI_CD.md)
- **Project details**: See [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

## ⚠️ Common Issues

**Port 3000 already in use?**

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Tests failing?**

```bash
rm -rf node_modules
npm install
npm test
```

**Build issues?**

```bash
rm -rf .next
npm run build
```

## 📞 Need Help?

1. Check docs in this repo
2. Check [Next.js docs](https://nextjs.org/docs)
3. Check [Playwright docs](https://playwright.dev)
4. Check GitHub Actions logs in "Actions" tab

## 🎯 Next: Your First Change

Try this:

1. Open `src/app/page.tsx`
2. Find the "Welcome to NextApp" text
3. Change it to something else
4. Save and watch the browser update!

That's all! You now have a production-ready Next.js app. 🚀
