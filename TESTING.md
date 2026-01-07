# Testing Guide

## Overview

This project uses **Playwright** for comprehensive end-to-end (E2E) UI testing. Tests cover page navigation, user interactions, responsiveness, and accessibility.

## Setup

### Installation

```bash
npm install --save-dev @playwright/test
```

### Configuration

See `playwright.config.ts` for:

- Multiple browsers (Chrome, Firefox, Safari)
- Mobile devices (iPhone, Android)
- Automatic retry on CI
- HTML report generation

## Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run with UI (interactive mode)
npm run test:ui

# Debug tests
npm run test:debug

# Run specific test file
npx playwright test e2e/home.spec.ts

# Run specific test by name
npx playwright test -g "should load home page"

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Advanced Options

```bash
# Run tests in headed mode (see browser)
npx playwright test --headed

# Run tests in parallel/serial
npx playwright test --workers=4        # Parallel
npx playwright test --workers=1        # Serial

# Update snapshots
npx playwright test --update-snapshots

# Show test report
npx playwright show-report

# Trace tests for debugging
npx playwright test --trace on

# Record video of failed tests
npx playwright test --video on
```

## Test Structure

### Example Test

```typescript
import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load home page successfully", async ({ page }) => {
    // Navigate to page
    await page.goto("/");

    // Wait for element
    await page.waitForLoadState("networkidle");

    // Check title
    await expect(page).toHaveTitle(/NextApp/);

    // Check visibility
    const heading = page.getByTestId("hero-title");
    await expect(heading).toBeVisible();
  });
});
```

### Key Concepts

**Locators** - Find elements in DOM

```typescript
// By test ID (recommended)
page.getByTestId("hero-title");

// By text
page.getByText("Welcome");

// By role
page.getByRole("button", { name: "Submit" });

// By label
page.getByLabel("Username");

// CSS selector
page.locator("button.primary");
```

**Actions** - Interact with page

```typescript
// Navigation
await page.goto("/about");

// Click
await button.click();

// Type
await input.fill("text");
await input.type("text", { delay: 100 });

// Select
await select.selectOption("value");

// Scroll
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
```

**Assertions** - Verify behavior

```typescript
// Visibility
await expect(element).toBeVisible();
await expect(element).toBeHidden();

// Content
await expect(element).toContainText("text");
await expect(element).toHaveText("exact text");

// Attributes
await expect(element).toHaveAttribute("href", "/about");

// Counts
await expect(locator).toHaveCount(3);
```

**Waits** - Handle async operations

```typescript
// Wait for navigation
await page.goto("/");

// Wait for element
await page.waitForSelector("button");

// Wait for specific condition
await expect(element).toBeVisible();

// Wait with timeout
await element.click({ timeout: 5000 });
```

## Test Cases

### Currently Implemented Tests (30+)

#### Home Page Tests

- ✅ Page loads successfully
- ✅ Hero section displays
- ✅ CTA buttons are visible
- ✅ Features section displays
- ✅ Tech stack section visible
- ✅ Mobile responsive layout

#### Navigation Tests

- ✅ Navigate to About page
- ✅ Navigate home via logo
- ✅ Desktop navigation visible
- ✅ Mobile menu toggle

#### Interaction Tests

- ✅ Button clicks work
- ✅ Links are clickable
- ✅ Forms submission
- ✅ Modal opening/closing

#### Accessibility Tests

- ✅ Proper heading hierarchy
- ✅ Keyboard navigation
- ✅ Color contrast
- ✅ ARIA labels present

#### About Page Tests

- ✅ Page loads
- ✅ Content displays
- ✅ Features list visible
- ✅ Tech stack section present

## Writing New Tests

