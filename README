# Google Lighthouse and Pa11y Integration with Cypress

This project demonstrates how to integrate the powerful Cypress Audit library with Lighthouse and Pa11y to conduct comprehensive performance and accessibility audits on websites directly within your Cypress test suite.

## Setting Up the Environment

Project Initialization:

Create a new project directory and navigate to it:
Bash
mkdir cypress-audit-example
cd cypress-audit-example
Use o código com cuidado.
content_copy
Initialize a new npm project:
Bash
npm init -y
Use o código com cuidado.
content_copy
Install Dependencies:

Install Cypress as a development dependency:
Bash
npm install cypress --save-dev
Use o código com cuidado.
content_copy
Install the Cypress Audit libraries for Lighthouse and Pa11y:
Bash
npm install @cypress-audit/lighthouse @cypress-audit/pa11y --save-dev
Use o código com cuidado.
content_copy
## Configuration

Command Configuration (cypress/support/commands.js):

Import the necessary commands from the Cypress Audit libraries:
JavaScript
import "@cypress-audit/pa11y/commands";
import "@cypress-audit/lighthouse/commands";
Use o código com cuidado.
content_copy
Test Configuration (cypress.config.js):

Import required modules:
JavaScript
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");
const fs = require("fs");
Use o código com cuidado.
content_copy
Configure Cypress settings within the e2e object:
JavaScript
module.exports = {
  video: false,
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on("task", {
        lighthouse: lighthouse((lighthouseReport) => {
          const reportHtml = lighthouseReport.report;
          fs.writeFileSync('lighthouse.html', reportHtml);
        }),
        pa11y: pa11y(console.log.bind(console)),
      });
    },
  },
};
Use o código com cuidado.
content_copy
## Writing the Test (google.spec.cy.js):

Create a new test file:

Bash
touch google.spec.cy.js
Use o código com cuidado.
content_copy
Test Code:

JavaScript
describe('Lighthouse and Pa11y Audit', () => {
  it('should run audits on Google Brazil homepage', () => {
    cy.visit('https://google.com.br/');

    // Custom thresholds for pass/fail criteria
    const customThresholds = {
      performance: 30,
      accessibility: 50,
      seo: 70,
      'first-contentful-paint': 3000,
      'largest-contentful-paint': 10000,
      'cumulative-layout-shift': 0.1,
      'total-blocking-time': 800,
    };

    // Desktop emulation configuration
    const desktopConfig = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
    };

    // Lighthouse configuration
    const lighthouseConfig = {
      settings: { output: "html" },
      extends: "lighthouse:default",
    };

    // Run Lighthouse audit
    cy.lighthouse(customThresholds, desktopConfig, lighthouseConfig);

    // Run Pa11y accessibility audit
    cy.pa11y();
  });
});
Use o código com cuidado.
content_copy
## Running the Test

Execute the test:
Bash
npm run test
Use o código com cuidado.
content_copy
## Results

The Lighthouse audit report will be generated as lighthouse.html. Open this file in a browser to view detailed performance metrics.
Accessibility violations identified by Pa11y will be logged to the console during test execution.
## Inspiration

Cypress com Google Lighthouse para testes de perfomance - Pedro Henrique Joioso Martins: [invalid URL removed]
Fontes
info
github.com/mfrachet/cypress-auditSujeito à licença (MIT)
github.com/gkemp94/cypress-lighthouse/issues/6
