# Projeto de Automação com Playwright

Este é um projeto de automação de testes para o site [Practice Software Testing](https://practicesoftwaretesting.com/) usando Playwright e JavaScript.

## 📁 Estrutura do Projeto

```
AutomacaoPW/
├── page-objects/           # Page Objects (Padrão de design)
│   ├── HomePage.js        # Página inicial
│   ├── LoginPage.js       # Página de login
│   └── RegisterPage.js    # Página de registro
├── tests/                 # Testes automatizados
│   ├── homepage.spec.js   # Testes da página inicial
│   ├── login.spec.js      # Testes de login
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

- `npm run codegen` - Abre o codegen na página principal
- `npm run codegen:home` - Abre o codegen na página inicial
- `npm run codegen:login` - Abre o codegen na página de login
- `npm run codegen:register` - Abre o codegen na página de registro

### Relatórios

- `npm run report` - Abre o relatório HTML dos testes

## 🧪 Executando Testes

### Executar todos os testes:

```bash
npm test
```

### Executar um arquivo específico:

```bash
npx playwright test tests/login.spec.js
```

### Executar testes com interface gráfica:

```bash
npm run test:headed
```

### Executar testes em modo debug:

```bash
npm run test:debug
```

## 🔧 Usando o Codegen

O Playwright Codegen é uma ferramenta que gera código automaticamente baseado nas suas interações com o site:

```bash
# Para a página principal
npm run codegen

# Para página de login
npm run codegen:login

# Para página de registro
npm run codegen:register
```

## 📱 Page Objects

Este projeto usa o padrão Page Object Model para organizar o código:

### HomePage.js

- Navegação pela página inicial
- Busca de produtos
- Filtros e categorias
- Navegação para login/registro

### LoginPage.js

- Processo de login
- Validações de campos
- Tratamento de erros
- Navegação entre páginas

### RegisterPage.js

- Processo de registro
- Preenchimento de formulários
- Validações de dados
- Seleção de país

## 🖼️ Screenshots

Os screenshots são automaticamente capturados:

- Durante falhas nos testes
- Quando chamado explicitamente nos Page Objects
- Salvos na pasta `screenshots/`

## 📊 Relatórios

Os relatórios são gerados automaticamente:

- Relatório HTML detalhado
- Traces para debugging
- Vídeos em caso de falha
- Screenshots em caso de erro

## 🌐 Navegadores Suportados

- **Desktop:** Chrome, Firefox, Safari, Edge
- **Mobile:** Chrome Mobile, Safari Mobile

## ⚙️ Configurações

As configurações do Playwright estão no arquivo `playwright.config.js`:

- Timeout de ações: 30 segundos
- Retry em caso de falha: 2 tentativas
- Screenshot em falhas: Habilitado
- Vídeo em falhas: Habilitado
- Trace em retry: Habilitado

## 🔍 Debugging

Para fazer debug dos testes:

1. **Modo Debug:**

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

Este projeto foi desenvolvido para testar o site:
**[Practice Software Testing](https://practicesoftwaretesting.com/)**

- Site de demonstração para práticas de automação
- Funcionalidades completas de e-commerce
- Dados de teste disponíveis
- Ambiente estável para automação

## 🔐 Credenciais de Teste

Para testes de login, use as credenciais padrão:

- **Email:** customer@practicesoftwaretesting.com
- **Senha:** welcome01

---

**Desenvolvido para automação de testes com Playwright e JavaScript** 🎭
