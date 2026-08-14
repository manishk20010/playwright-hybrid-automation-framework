
# Playwright Hybrid Automation Framework

## Overview

This project is a scalable hybrid automation framework developed using Playwright, TypeScript, and Playwright Test.

The framework follows Page Object Model (POM) principles and provides reusable utilities, fixtures, test data management, environment-based configuration, and reporting.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Playwright Test
- Allure Report
- Git
- GitHub
- Azure DevOps / GitHub Actions

## Project Structure

# Playwright Hybrid Automation Framework

## Overview

This project is a **scalable hybrid test automation framework** built using **Playwright, TypeScript, and Playwright Test**.

The framework is designed for maintainability, reusability, scalability, and easy execution across different environments such as **QA, UAT, and Production**.

It follows **Page Object Model (POM)** principles while separating page locators, reusable actions, test data, fixtures, utilities, and test scenarios.

---

## Key Features

* Playwright with TypeScript
* Page Object Model (POM)
* Base Page for common browser actions
* Separate locator classes
* Reusable utility functions
* Custom Playwright fixtures
* Environment-based configuration
* Support for multiple environments
* Smoke and Regression test suites
* Data-driven testing
* Reusable screenshot functionality
* Playwright HTML reporting
* Allure reporting
* Trace and debugging support
* Git/GitHub integration
* CI/CD ready
* Scalable folder structure

---

## Technology Stack

| Technology                    | Purpose                   |
| ----------------------------- | ------------------------- |
| Playwright                    | Web UI Automation         |
| TypeScript                    | Programming Language      |
| Node.js                       | Runtime Environment       |
| Playwright Test               | Test Runner               |
| Allure                        | Test Reporting            |
| Git                           | Version Control           |
| GitHub                        | Source Code Management    |
| Azure DevOps / GitHub Actions | CI/CD                     |
| dotenv                        | Environment Configuration |

---

## Framework Architecture

playwright-hybrid-automation-framework/
│
├── src/
│   │
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   ├── HomePage.ts
│   │   └── ...
│   │
│   ├── locators/
│   │   ├── LoginLocators.ts
│   │   ├── HomeLocators.ts
│   │   └── ...
│   │
│   ├── fixtures/
│   │   └── testFixtures.ts
│   │
│   ├── utils/
│   │   ├── screenshotUtils.ts
│   │   ├── testDataUtils.ts
│   │   └── ...
│   │
│   └── test-data/
│       ├── user.json
│       └── ...
│
├── tests/
│   ├── smoke/
│   ├── regression/
│   └── ...
│
├── screenshots/
│
├── allure-results/
├── allure-report/
├── playwright-report/
│
├── .env
├── .gitignore
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md


# Design Principles

## Page Object Model

Each application page is represented by a dedicated Page Object class.

Example:

```typescript
export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    async login(username: string, password: string) {
        await this.page.getByLabel('Username').fill(username);
        await this.page.getByLabel('Password').fill(password);
        await this.page.getByRole('button', { name: 'Login' }).click();
    }
}
```

The test contains the business scenario while page-specific interaction remains inside the Page Object.

---

## BasePage

`BasePage.ts` contains common functionality that can be reused across multiple pages.

Typical responsibilities include:

* Navigation
* Common waits
* Screenshot handling
* Common element actions
* URL validation
* Page-level utilities

Example:

```typescript
export class BasePage {

    constructor(protected page: Page) {}

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({
            path: `screenshots/${name}.png`,
            fullPage: true
        });
    }
}
```

This prevents duplication across individual Page Objects.

---

# Locator Management

Application locators are separated from page actions wherever practical.

Example:

```typescript
export class LoginLocators {

    usernameInput = 'input[name="username"]';

    passwordInput = 'input[name="password"]';

    loginButton = 'button[type="submit"]';
}
```

The Page Object is responsible for performing actions using these locators.

This separation makes locator maintenance easier when the UI changes.

