const { expect } = require("@playwright/test");

class RegisterPage {
  constructor(page) {
    this.page = page;

    // Seletores da página de registro
    this.firstNameInput = page.locator('[data-test="first-name"]');
    this.lastNameInput = page.locator('[data-test="last-name"]');
    this.dobInput = page.locator('[data-test="dob"]');
    this.addressInput = page.locator('[data-test="address"]');
    this.postcodeInput = page.locator('[data-test="postcode"]');
    this.cityInput = page.locator('[data-test="city"]');
    this.stateInput = page.locator('[data-test="state"]');
    this.countrySelect = page.locator('[data-test="country"]');
    this.phoneInput = page.locator('[data-test="phone"]');
    this.emailInput = page.locator('[data-test="email"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.registerButton = page.locator('[data-test="register-submit"]');
    this.loginLink = page.locator('[data-test="login-link"]');
    this.pageTitle = page.locator("h1");

    // Mensagens de erro e sucesso
    this.errorMessage = page.locator('[data-test="register-error"]');
    this.successMessage = page.locator('[data-test="register-success"]');

    // Erros de validação específicos
    this.firstNameError = page.locator('[data-test="first-name-error"]');
    this.lastNameError = page.locator('[data-test="last-name-error"]');
    this.emailError = page.locator('[data-test="email-error"]');
    this.passwordError = page.locator('[data-test="password-error"]');
    this.dobError = page.locator('[data-test="dob-error"]');
    this.addressError = page.locator('[data-test="address-error"]');
    this.postcodeError = page.locator('[data-test="postcode-error"]');
    this.cityError = page.locator('[data-test="city-error"]');
    this.stateError = page.locator('[data-test="state-error"]');
    this.countryError = page.locator('[data-test="country-error"]');
    this.phoneError = page.locator('[data-test="phone-error"]');
  }

  async navigate() {
    await this.page.goto("https://practicesoftwaretesting.com/auth/register");
    await this.page.waitForLoadState("networkidle");
  }

  async fillPersonalInfo(firstName, lastName, dob) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.dobInput.fill(dob);
  }

  async fillAddress(address, postcode, city, state, country) {
    await this.addressInput.fill(address);
    await this.postcodeInput.fill(postcode);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);
    await this.countrySelect.selectOption(country);
  }

  async fillContactInfo(phone, email) {
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickRegisterButton() {
    await this.registerButton.click();
    await this.page.waitForLoadState("networkidle");
  }

  async register(userData) {
    await this.fillPersonalInfo(
      userData.firstName,
      userData.lastName,
      userData.dob
    );
    await this.fillAddress(
      userData.address,
      userData.postcode,
      userData.city,
      userData.state,
      userData.country
    );
    await this.fillContactInfo(userData.phone, userData.email);
    await this.fillPassword(userData.password);
    await this.clickRegisterButton();
  }

  async registerWithValidData() {
    const timestamp = Date.now();
    const userData = {
      firstName: "Test",
      lastName: "User",
      dob: "1990-01-01",
      address: "123 Test Street",
      postcode: "12345",
      city: "Test City",
      state: "Test State",
      country: "US",
      phone: "+1234567890",
      email: `testuser${timestamp}@example.com`,
      password: "TestPassword123!",
    };

    await this.register(userData);
    return userData;
  }

  async clickLoginLink() {
    await this.loginLink.click();
    await this.page.waitForLoadState("networkidle");
  }

  async clearAllFields() {
    await this.firstNameInput.clear();
    await this.lastNameInput.clear();
    await this.dobInput.clear();
    await this.addressInput.clear();
    await this.postcodeInput.clear();
    await this.cityInput.clear();
    await this.stateInput.clear();
    await this.phoneInput.clear();
    await this.emailInput.clear();
    await this.passwordInput.clear();
  }

  async verifyPageLoaded() {
    await expect(this.pageTitle).toContainText("Customer registration");
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.emailInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.registerButton).toBeVisible();
  }

  async verifyRegistrationSuccess() {
    await expect(this.successMessage).toBeVisible();
  }

  async verifyRegistrationError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  async verifyFieldError(fieldName) {
    const errorSelector = this[`${fieldName}Error`];
    await expect(errorSelector).toBeVisible();
  }

  async isRegisterButtonEnabled() {
    return await this.registerButton.isEnabled();
  }

  async selectCountry(country) {
    await this.countrySelect.selectOption(country);
  }

  async getSelectedCountry() {
    return await this.countrySelect.inputValue();
  }

  async takeScreenshot(name) {
    await this.page.screenshot({
      path: `screenshots/register-${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  async waitForLoadingToComplete() {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForSelector('[data-test="register-submit"]', {
      state: "visible",
    });
  }

  async scrollToElement(element) {
    await element.scrollIntoViewIfNeeded();
  }
}

module.exports = { RegisterPage };
