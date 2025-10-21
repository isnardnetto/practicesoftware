import { test, expect } from "@playwright/test";
import { RegisterPage } from "../page-objects/RegisterPage.js";

test.describe("Register Page Tests", () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await page.goto("https://practicesoftwaretesting.com/auth/register");
  });

  test("Register user with real data", async ({ page }) => {
    const timestamp = Date.now();

    const userData = {
      name: "João",
      secundName: "Silva",
      fillDate: "1990-05-15",
      streetTest: "Rua das Flores, 123",
      postalCode: "12345-678",
      testCity: "São Paulo",
      testState: "SP",
      testePhone: "11999999999",
      testEmail: `joao.silva${timestamp}@email.com`,
      testePassword: `MinhaSenh${timestamp}@123`,
    };
    await registerPage.registerData(
      userData.name,
      userData.secundName,
      userData.fillDate,
      userData.streetTest,
      userData.postalCode,
      userData.testCity,
      userData.testState,
      userData.testePhone,
      userData.testEmail,
      userData.testePassword
    );

    await registerPage.registerButton();

    await expect(page).toHaveURL(
      "https://practicesoftwaretesting.com/auth/login"
    );
  });
});
