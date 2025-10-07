const { test, expect } = require("@playwright/test");
const { RegisterPage } = require("../page-objects/RegisterPage");

test.describe("Register Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();
  });

  test("should load register page successfully", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.verifyPageLoaded();
    await registerPage.takeScreenshot("page-loaded");
  });

  test("should register with valid data", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const userData = await registerPage.registerWithValidData();

    await registerPage.verifyRegistrationSuccess();
    await registerPage.takeScreenshot("registration-success");

    console.log("Registered user:", userData.email);
  });

  test("should navigate to login page", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.clickLoginLink();

    // Verifica se foi redirecionado para a página de login
    await expect(page).toHaveURL(/.*auth\/login/);
  });

  test("should validate required fields", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Tenta registrar sem preencher os campos obrigatórios
    await registerPage.clickRegisterButton();

    // Verifica se aparecem erros de validação
    await registerPage.verifyFieldError("firstName");
    await registerPage.verifyFieldError("lastName");
    await registerPage.verifyFieldError("email");
    await registerPage.verifyFieldError("password");

    await registerPage.takeScreenshot("validation-errors");
  });

  test("should validate email format", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.fillPersonalInfo("John", "Doe", "1990-01-01");
    await registerPage.fillContactInfo("+1234567890", "invalid-email-format");
    await registerPage.fillPassword("Password123!");
    await registerPage.clickRegisterButton();

    await registerPage.verifyFieldError("email");
    await registerPage.takeScreenshot("invalid-email");
  });

  test("should validate password strength", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.fillPersonalInfo("John", "Doe", "1990-01-01");
    await registerPage.fillContactInfo("+1234567890", "test@example.com");
    await registerPage.fillPassword("weak"); // Senha fraca
    await registerPage.clickRegisterButton();

    await registerPage.verifyFieldError("password");
    await registerPage.takeScreenshot("weak-password");
  });

  test("should select country from dropdown", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    await registerPage.selectCountry("BR"); // Brasil
    const selectedCountry = await registerPage.getSelectedCountry();
    expect(selectedCountry).toBe("BR");

    await registerPage.takeScreenshot("country-selected");
  });

  test("should clear all form fields", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Preenche todos os campos
    await registerPage.fillPersonalInfo("John", "Doe", "1990-01-01");
    await registerPage.fillAddress(
      "123 Test St",
      "12345",
      "Test City",
      "Test State",
      "US"
    );
    await registerPage.fillContactInfo("+1234567890", "test@example.com");
    await registerPage.fillPassword("Password123!");

    // Limpa todos os campos
    await registerPage.clearAllFields();

    // Verifica se os campos estão vazios
    await expect(registerPage.firstNameInput).toHaveValue("");
    await expect(registerPage.emailInput).toHaveValue("");
    await expect(registerPage.passwordInput).toHaveValue("");
  });

  test("should handle duplicate email registration", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    // Tenta registrar com email que já existe
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
      email: "customer@practicesoftwaretesting.com", // Email já existente
      password: "Password123!",
    };

    await registerPage.register(userData);
    await registerPage.verifyRegistrationError();
    await registerPage.takeScreenshot("duplicate-email-error");
  });
});
