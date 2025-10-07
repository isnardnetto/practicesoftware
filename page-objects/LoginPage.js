const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    // Seletores da página de login
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-submit"]');
    this.registerLink = page.locator('[data-test="register-link"]');
    this.forgotPasswordLink = page.locator('[data-test="forgot-password"]');
    this.pageTitle = page.locator("h1");
    this.errorMessage = page.locator('[data-test="login-error"]');
    this.successMessage = page.locator('[data-test="login-success"]');

    // Elementos de validação
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');

    // Navegação
    this.homeLink = page.locator('[data-test="nav-home"]');
    this.backButton = page.locator('[data-test="back-button"]');
  }

  async navigate() {
    await this.page.goto("https://practicesoftwaretesting.com/auth/login");
    await this.page.waitForLoadState("networkidle");
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async loginWithValidCredentials() {
    // Credenciais padrão do site de demonstração
    await this.login("customer@practicesoftwaretesting.com", "welcome01");
  }

  async clickRegisterLink() {
    await this.registerLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clickForgotPassword() {
    await this.forgotPasswordLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clearFields() {
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toContainText("Login");
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyLoginSuccess() {
    // Verifica se foi redirecionado para a página inicial após login
    await this.page.waitForURL("**/account");
    await expect(this.page.locator('[data-test="page-title"]')).toContainText(
      "My account"
    );
  }

  async verifyLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async verifyEmailError() {
    await expect(this.emailError).toBeVisible();
  }

  async verifyPasswordError() {
    await expect(this.passwordError).toBeVisible();
  }

  async isLoginButtonEnabled() {
    return await this.loginButton.isEnabled();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `screenshots/login-${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  async waitForLoadingToComplete() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector('[data-test="login-submit"]', {
      state: "visible",
    });
  }
}

module.exports = { LoginPage };
