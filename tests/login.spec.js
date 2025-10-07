const { test, expect } = require("@playwright/test");
const { LoginPage } = require("../page-objects/LoginPage");

test.describe("Login Page Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test("should load login page successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.verifyPageLoaded();
    await loginPage.takeScreenshot("page-loaded");
  });

  test("should login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.loginWithValidCredentials();
    await loginPage.verifyLoginSuccess();
    await loginPage.takeScreenshot("login-success");
  });

  test("should show error with invalid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login("invalid@email.com", "wrongpassword");
    await loginPage.verifyLoginError();
    await loginPage.takeScreenshot("login-error");
  });

  test("should navigate to register page", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.clickRegisterLink();

    // Verifica se foi redirecionado para a página de registro
    await expect(page).toHaveURL(/.*auth\/register/);
  });

  test("should validate required fields", async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Tenta fazer login sem preencher os campos
    await loginPage.clickLoginButton();

    // Verifica se os campos são obrigatórios
    await loginPage.verifyEmailError();
    await loginPage.verifyPasswordError();
    await loginPage.takeScreenshot("validation-errors");
  });

  test("should validate email format", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillEmail("invalid-email");
    await loginPage.fillPassword("somepassword");
    await loginPage.clickLoginButton();

    await loginPage.verifyEmailError();
    await loginPage.takeScreenshot("invalid-email-format");
  });

  test("should clear form fields", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.fillEmail("test@email.com");
    await loginPage.fillPassword("password123");
    await loginPage.clearFields();

    // Verifica se os campos estão vazios
    await expect(loginPage.emailInput).toHaveValue("");
    await expect(loginPage.passwordInput).toHaveValue("");
  });
});
