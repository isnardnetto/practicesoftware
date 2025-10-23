# Projeto de Automação com Playwright

Este é um projeto de automação de testes para o site [Practice Software Testing](https://practicesoftwaretesting.com/) usando Playwright e JavaScript, focado especificamente em **testes de registro de usuários**.

## 📁 Estrutura do Projeto

```
AutomacaoPW/
├── page-objects/           # Page Objects (Padrão de design)
│   └── RegisterPage.js    # Página de registro
├── tests/                 # Testes automatizados
│   └── register.spec.js   # Testes de registro
├── screenshots/           # Screenshots dos testes
├── test-results/         # Resultados dos testes
├── utils/                # Utilitários e helpers
├── package.json          # Dependências e scripts
├── playwright.config.js  # Configuração do Playwright
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Este arquivo
```

## 🚀 Instalação

1. **Instalar dependências:**

   ```bash
   npm install
   ```

2. **Instalar navegadores do Playwright:**
   ```bash
   npm run install:browsers
   ```

## 📋 Scripts Disponíveis

### Execução de Testes

- `npm test` - Executa todos os testes
- `npm run test:headed` - Executa testes com interface gráfica
- `npm run test:debug` - Executa testes em modo debug
- `npm run test:ui` - Abre a interface do Playwright para testes

### Codegen (Geração de Código)

- `npm run codegen` - Abre o codegen na página de registro
- `npm run codegen:register` - Abre o codegen na página de registro

### Relatórios

- `npm run report` - Abre o relatório HTML dos testes

## 🧪 Executando Testes de Registro

### Executar teste de registro:

```bash
npm test register.spec.js
```

### Executar teste com interface gráfica:

```bash
npx playwright test register.spec.js --headed
```

### Executar teste em modo debug:

```bash
npx playwright test register.spec.js --debug
```

### Executar teste em navegador específico:

```bash
npx playwright test register.spec.js --project=chromium --headed
npx playwright test register.spec.js --project=firefox --headed
npx playwright test register.spec.js --project=webkit --headed
```

## 🌐 Execução Multi-Navegador

Este projeto executa testes em **múltiplos navegadores** automaticamente:

### Navegadores Suportados:

- **Chromium** (Chrome, Edge)
- **Firefox**
- **WebKit** (Safari)

### Comando para executar em todos os navegadores:

```bash
npx playwright test register.spec.js --headed
```

Este comando executará o teste de registro em todos os navegadores configurados, permitindo visualizar o comportamento em cada um deles.

### Executar em navegador específico:

```bash
# Apenas Chrome/Chromium
npx playwright test register.spec.js --project=chromium --headed

# Apenas Firefox
npx playwright test register.spec.js --project=firefox --headed

# Apenas Safari/WebKit
npx playwright test register.spec.js --project=webkit --headed
```

```bash
npm run test:headed
```

### Executar testes em modo debug:

```bash
npm run test:debug
```

## 🔧 Usando o Codegen

O Playwright Codegen gera código automaticamente para a página de registro:

```bash
# Para página de registro
npm run codegen
```

## 📱 Page Object - RegisterPage

O projeto utiliza apenas a **RegisterPage** que contém:

### RegisterPage.js

- **Processo de registro completo**
- **Preenchimento de formulários**
- **Validações de dados**
- **Seleção de país**
- **Geração de dados únicos**

### Exemplo de uso:

```javascript
import { test, expect } from "@playwright/test";
import { RegisterPage } from "../page-objects/RegisterPage.js";

test("Register user with real data", async ({ page }) => {
  const registerPage = new RegisterPage(page);
  await page.goto("https://practicesoftwaretesting.com/auth/register");

  const timestamp = Date.now();

  await registerPage.registerData(
    "João", // Nome
    "Silva", // Sobrenome
    "1990-05-15", // Data nascimento
    "Rua das Flores, 123", // Endereço
    "12345-678", // CEP
    "São Paulo", // Cidade
    "SP", // Estado
    "11999999999", // Telefone
    `joao.silva${timestamp}@email.com`, // Email único
    `MinhaSenh${timestamp}@123` // Senha única
  );

  await registerPage.registerButton();

  // Validação do registro
  await expect(page).toHaveURL(/login/);
});
```

## 🖼️ Screenshots

Os screenshots são automaticamente capturados:

- Durante falhas nos testes
- Salvos na pasta `screenshots/`
- Organizados por navegador

## 📊 Relatórios Multi-Navegador

Os relatórios mostram resultados para todos os navegadores:

- **Relatório HTML** com comparação entre navegadores
- **Traces** individuais por navegador
- **Screenshots** específicos de cada navegador
- **Vídeos** em caso de falha

## ⚙️ Configurações Multi-Navegador

As configurações no `playwright.config.js` incluem:

```javascript
export default {
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
};
```

## 🔍 Debugging Multi-Navegador

Para debug específico por navegador:

```bash
# Debug no Chrome
npx playwright test register.spec.js --project=chromium --debug

# Debug no Firefox
npx playwright test register.spec.js --project=firefox --debug

# Debug no Safari
npx playwright test register.spec.js --project=webkit --debug
```

## 🧪 Teste de Registro

O projeto contém **apenas um teste principal**:

### Funcionalidades testadas:

- ✅ **Preenchimento completo** do formulário de registro
- ✅ **Dados únicos** gerados automaticamente (email e senha)
- ✅ **Validação** de redirecionamento após registro
- ✅ **Compatibilidade** entre navegadores
- ✅ **Screenshots** automáticos em falhas

### Dados de teste gerados:

- **Email único**: `joao.silva{timestamp}@email.com`
- **Senha única**: `MinhaSenh{timestamp}@123`
- **Dados pessoais**: Nome, endereço, telefone fixos
- **País**: Brasil (selecionado automaticamente)

  ```bash
  npm run test:debug
  ```

2. **UI Mode:**

   ```bash
   npm run test:ui
   ```

3. **Inspector:**
   ```bash
   npx playwright test --debug
   ```

## 📝 Exemplos de Uso

### Exemplo básico de teste:

```javascript
const { test, expect } = require("@playwright/test");
const { HomePage } = require("../page-objects/HomePage");

test("should search for products", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await homePage.searchProduct("hammer");

  const productCount = await homePage.getProductCount();
  expect(productCount).toBeGreaterThan(0);
});
```

## 🤝 Contribuição

1. Clone o repositório
2. Instale as dependências
3. Crie uma branch para sua feature
4. Implemente os testes
5. Execute os testes para garantir que passam
6. Faça commit das mudanças
7. Abra um Pull Request

## 📞 Site de Teste

**[Practice Software Testing - Registro](https://practicesoftwaretesting.com/auth/register)**

- Formulário completo de registro
- Validações em tempo real
- Dados persistidos no sistema
- Ambiente estável para automação

## � Execução Rápida

```bash
# Executar teste de registro com visualização
npx playwright test register.spec.js --headed

# Executar em todos os navegadores
npx playwright test register.spec.js --headed --project=chromium --project=firefox --project=webkit
```

---

**Automação de Registro Multi-Navegador com Playwright e JavaScript** 🎭 📝 🌐
