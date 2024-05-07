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