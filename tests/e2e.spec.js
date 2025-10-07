const { test, expect } = require("@playwright/test");
const { HomePage } = require("../page-objects/HomePage");
const { LoginPage } = require("../page-objects/LoginPage");
const { RegisterPage } = require("../page-objects/RegisterPage");
const { TestUtils } = require("../utils/TestUtils");

test.describe("End-to-End Tests", () => {
  test("complete user journey - register, login and navigate", async ({
    page,
  }) => {
    // 1. Navegar para a página inicial
    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.verifyPageLoaded();
    await TestUtils.takeScreenshot(page, "home-page-loaded");

    // 2. Ir para página de registro
    await homePage.clickRegister();

    const registerPage = new RegisterPage(page);
    await registerPage.verifyPageLoaded();

    // 3. Registrar novo usuário
    const userData = TestUtils.generateUserData();
    await registerPage.register(userData);
    await registerPage.verifyRegistrationSuccess();
    await TestUtils.takeScreenshot(page, "user-registered");

    console.log("Usuário registrado:", userData.email);

    // 4. Fazer login com o usuário criado
    await registerPage.clickLoginLink();

    const loginPage = new LoginPage(page);
    await loginPage.verifyPageLoaded();
    await loginPage.login(userData.email, userData.password);
    await loginPage.verifyLoginSuccess();
    await TestUtils.takeScreenshot(page, "user-logged-in");

    // 5. Navegar de volta para home e fazer uma busca
    await page.goto("https://practicesoftwaretesting.com/");
    await homePage.searchProduct("drill");

    const productCount = await homePage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    await TestUtils.takeScreenshot(page, "search-completed");

    console.log(`Encontrados ${productCount} produtos na busca`);
  });

  test("test with default credentials and utilities", async ({ page }) => {
    // Usar credenciais padrão
    const credentials = TestUtils.getDefaultLoginCredentials();

    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(credentials.email, credentials.password);
    await loginPage.verifyLoginSuccess();

    // Aguardar carregamento completo
    await TestUtils.waitForPageLoad(page);
    await TestUtils.takeScreenshot(page, "default-login-success");
  });

  test("test form validation with utilities", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();

    // Preencher apenas alguns campos para testar validação
    await TestUtils.typeSlowly(page, '[data-test="first-name"]', "Test", 50);
    await TestUtils.typeSlowly(
      page,
      '[data-test="email"]',
      "invalid-email",
      50
    );

    await registerPage.clickRegisterButton();

    // Verificar se aparecem erros de validação
    const isEmailErrorVisible = await TestUtils.isElementVisible(
      page,
      '[data-test="email-error"]'
    );
    expect(isEmailErrorVisible).toBeTruthy();

    await TestUtils.takeScreenshot(page, "validation-errors");
  });

  test("test mobile responsive design", async ({ page }) => {
    // Simular dispositivo móvel
    await page.setViewportSize({ width: 375, height: 667 });

    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.verifyPageLoaded();

    await TestUtils.takeScreenshot(page, "mobile-home-page");

    // Testar navegação mobile
    await homePage.clickLogin();
    await TestUtils.takeScreenshot(page, "mobile-login-page");
  });

  test("test with random data generation", async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigate();

    // Gerar dados aleatórios
    const randomFirstName = TestUtils.generateRandomString(8);
    const randomLastName = TestUtils.generateRandomString(10);
    const uniqueEmail = TestUtils.generateUniqueEmail();
    const phoneNumber = TestUtils.generatePhoneNumber();

    await registerPage.fillPersonalInfo(
      randomFirstName,
      randomLastName,
      "1995-05-15"
    );
    await registerPage.fillContactInfo(phoneNumber, uniqueEmail);
    await registerPage.fillPassword("RandomPass123!");

    console.log("Dados gerados:", {
      firstName: randomFirstName,
      lastName: randomLastName,
      email: uniqueEmail,
      phone: phoneNumber,
    });

    await TestUtils.takeScreenshot(page, "random-data-filled");
  });
});
