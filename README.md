# Introdução
Este projeto vem apresentar a prova de conceito de duas bibliotecas integradas com a biblioteca do Cypress Audit, fazendo um teste no site do google e colhendo métricas de performace e possíveis erros de acessibilidade.

# Passo a passo

```
npm init -y
npm i cypress --save-dev
npm i @cypress-audit/lighthouse
npm i @cypress-audit/pa11y
```

## Configurar bibliotecas no arquivo: cypress\support\commands.js
```
import "@cypress-audit/pa11y/commands";
import "@cypress-audit/lighthouse/commands";
```
## Configurar arquivo cypress.config.js

```
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse");
const { pa11y } = require("@cypress-audit/pa11y");
const fs = require("fs");

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
```
## Criar arquivo de testes google.spec.cy.js
```
describe('Lighthouse', () => {
  it('should run performance audits in google home page', () => {
    cy.visit('https://google.com.br/');
    
        //Define os parametros considerados como aprovados para o testes.
        const customThresholds = {
          performance: 30,
          accessibility: 50,
          seo: 70,
          'first-contentful-paint': 3000,
          'largest-contentful-paint': 10000,
          'cumulative-layout-shift': 0.1,
          'total-blocking-time': 800,
        };
    
        const desktopConfig = {
          formFactor: 'desktop',
          screenEmulation: { disabled: true },
        };
  
        const lighthouseConfig = {
          settings: { output: "html" },
          extends: "lighthouse:default",
        };

        cy.lighthouse(customThresholds, desktopConfig, lighthouseConfig);
        cy.pa11y();
  });
});
```
# Executar teste

> npm run test

# Resultados
Pode ser verificado o arquivo lighthouse.html criado (abra em um navegador) e no console os seguintes erros encontrados pela biblioteca Pa11y:

```
     Error: cy.pa11y - 5 accessibility violations were found

> Issue: label-title-only, # of occurrences: 1.
  - Form elements should have a visible label (https://dequeuniversity.com/rules/axe/4.2/label-title-only?application=axeAPI)
  - Context: <input class="lst Ucigb" style="margin: 0px; padding: 5px 38px 0px 6px; vertical-align: top; color: rgb(0, 0, 0); outline: none;" autocomplete="off" value="" title="Pesquisa Google" maxlength="2048" name="q" size="57" dir="ltr" spellcheck="false">
  - Selector concerned: "html > body > center > form > table > tbody > tr > td:nth-child(2) > div > div > input"


> Issue: bypass, # of occurrences: 1.
  - Page must have means to bypass repeated blocks (https://dequeuniversity.com/rules/axe/4.2/bypass?application=axeAPI)
  - Context: <html itemscope="" itemtype="http://schema.org/WebPage" lang="pt-BR"><head><meta content="text/html;...</html>
  - Selector concerned: "html"


> Issue: color-contrast, # of occurrences: 3.
  - Elements must have sufficient color contrast (https://dequeuniversity.com/rules/axe/4.2/color-contrast?application=axeAPI)
  - Context: <a class="gb1" style="text-decoration:none" href="https://www.google.com.br/intl/pt-BR/about/products?tab=wh"><u>Mais</u> »</a>
  - Selector concerned: "#gbar > nobr > a:nth-child(9),html > body > center > form > table > tbody > tr > td:nth-child(2) > span:nth-child(8) > span > input,#tsuid_2"
```

# Inspirações
Cypress com Google Lighthouse para testes de perfomance - Pedro Henrique Joioso Martins
Link: https://medium.com/engenharia-arquivei/cypress-com-google-lighthouse-para-testes-de-perfomance-ba1b756653d0#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6ImFjM2UzZTU1ODExMWM3YzdhNzVjNWI2NTEzNGQyMmY2M2VlMDA2ZDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAyOTM5ODkxMzU3NDA4OTQxMDciLCJlbWFpbCI6ImRvdWdhcUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzE1MDk1MjA4LCJuYW1lIjoiRG91Z2xhcyBBZHJpYW5vIFF1ZWlyb3oiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWthWlh3ZWZMQk40UE9OSGlEdmNUWU8wRUZRdHZkNUNRSnRERlN1bFY3YnN6cEJBPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRvdWdsYXMiLCJmYW1pbHlfbmFtZSI6IkFkcmlhbm8gUXVlaXJveiIsImlhdCI6MTcxNTA5NTUwOCwiZXhwIjoxNzE1MDk5MTA4LCJqdGkiOiJhZmMwMDQ3YThkOGYzOTMyYWI4ZDc2NGY0NjU5MjMwMTNjNjBhMDczIn0.OeFWouvaqHN8G52Moh4L3e_EIai13Sx6wAs3uH91MxyxyLsilJDyLLtfWveSLINzq1nKzdGv03W_r1IcBWo7ts3_0pdQBfM4_qUiEjXWUOpuR3jb_9knmQyQqEDBhCSdV7XELEdOux-8hwj0zSXC8lr8Rca43qSwAIOjfzkC46s0jGEXUbYRXclBJh_iIRhbhyYwtlYvjIlU3EhtU3sHPlLt7pucfjorUseT--PusPLWYoj4sqmx09TpGcPBbSaaSmLtptY91v2qtfo1CUS2KzhRZSY6muiw3XuLZaH_Uh9ghfT33gefdHR5w6JtS_3mTUAVOdc_umdfh_hp2ys7jQ


# Referências

Cypress Audit
https://www.npmjs.com/package/cypress-audit

Pa11y
https://www.npmjs.com/package/pa11y


Lighthouse
https://www.npmjs.com/package/lighthouse