### Template

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto("/");
  });

  test("should perform action", async ({ page }) => {
    // Arrange
    const button = page.getByTestId("button-id");

    // Act
    await button.click();

    // Assert
    await expect(page).toHaveURL("/expected-url");
  });

  test.afterEach(async ({ page }) => {
    // Cleanup after each test
  });
});
```

### Best Practices

1. **Use test IDs**

   ```tsx
   // In React component
   <button data-testid="submit-btn">Submit</button>;

   // In test
   await page.getByTestId("submit-btn").click();
   ```

2. **Test user behavior, not implementation**

   ```typescript
   // Good
   await page.getByRole("button", { name: "Sign in" }).click();

   // Bad
   await page.locator("#login-button-id-12345").click();
   ```

3. **Isolate tests**

   ```typescript
   // Each test should be independent
   // Don't rely on state from previous tests
   test.beforeEach(async ({ page }) => {
     await page.goto("/");
   });
   ```

4. **Use descriptive names**

   ```typescript
   // Good
   test("should display error message when form is invalid");

   // Bad
   test("form test");
   ```

5. **Add explicit waits**

   ```typescript
   // Wait for element
   await page.waitForSelector(".modal");

   // Wait for condition
   await expect(element).toBeVisible({ timeout: 5000 });
   ```

## Debugging Tests

### Debug Mode

```bash
npm run test:debug

# This opens Playwright Inspector showing:
# - Current page
# - DOM tree
# - Console logs
# - Step through tests
```

### Trace Viewer

```bash
# Enable tracing
npx playwright test --trace on

# View trace
npx playwright show-trace trace.zip
```

### Video Recording

```bash
# Enable video for failed tests
npx playwright test --video on

# View videos in report
npx playwright show-report
```

### Console Output

```typescript
// Print to console
console.log("Current URL:", page.url());

// Get page console messages
page.on("console", (msg) => console.log(msg.text()));
```

### Headless Mode Debugging

```bash
# Run with visible browser
npx playwright test --headed

# Slow down execution
npx playwright test --headed --trace=on
```

## CI/CD Integration

### GitHub Actions

The CI pipeline automatically:

1. Installs dependencies
2. Installs Playwright browsers
3. Runs tests
4. Uploads test report as artifact

### View Results

- Go to GitHub repository
- Click "Actions" tab
- Select workflow run
- View test results and artifacts

### Retry Failed Tests

CI configuration retries failed tests (2 retries by default):

```typescript
// playwright.config.ts
retries: process.env.CI ? 2 : 0,
```

## Performance Optimization

### Parallelize Tests

```bash
# Run tests in parallel (default)
npx playwright test --workers=4

# Run serially if needed
npx playwright test --workers=1
```

### Test Timeout

```typescript
// Set global timeout
test.setTimeout(30000);

// Or per test
test(
  "slow test",
  async ({ page }) => {
    // runs with default timeout
  },
  { timeout: 60000 }
);
```

### Network Throttling

```typescript
test("slow network", async ({ page }) => {
  // Simulate slow network
  await page.route("**/*", (route) => {
    setTimeout(() => route.continue(), 1000);
  });

  await page.goto("/");
});
```

## Common Issues

### Issue: Tests timeout in CI

**Solution**: Increase timeout or ensure dev server starts properly

```typescript
// playwright.config.ts
timeout: process.env.CI ? 30000 : 15000,
```

### Issue: Flaky tests (inconsistent failures)

**Solution**: Add explicit waits instead of fixed delays

```typescript
// Bad
await page.waitForTimeout(2000);

// Good
await expect(element).toBeVisible({ timeout: 5000 });
```

### Issue: Tests pass locally but fail in CI

**Solution**: Check environment differences

- Install all Playwright browsers: `npx playwright install --with-deps`
- Use fixed viewport sizes
- Check for timing issues

### Issue: Page doesn't navigate properly

**Solution**: Wait for navigation explicitly

```typescript
// Wait for both redirect and load
await Promise.all([
  page.waitForNavigation(),
  page.getByRole("link", { name: "About" }).click(),
]);

// Or use goto which waits automatically
await page.goto("/about");
```

## Advanced Features

### Visual Regression Testing

```typescript
// Save screenshot as baseline
await expect(page).toHaveScreenshot("home-page.png");

// On next run, compares against baseline
// Fails if visual changes detected
```

### API Testing

```typescript
test("API health check", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
});
```

### Multi-Page Testing

```typescript
test("open multiple pages", async ({ browser }) => {
  const context = await browser.newContext();
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto("/");
  await page2.goto("/about");

  await context.close();
});
```

### Geolocation & Timezone

```typescript
test("test geolocation", async ({ browser }) => {
  const context = await browser.newContext({
    geolocation: { latitude: 37.7749, longitude: -122.4194 },
    locale: "en-US",
    timezoneId: "America/Los_Angeles",
  });
});
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)