---

# Fixtures

Custom Playwright fixtures are used to reduce repetitive object creation in tests.

Instead of repeatedly writing:

```typescript
const loginPage = new LoginPage(page);
const homePage = new HomePage(page);
```

fixtures can provide the required Page Objects directly to the test.

Example:

```typescript
export const test = base.extend<{
    loginPage: LoginPage;
    homePage: HomePage;
}>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    }
});
```

Test:

```typescript
test('Valid Login', async ({ loginPage }) => {

    await loginPage.login(
        process.env.USERNAME!,
        process.env.PASSWORD!
    );

});
```

---

# Environment Management

The framework supports environment-specific execution.

Example environments:

```text
QA
UAT
PROD
```

Environment values can be controlled using environment variables.

### PowerShell

```powershell
$env:ENV="UAT"
npx playwright test
```

Verify:

```powershell
echo $env:ENV
```

Expected:

```text
UAT
```

Environment-specific configuration can then be handled inside `playwright.config.ts`.

---

# Test Organization

Tests are organized according to their purpose.

```text
tests/
│
├── smoke/
│   ├── login.spec.ts
│   ├── header.spec.ts
│   └── ...
│
└── regression/
    ├── login.spec.ts
    ├── profile.spec.ts
    ├── footer.spec.ts
    └── ...
```

### Smoke Tests

Smoke tests validate critical application functionality.

Examples:

* Application launch
* Login
* Main navigation
* Critical business workflows

### Regression Tests

Regression tests provide broader application coverage.

Examples:

* Header
* Footer
* Forms
* Search
* User management
* Business workflows

---

# Test Tags

Tests can be tagged using annotations such as:

```typescript
test('Login successfully @smoke', async ({ loginPage }) => {

});
```

Run smoke tests:

```bash
npx playwright test --grep @smoke
```

Run regression tests:

```bash
npx playwright test --grep @regression
```

---

# Reusable Utilities

Common functionality is maintained inside the `utils` directory.

Examples include:

* Screenshot utilities
* Test data utilities
* Random data generators
* Date utilities
* API helpers
* Common validation helpers

Example screenshot utility:

```typescript
import { Page } from '@playwright/test';

export async function takeScreenshot(
    page: Page,
    name: string
) {
    await page.screenshot({
        path: `screenshots/${name}.png`,
        fullPage: true
    });
}
```

Usage:

```typescript
await takeScreenshot(page, 'login-page');
```

---

# Test Data

Test data should be separated from test implementation.

Example:

```text
src/
└── test-data/
    ├── users.json
    ├── products.json
    └── testData.json
```

Example:

```json
{
    "validUser": {
        "username": "testuser",
        "password": "password"
    }
}
```

Sensitive credentials should **not** be stored in source control.

Use environment variables or a secure CI/CD secret store for credentials.

---

# Playwright Configuration

The central configuration is maintained in:

```text
playwright.config.ts
```

Typical configuration includes:

* Base URL
* Browsers
* Workers
* Retries
* Timeout
* Screenshots
* Video
* Trace
* Reporters
* Environment configuration

Example:

```typescript
use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
}
```

---

# Installation

## Prerequisites

Install:

* Node.js
* npm
* Git
* Playwright
* Allure CLI (for Allure reporting)

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## Clone Repository

```bash
git clone https://github.com/manishk20010/playwright-hybrid-automation-framework.git
```

Navigate to the project:

