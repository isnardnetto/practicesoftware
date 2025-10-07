/**
 * Utilitários para testes Playwright
 */

class TestUtils {
  /**
   * Gera um email único para testes
   * @returns {string} Email único
   */
  static generateUniqueEmail() {
    const timestamp = Date.now();
    return `testuser${timestamp}@example.com`;
  }

  /**
   * Gera um telefone aleatório
   * @returns {string} Número de telefone
   */
  static generatePhoneNumber() {
    const areaCode = Math.floor(Math.random() * 900) + 100;
    const firstPart = Math.floor(Math.random() * 900) + 100;
    const secondPart = Math.floor(Math.random() * 9000) + 1000;
    return `+1${areaCode}${firstPart}${secondPart}`;
  }

  /**
   * Gera dados de usuário para registro
   * @returns {object} Dados do usuário
   */
  static generateUserData() {
    const timestamp = Date.now();
    return {
      firstName: "Test",
      lastName: "User",
      dob: "1990-01-01",
      address: `${Math.floor(Math.random() * 9999)} Test Street`,
      postcode: String(Math.floor(Math.random() * 90000) + 10000),
      city: "Test City",
      state: "Test State",
      country: "US",
      phone: this.generatePhoneNumber(),
      email: this.generateUniqueEmail(),
      password: "TestPassword123!",
    };
  }

  /**
   * Espera por um elemento estar visível
   * @param {import('@playwright/test').Page} page - Página do Playwright
   * @param {string} selector - Seletor do elemento
   * @param {number} timeout - Timeout em ms (padrão: 30000)
   */
  static async waitForElement(page, selector, timeout = 30000) {
    await page.waitForSelector(selector, { state: "visible", timeout });
  }

  /**
   * Captura screenshot com timestamp
   * @param {import('@playwright/test').Page} page - Página do Playwright
   * @param {string} name - Nome do arquivo
   * @param {string} folder - Pasta de destino (padrão: 'screenshots')
   */
  static async takeScreenshot(page, name, folder = "screenshots") {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `${folder}/${name}-${timestamp}.png`;
    await page.screenshot({ path: filename, fullPage: true });
    return filename;
  }

  /**
   * Aguarda o carregamento completo da página
   * @param {import('@playwright/test').Page} page - Página do Playwright
   */
  static async waitForPageLoad(page) {
    await page.waitForLoadState("networkidle");
    await page.waitForLoadState("domcontentloaded");
  }

  /**
   * Scroll suave até um elemento
   * @param {import('@playwright/test').Page} page - Página do Playwright
   * @param {string} selector - Seletor do elemento
   */
  static async scrollToElement(page, selector) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); // Aguarda o scroll completar
  }

  /**
   * Gera uma string aleatória
   * @param {number} length - Tamanho da string
   * @returns {string} String aleatória
   */
  static generateRandomString(length = 10) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Aguarda um tempo específico
   * @param {number} ms - Tempo em milissegundos
   */
  static async sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Verifica se um elemento está visível na página
   * @param {import('@playwright/test').Page} page - Página do Playwright
   * @param {string} selector - Seletor do elemento
   * @returns {boolean} True se visível
   */
  static async isElementVisible(page, selector) {
    try {
      await page.waitForSelector(selector, { state: "visible", timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Preenche um campo de forma humanizada (com delay)
   * @param {import('@playwright/test').Page} page - Página do Playwright
   * @param {string} selector - Seletor do campo
   * @param {string} text - Texto a ser digitado
   * @param {number} delay - Delay entre caracteres (padrão: 100ms)
   */
  static async typeSlowly(page, selector, text, delay = 100) {
    await page.locator(selector).clear();
    await page.locator(selector).type(text, { delay });
  }

  /**
   * Obtém dados de teste padrão para login
   * @returns {object} Credenciais de login
   */
  static getDefaultLoginCredentials() {
    return {
      email: "customer@practicesoftwaretesting.com",
      password: "welcome01",
    };
  }

  /**
   * Formata data para o padrão brasileiro
   * @param {Date} date - Data a ser formatada
   * @returns {string} Data formatada (DD/MM/YYYY)
   */
  static formatDateBR(date = new Date()) {
    return date.toLocaleDateString("pt-BR");
  }

  /**
   * Formata data para input HTML
   * @param {Date} date - Data a ser formatada
   * @returns {string} Data formatada (YYYY-MM-DD)
   */
  static formatDateForInput(date = new Date()) {
    return date.toISOString().split("T")[0];
  }

  /**
   * Gera um CPF válido para testes (apenas formato)
   * @returns {string} CPF formatado
   */
  static generateCPF() {
    const n1 = Math.floor(Math.random() * 900) + 100;
    const n2 = Math.floor(Math.random() * 900) + 100;
    const n3 = Math.floor(Math.random() * 900) + 100;
    const n4 = Math.floor(Math.random() * 90) + 10;
    return `${n1}.${n2}.${n3}-${n4}`;
  }
}

module.exports = { TestUtils };
