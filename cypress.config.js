const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );
      return config;
    },
    // wait => va a esperar todo el tiempo que le digas
    //timeout => va a tardar el tiempo que tarde en encontrarlo, si lo encuentra antes, no espera lo que le hayas establecido
    // ES MEJOR USAR TIMEOUT, PORQUE ESPERA LO JUSTO Y NECESARIO HASTA QUE ENCUENTRA EL TAG
    //defaultCommandTimeout: 6000,
    //Esta configuración, es para cuando ejecutamos varios tests, solo guardamos el nº de test que queramos en memoria
    //numTestsKeptInMemory: 2,
    baseUrl: "https://www.saucedemo.com",
    baseUrlPRE: "https://www.saucedemo-pre.com",
  },
});
