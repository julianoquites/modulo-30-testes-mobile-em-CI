import dotenv from "dotenv";
dotenv.config();

export const config = {
  // runner: "local",
  // port: 4723,
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  hostname: "ondemand.us-west-1.saucelabs.com",
  protocol: "https",
  port: 443,
  baseUrl: "wd/hub",

  specs: ["./test/specs/**/*.js"],
  maxInstances: 1,

  capabilities: [
    {
      platformName: "iOS",
      "appium:app": "storage:filename=LojaEBAC.ipa", // The filename of the mobile app
      "appium:deviceName": "iPhone XR",
      "appium:automationName": "XCUITest",
      "appium:disableIdLocatorAutocompletion": true,
      "sauce:options": {
        build: "appium-build-EBAC-MODULO-30",
        name: "Teste iOS",
        deviceOrientation: "PORTRAIT",
        appiumVersion: "latest",
      },
    },
  ],
  logLevel: "trace",
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,

  connectionRetryCount: 3,

  framework: "mocha",

  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
  afterTest: async function (
    test,
    context,
    { error, result, duration, passed, retries }
  ) {
    await browser.takeScreenshot();
  },
};
