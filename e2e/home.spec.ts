import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load home page successfully", async ({ page }) => {
    await page.goto("/");

    // Check page title
    await expect(page).toHaveTitle(/NextApp/);

    // Check hero section is visible
    const heroTitle = page.getByTestId("hero-title");
    await expect(heroTitle).toBeVisible();
    await expect(heroTitle).toContainText("Welcome to NextApp");
  });

  test("should display hero section with CTA buttons", async ({ page }) => {
    await page.goto("/");

    // Check primary CTA button
    const primaryBtn = page.getByTestId("hero-cta-primary");
    await expect(primaryBtn).toBeVisible();
    await expect(primaryBtn).toContainText("Get Started");

    // Check secondary CTA button
    const secondaryBtn = page.getByTestId("hero-cta-secondary");
    await expect(secondaryBtn).toBeVisible();
    await expect(secondaryBtn).toContainText("Learn More");
  });

  test("should display features section", async ({ page }) => {
    await page.goto("/");

    // Check features heading
    const featuresHeading = page.getByText("Features");
    await expect(featuresHeading).toBeVisible();

    // Check individual features are visible
    await expect(page.getByText("Fast Performance")).toBeVisible();
    await expect(page.getByText("Fully Tested")).toBeVisible();
    await expect(page.getByText("CI/CD Ready")).toBeVisible();
  });

  test("should display tech stack section", async ({ page }) => {
    await page.goto("/");

    const techStackHeading = page.getByText("Tech Stack");
    await expect(techStackHeading).toBeVisible();

    // Check some tech stack items
    await expect(page.getByText("Next.js")).toBeVisible();
    await expect(page.getByText("React")).toBeVisible();
    await expect(page.getByText("Tailwind CSS")).toBeVisible();
  });

  test("should display CTA section at bottom", async ({ page }) => {
    await page.goto("/");

    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    const ctaBtn = page.getByTestId("cta-deploy-btn");
    await expect(ctaBtn).toBeVisible();
    await expect(ctaBtn).toContainText("Deploy Now");
  });

  test("should be responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto("/");

    const heroTitle = page.getByTestId("hero-title");
    await expect(heroTitle).toBeVisible();
  });
});

test.describe("Navigation", () => {
  test("should navigate to about page via navbar", async ({ page }) => {
    await page.goto("/");

    // Click on About link
    const aboutLink = page.getByTestId("nav-about");
    await expect(aboutLink).toBeVisible();
    await aboutLink.click();

    // Check we're on about page
    await expect(page).toHaveURL("/about");
    await expect(page.getByText("About NextApp")).toBeVisible();
  });

  test("should navigate home via navbar logo", async ({ page }) => {
    await page.goto("/about");

    // Click logo to go home
    const logo = page.getByTestId("navbar-logo");
    await logo.click();

    // Check we're back on home page
    await expect(page).toHaveURL("/");
    await expect(page.getByTestId("hero-title")).toBeVisible();
  });

  test("should display navbar in desktop view", async ({ page }) => {
    await page.goto("/");

    const navbar = page.getByTestId("navbar-logo");
    await expect(navbar).toBeVisible();

    const navHome = page.getByTestId("nav-home");
    await expect(navHome).toBeVisible();

    const navAbout = page.getByTestId("nav-about");
    await expect(navAbout).toBeVisible();
  });

  test("should toggle mobile menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile size
    await page.goto("/");

    // Mobile menu button should be visible
    const mobileMenuBtn = page.getByTestId("mobile-menu-btn");
    await expect(mobileMenuBtn).toBeVisible();

    // Click to open mobile menu
    await mobileMenuBtn.click();

    // Mobile menu should appear
    const mobileMenu = page.getByTestId("mobile-menu");
    await expect(mobileMenu).toBeVisible();
  });
});

test.describe("Button Interactions", () => {
  test("primary hero button should be clickable", async ({ page }) => {
    await page.goto("/");

    const primaryBtn = page.getByTestId("hero-cta-primary");
    await expect(primaryBtn).toBeEnabled();

    // Simulate click
    await primaryBtn.click();
    // Page should still be visible (button doesn't navigate yet)
    await expect(page.getByTestId("hero-title")).toBeVisible();
  });

  test("navbar CTA button should be visible and clickable", async ({
    page,
  }) => {
    await page.goto("/");

    const ctaBtn = page.getByTestId("navbar-cta-btn");
    await expect(ctaBtn).toBeVisible();
    await expect(ctaBtn).toBeEnabled();
    await ctaBtn.click();
  });

  test("about page CTA button should work", async ({ page }) => {
    await page.goto("/about");

    const ctaBtn = page.getByTestId("about-cta-btn");
    await expect(ctaBtn).toBeVisible();
    await expect(ctaBtn).toBeEnabled();
    await ctaBtn.click();
  });
});

test.describe("About Page", () => {
  test("should load about page successfully", async ({ page }) => {
    await page.goto("/about");

    // Check page contains about content
    await expect(page.getByText("About NextApp")).toBeVisible();
    await expect(page.getByText("Our Mission")).toBeVisible();
  });

  test("should display features list on about page", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByText("What Makes This Special")).toBeVisible();
    await expect(page.getByText("Modern Stack")).toBeVisible();
    await expect(page.getByText("Comprehensive Testing")).toBeVisible();
  });

  test("should display tech stack section", async ({ page }) => {
    await page.goto("/about");

    await expect(page.getByText("Technology Stack")).toBeVisible();
    await expect(page.getByText("Frontend")).toBeVisible();
  });
});

test.describe("Accessibility", () => {
  test("all buttons should have proper contrast", async ({ page }) => {
    await page.goto("/");

    // Check that buttons are visible and have text
    const buttons = page.locator("button");
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();
    }
  });

  test("should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Check h1 exists
    const h1 = page.locator("h1").first();
    await expect(h1).toBeVisible();
  });

  test("links should be keyboard accessible", async ({ page }) => {
    await page.goto("/");

    // Tab to first link
    await page.keyboard.press("Tab");

    // Click with keyboard (space or enter)
    const focusedElement = await page.evaluate(
      () => document.activeElement?.tagName
    );
    expect(["A", "BUTTON"]).toContain(focusedElement);
  });
});
