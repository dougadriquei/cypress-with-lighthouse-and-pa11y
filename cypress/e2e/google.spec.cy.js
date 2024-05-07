describe('Lighthouse', () => {
  it('should run performance audits in google home page', () => {
    //Visita o site do google
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
    //Define configurações para o lighthosue
    const desktopConfig = {
      formFactor: 'desktop',
      screenEmulation: { disabled: true },
    };

    //Define o formato da saida do relatório do lighthouse
    const lighthouseConfig = {
      settings: { output: "html" },
      extends: "lighthouse:default",
    };
    //Executa o lighthouse
    cy.lighthouse(customThresholds, desktopConfig, lighthouseConfig);
    //Executa o pa11y
    cy.pa11y();
  });
});