```bash
cd playwright-hybrid-automation-framework
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

---

# Executing Tests

## Run All Tests

```bash
npx playwright test
```

## Run in Headed Mode

```bash
npx playwright test --headed
```

## Run Specific Test

```bash
npx playwright test tests/login.spec.ts
```

## Run Smoke Tests

```bash
npx playwright test --grep @smoke
```

## Run Regression Tests

```bash
npx playwright test --grep @regression
```

---

# Environment-Based Execution

For UAT:

```powershell
$env:ENV="UAT"
npx playwright test
```

For QA:

```powershell
$env:ENV="QA"
npx playwright test
```

For Production:

```powershell
$env:ENV="PROD"
npx playwright test
```

Environment-specific URLs and configuration should be managed through environment configuration rather than hard-coded inside tests.

---

# Playwright HTML Report

After execution:

```bash
npx playwright show-report
```

The HTML report provides:

* Passed tests
* Failed tests
* Test duration
* Screenshots
* Traces
* Error information

---

# Allure Reporting

Allure results are generated during test execution.

Generate the report:

```bash
allure generate allure-results --clean -o allure-report
```

Open the report:

```bash
allure open allure-report
```

A typical workflow is:

```bash
npx playwright test
allure generate allure-results --clean -o allure-report
allure open allure-report
```

---

# Debugging Failed Tests

Playwright trace can be used to investigate failures.

Run with trace:

```bash
npx playwright test --trace on
```

Open a trace:

```bash
npx playwright show-trace path/to/trace.zip
```

Debug mode:

```bash
npx playwright test --debug
```

---

# Screenshots

The framework supports reusable screenshot functionality.

Screenshots can be captured:

* After important actions
* On test failure
* At specific checkpoints
* For debugging

Example:

```typescript
await takeScreenshot(page, 'dashboard');
```

---

# Git Workflow

Create a feature branch:

```bash
git switch -c feature/login-automation
```

Check changes:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "Add login automation"
```

Push:

```bash
git push -u origin feature/login-automation
```

Update local branch:

```bash
git pull
```

---

# CI/CD

The framework is designed to integrate with CI/CD platforms such as:

* GitHub Actions
* Azure DevOps
* Jenkins

A typical CI pipeline can perform:

```text
Checkout Code
      ↓
Install Node.js
      ↓
npm install
      ↓
Install Playwright Browsers
      ↓
Set Environment
      ↓
Execute Tests
      ↓
Generate Test Reports
      ↓
Publish Reports
```

---

# Best Practices

This framework follows the following automation principles:

### 1. Keep tests independent

Each test should be capable of running independently wherever possible.

### 2. Avoid hard-coded test data

Use test data files, environment variables, or secure configuration.

### 3. Prefer Playwright locators

Use:

```typescript
getByRole()
getByLabel()
getByText()
getByTestId()
```

before relying on fragile XPath/CSS selectors.

### 4. Avoid unnecessary waits

Prefer Playwright's built-in auto-waiting and assertions over:

```typescript
page.waitForTimeout()
```

### 5. Keep business logic out of tests

Tests should describe **what is being validated**, while Page Objects should handle **how the application is interacted with**.

### 6. Reuse common functionality

Common operations should be placed in:

```text
BasePage
Utils
Fixtures
```

rather than duplicated across tests.

### 7. Keep secrets out of Git

Never commit:

```text
.env
passwords
API keys
access tokens
```

Use `.gitignore` and CI/CD secret management.

---

# Example Test

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage';

test('Valid Login @smoke', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(
        process.env.USERNAME!,
        process.env.PASSWORD!
    );

    await expect(page).toHaveURL(/dashboard/);
});
```

---

# Future Enhancements

The framework can be extended with:

* API automation
* Database validation
* Visual testing
* Accessibility testing
* Parallel execution optimization
* Multi-browser execution
* Docker support
* GitHub Actions
* Azure DevOps pipelines
* Allure history management
* Test data factories
* API-based authentication
* Cross-environment configuration
* Component Object Model
* Service/API layer

---

# Author

**Manish Kumar**

Senior QA / Automation Engineer

### Expertise

* Playwright
* TypeScript
* JavaScript
* Manual Testing
* Automation Testing
* API Testing
* Performance Testing
* CI/CD
* Git/GitHub
* Azure DevOps
* Allure Reporting

---

## License

This project is intended for automation framework demonstration, learning, and professional portfolio purposes.
