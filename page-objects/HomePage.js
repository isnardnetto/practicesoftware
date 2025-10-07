const { expect } = require("@playwright/test");

class HomePage {
  constructor(page) {
    this.page = page;

    // Seletores da página inicial
    this.logo = page.locator('[data-test="nav-logo"]');
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.loginLink = page.locator('[data-test="nav-sign-in"]');
    this.registerLink = page.locator('[data-test="nav-register"]');
    this.categoryLinks = page.locator('[data-test="nav-categories"]');
    this.productCards = page.locator('[data-test="product-card"]');
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.contactLink = page.locator('[data-test="nav-contact"]');

    // Filtros e categorias
    this.categoryFilter = page.locator('[data-test="category-filter"]');
    this.brandFilter = page.locator('[data-test="brand-filter"]');
    this.priceRangeFilter = page.locator('[data-test="price-range"]');
    this.sortDropdown = page.locator('[data-test="sort"]');
  }

  async navigate() {
    await this.page.goto("https://practicesoftwaretesting.com/");
    await this.page.waitForLoadState("networkidle");
  }

  async searchProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickLogin() {
    await this.loginLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickRegister() {
    await this.registerLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async selectCategory(categoryName) {
    await this.page.locator(`[data-test="nav-${categoryName}"]`).click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickProduct(productIndex = 0) {
    await this.productCards.nth(productIndex).click();
    await this.page.waitForLoadState("networkidle");
  }

  async applyPriceFilter(minPrice, maxPrice) {
    await this.page.locator('[data-test="price-01"]').fill(minPrice.toString());
    await this.page.locator('[data-test="price-02"]').fill(maxPrice.toString());
  }

  async sortProducts(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyPageLoaded() {
    await expect(this.logo).toBeVisible();
    await expect(this.searchInput).toBeVisible();
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `screenshots/homepage-${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }
}

module.exports = { HomePage };
