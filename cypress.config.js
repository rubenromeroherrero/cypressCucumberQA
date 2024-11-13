// const {
//   addCucumberPreprocessorPlugin,
// } = require("@badeball/cypress-cucumber-preprocessor");
// const {
//   createEsbuildPlugin,
// } = require("@badeball/cypress-cucumber-preprocessor/esbuild");
// const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
// const { defineConfig } = require("cypress");
// const cypressOnFix = require("cypress-on-fix");
// module.exports = defineConfig({
//   reporter: "cypress-mochawesome-reporter",
//   reporterOptions: {
//     charts: true,
//     reportPageTitle: "custom-title",
//     embeddedScreenshots: true,
//     inlineAssets: true,
//     saveAllAttempts: false,
//   },
//   projectId: "ncsghx",
//   e2e: {
//     setupNodeEvents: async (on, config) => {
//       // "cypress-on-fix" is required because "cypress-mochawesome-reporter" and "cypress-cucumber-preprocessor" use the same hooks
//       on = cypressOnFix(on);

//       // Mochawesome reporter plugin
//       require("cypress-mochawesome-reporter/plugin")(on);

//       // Cucumber plugin
//       await addCucumberPreprocessorPlugin(on, config);

//       // Esbuild preprocessor plugin
//       on(
//         "file:preprocessor",
//         createBundler({ plugins: [createEsbuildPlugin(config)] })
//       );

//       return config;
//     },
//     chromeWebSecurity: false,
//     specPattern: ["**/*.feature", "**/apiTest/*/*.js"],
//     async setupNodeEvents(on, config) {
//       await addCucumberPreprocessorPlugin(on, config);
//       on(
//         "file:preprocessor",
//         createBundler({ plugins: [createEsbuildPlugin(config)] })
//       );
//       return config;
//     },
//     baseUrl: "https://www.saucedemo.com",
//     baseUrlPRE: "https://www.saucedemo-pre.com",
//     //Esta configuración, es para cuando ejecutamos varios tests, solo guardamos el nº de test que queramos en memoria
//     //numTestsKeptInMemory: 2,
//     // wait => va a esperar todo el tiempo que le digas
//     //timeout => va a tardar el tiempo que tarde en encontrarlo, si lo encuentra antes, no espera lo que le hayas establecido
//     // ES MEJOR USAR TIMEOUT, PORQUE ESPERA LO JUSTO Y NECESARIO HASTA QUE ENCUENTRA EL TAG
//     defaultCommandTimeout: 6000,
//     env: {
//       snapshotOnly: false,
//       requestMode: true,
//     },
//   },
// });

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");
const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { defineConfig } = require("cypress");
const cypressOnFix = require("cypress-on-fix");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "custom-title",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  projectId: "ncsghx",
  e2e: {
    setupNodeEvents: async (on, config) => {
      // "cypress-on-fix" is required because "cypress-mochawesome-reporter" and "cypress-cucumber-preprocessor" use the same hooks
      on = cypressOnFix(on);

      // Mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      // Cucumber plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Esbuild preprocessor plugin
      on(
        "file:preprocessor",
        createBundler({ plugins: [createEsbuildPlugin(config)] })
      );

      return config;
    },
    failOnStatusCode: false,
    chromeWebSecurity: false,
    specPattern: ["**/*.feature", "**/apiTests/*/*.js"],
    defaultCommandTimeout: 10000,
    numTestsKeptInMemory: 10,
    env: {
      snapshotOnly: true,
      requestMode: true,
    },
  },
});
