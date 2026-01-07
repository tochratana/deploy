# CI/CD Pipeline Guide

Complete guide for setting up and managing the GitHub Actions CI/CD pipeline.

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Push/PR Event                      │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   ┌─────────┐    ┌───────────┐   ┌────────────┐
   │  Lint   │    │   Tests   │   │   Build    │
   │ (ESLint)│    │(Playwright)   │ (Next.js)  │
   └────┬────┘    └─────┬─────┘   └─────┬──────┘
        │                │               │
        └────────────────┼───────────────┘
                         │
                    (All Pass?)
                    /        \
                 YES          NO
                /              \
        ┌──────▼────────┐    ┌──▼──────────────┐
        │  Build Job    │    │  Mark Failed    │
        └────┬─────────┘    └─────────────────┘
             │
        (Main branch?)
        /              \
      YES              NO
     /                  \
┌───▼─────────┐  ┌──────▼──────────┐
│ Deploy to   │  │ Skip Deploy     │
│ Vercel      │  │ (Preview only)  │
│ + Netlify   │  └─────────────────┘
└─────────────┘
```

## Workflow File: `.github/workflows/ci-cd.yml`

### Job: `lint`

- **Runs on**: Ubuntu latest
- **Triggers on**: Push to main/develop, Pull requests
- **Steps**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies
  4. Run ESLint

### Job: `test`

- **Runs on**: Ubuntu latest
- **Depends on**: None (runs in parallel with lint)
- **Steps**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies
  4. Install Playwright browsers
  5. Run Playwright tests (30+ test cases)
  6. Upload test report

### Job: `build`

- **Runs on**: Ubuntu latest
- **Depends on**: lint, test
- **Steps**:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies
  4. Build Next.js app
  5. Upload build artifacts

### Job: `deploy-vercel`

- **Runs on**: Ubuntu latest
- **Depends on**: build
- **Triggers**: Only on push to main (not PR)
- **Steps**:
  1. Deploy to Vercel production
  2. Returns production URL

### Job: `deploy-netlify`

- **Runs on**: Ubuntu latest
- **Depends on**: build
- **Triggers**: Only on push to main (not PR)
- **Steps**:
  1. Build production artifacts
  2. Deploy to Netlify
  3. Returns deployment URL

## Setup Instructions

### Step 1: Enable GitHub Actions

Repository settings should allow Actions (usually enabled by default):

- Go to repository Settings
- Click "Actions" in sidebar
- Select "Allow all actions and reusable workflows"

### Step 2: Add GitHub Secrets

Required for deployment. **Never commit secrets!**

#### For Vercel Deployment

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

**`VERCEL_TOKEN`** (Personal access token)

- Visit [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Create new token
- Copy and paste value

**`VERCEL_ORG_ID`** (Organization ID)

- Go to [vercel.com/account/settings](https://vercel.com/account/settings)
- Copy ORG ID under account name

**`VERCEL_PROJECT_ID`** (Project ID)

- Go to Vercel dashboard
- Select project
- Go to Settings → General
- Copy PROJECT ID

#### For Netlify Deployment

1. Go to Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:

**`NETLIFY_AUTH_TOKEN`** (Personal access token)

- Go to [netlify.com/user/applications](https://app.netlify.com/user/applications)
- Click "New access token"
- Copy token value

**`NETLIFY_SITE_ID`** (Site ID)

- Go to Netlify dashboard
- Select site
- Settings → General → Site ID
- Copy the ID

### Step 3: Configure Workflow

File is already configured at `.github/workflows/ci-cd.yml`

To enable specific deployment:

- Uncomment `deploy-vercel` or `deploy-netlify` section
- Ensure secrets are set
- Push to main branch

### Step 4: Trigger Workflow

Pipeline runs automatically on:

```bash
# Trigger all workflows
git push origin main       # Triggers lint, test, build, deploy
git push origin develop    # Triggers lint, test, build only

# Create pull request
git push origin feature-branch
# Then create PR on GitHub (triggers lint, test, build only)
```

## Monitoring Pipeline

### View Running Workflows

1. Go to repository
2. Click "Actions" tab
3. See list of workflow runs
4. Click on a run to view details

### View Test Results

1. Click on workflow run
2. Click "test" job
3. Scroll down to see test output
4. Click "Upload Playwright report" artifact
5. Download and extract to view HTML report

### View Build Logs

1. Click on workflow run
2. Click "build" job
3. Expand build output to see details
4. Check for errors or warnings

### View Deployment Status

1. Click "deploy-vercel" or "deploy-netlify" job
2. See deployment URL
3. Click link to view live deployment

## Customizing Pipeline

### Change Node Version

Edit `.github/workflows/ci-cd.yml`:

```yaml
env:
  NODE_VERSION: "20" # Change to '18', '21', etc.
