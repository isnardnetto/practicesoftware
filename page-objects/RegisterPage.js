export class RegisterPage {
  constructor(page) {
    this.page = page;
  }

  async registerData(
    name,
    secundName,
    fillDate,
    streetTest,
    postalCode,
    testCity,
    testState,
    testePhone,
    testEmail,
    testePassword
  ) {
    const firstName = '[data-test="first-name"]';
    await this.page.locator(firstName).fill(name);
    const lastName = '[data-test="last-name"]';
    await this.page.locator(lastName).fill(secundName);
    const date = '[data-test="dob"]';
    await this.page.locator(date).fill(fillDate);
    const street = '[data-test="street"]';
    await this.page.locator(street).fill(streetTest);
    const code = '[data-test="postal_code"]';
    await this.page.locator(code).fill(postalCode);
    const city = '[data-test="city"]';
    await this.page.locator(city).fill(testCity);
    const state = '[data-test="state"]';
    await this.page.locator(state).fill(testState);
    const country = '[data-test="country"]';
    await this.page.locator(country).selectOption("BR");
    const phone = '[data-test="phone"]';
    await this.page.locator(phone).fill(testePhone);
    const email = '[data-test="email"]';
    await this.page.locator(email).fill(testEmail);
    const password = '[data-test="password"]';
    await this.page.locator(password).fill(testePassword);
  }

  async registerButton() {
    const button = '[data-test="register-submit"]';
    await this.page.locator(button).click();
  }
}
