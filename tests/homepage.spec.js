const { test, expect } = require("@playwright/test");
const { HomePage } = require("../page-objects/HomePage");

test.describe("Home Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigate();
  });

  test("should load home page successfully", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.verifyPageLoaded();
    await homePage.takeScreenshot("page-loaded");
  });

  test("should search for products", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.searchProduct("hammer");

    // Verifica se produtos foram encontrados
    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

    await homePage.takeScreenshot("search-results");
  });

  test("should navigate to login page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickLogin();

    // Verifica se foi redirecionado para a página de login
    await expect(page).toHaveURL(/.*auth\/login/);
  });

  test("should navigate to register page", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickRegister();

    // Verifica se foi redirecionado para a página de registro
    await expect(page).toHaveURL(/.*auth\/register/);
  });

  test("should display products on home page", async ({ page }) => {
    const homePage = new HomePage(page);
    const productCount = await homePage.getProductCount();

    expect(productCount).toBeGreaterThan(0);
    console.log(`Found ${productCount} products on the home page`);
  });

  test("should sort products", async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.sortProducts("Name (A - Z)");

    await page.waitForTimeout(2000); // Aguarda a ordenação
    await homePage.takeScreenshot("sorted-products");
  });
});