```

### Add More Tests

```yaml
- name: Run Integration Tests
  run: npm run test:integration
```

### Add Deployment Step

```yaml
- name: Deploy to Custom Server
  run: |
    scp -r .next user@server:/app
    ssh user@server 'cd /app && npm install && pm2 reload app'
```

### Conditional Steps

```yaml
- name: Deploy to staging
  if: github.ref == 'refs/heads/develop'
  run: npm run deploy:staging

- name: Deploy to production
  if: github.ref == 'refs/heads/main'
  run: npm run deploy:production
```

## Troubleshooting

### Issue: Tests fail in CI but pass locally

**Solution 1**: Install all Playwright dependencies

```bash
npx playwright install --with-deps
git add .
git commit -m "Add Playwright cache"
git push origin main
```

**Solution 2**: Increase timeout

```typescript
// playwright.config.ts
timeout: 30000,  // Increase from 15000
```

**Solution 3**: Check for timing issues

```typescript
// Use explicit waits, not fixed delays
await expect(element).toBeVisible({ timeout: 5000 });
// Instead of: await page.waitForTimeout(2000);
```

### Issue: Deployment fails with "token not found"

**Solution**: Check GitHub Secrets are set

1. Go to Settings → Secrets and variables → Actions
2. Verify all required secrets exist
3. Check secret names match workflow file exactly

### Issue: Build fails with "module not found"

**Solution**: Missing dependencies

```bash
npm install  # Add missing package
npm run build  # Test locally
git add .
git commit -m "Add missing dependencies"
git push origin main
```

### Issue: Lint warnings fail build

**Solution**: Fix linting issues

```bash
npm run lint:fix
git add .
git commit -m "Fix linting issues"
git push origin main
```

## Performance Optimization

### Caching Dependencies

Already configured in workflow:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: ${{ env.NODE_VERSION }}
    cache: "npm" # Caches node_modules
```

### Parallel Jobs

Jobs run in parallel when possible:

- lint, test, and build can run simultaneously
- Deploy jobs run after build completes

### Skip CI for Documentation

```bash
git commit -m "Update docs [skip ci]"
git push origin main
# This skips the entire pipeline
```

## Cost Considerations

### GitHub Actions Usage

- **Free**: 2,000 minutes/month for private repos
- **Usage**: Each job uses 1 minute of time
- **Example**:
  - Lint: 1 min
  - Test: 3 mins
  - Build: 2 mins
  - Total per run: 6 mins × 30 runs = 180 mins/month ✅

### Deployment Costs

- **Vercel**: Free tier includes generous limits
- **Netlify**: Free tier sufficient for most projects
- **Docker**: Pay for hosting infrastructure

## Best Practices

1. **Keep workflow simple** - Only essential checks
2. **Use caching** - Already configured for npm
3. **Fail fast** - Lint first, before expensive tests
4. **Parallel jobs** - Run independent jobs simultaneously
5. **Clear naming** - Use descriptive job names
6. **Security** - Use GitHub Secrets, never commit credentials
7. **Monitor runs** - Check Actions tab regularly
8. **Keep updated** - Update action versions periodically

## Advanced Features

### Scheduled Runs

Run tests on schedule (e.g., nightly):

```yaml
on:
  schedule:
    - cron: "0 2 * * *" # 2 AM daily
```

### Manual Trigger

```yaml
on:
  workflow_dispatch: # Adds "Run workflow" button
```

### Multiple Environments

```yaml
strategy:
  matrix:
    node-version: [18, 19, 20]
    os: [ubuntu-latest, macos-latest]
```

### Slack Notifications

```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

## Security Best Practices

1. **Never log secrets**

   ```yaml
   - run: echo ${{ secrets.VERCEL_TOKEN }} # DON'T DO THIS
   ```

2. **Use environment variables**

   ```yaml
   env:
     NODE_ENV: production
   ```

3. **Limit secret access**

   - Only add secrets needed for that step
   - Use GITHUB_TOKEN for repository operations

4. **Regular rotation**
   - Rotate tokens periodically
   - Update secrets if compromised

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)
- [Security Hardening](https://docs.github.com/en/actions/security-guides)
- [Marketplace Actions](https://github.com/marketplace?type=actions)
