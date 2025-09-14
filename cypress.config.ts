import { defineConfig } from 'cypress';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';
import { downloadFile } from 'cypress-downloadfile/lib/addPlugin';
import fs from 'fs';
import path from 'path';
import { lighthouse, prepareAudit } from '@cypress-audit/lighthouse';
import xlsx from 'xlsx';  // Import the xlsx library

let lighthouseLaunchCount = 0;
const scoreFilePath = path.join('cypress', 'fixtures', 'previousScores.json'); // Path to store scores

export default defineConfig({
  e2e: {
    browser: 'chrome',
    env: {
      SYSTEM_ACCESSTOKEN: process.env.SYSTEM_ACCESSTOKEN,
      keepFailedVideos: true,
      experimentalMemoryManagement: true,
      numTestsKeptInMemory: 1,
    },
    retries: {
      runMode: 1,
    },
    defaultCommandTimeout: 72000,
    viewportWidth: 1280,
    viewportHeight: 800,
    specPattern: [

     // "cypress/e2e/Login_Prod.feature",
     //  "cypress/e2e/Set_Expect_Create_Simple_Project_Prod.feature",
     // "cypress/e2e/Set_Expect_Create_Advance_Project_Prod.feature",
       "cypress/e2e/Set_Expect_Create_Requirement_Prod.feature",
       "cypress/e2e/Set_Expect_Project_All_Links_1_Prod.feature",
      "cypress/e2e/Set_Expect_Project_All_Links_2_Prod.feature",

    ],
    video: true,
    videosFolder: 'cypress/videos',
    videoCompression: 32,
    trashAssetsBeforeRuns: true,

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
          'file:preprocessor',
          createBundler({
            plugins: [createEsbuildPlugin(config)],
          })
      );

      // Browser launch modifications for Lighthouse
      on('before:browser:launch', (browser = {}, launchOptions) => {
        lighthouseLaunchCount++;
        prepareAudit(launchOptions);
        if (browser.family === 'chrome') {
          launchOptions.args = launchOptions.args.filter(arg => arg !== '--new-tab');
        }
        return launchOptions;
      });

      // Registering custom tasks
      on('task', {
        downloadFile,
        deleteLogs() {
          const failedApiLogsPath = path.join(
              __dirname,
              'cypress',
              'fixtures',
              'failedApiLogs.json'
          );
          const consoleErrorsPath = path.join(
              __dirname,
              'cypress',
              'fixtures',
              'consoleErrors.json'
          );

          if (fs.existsSync(failedApiLogsPath)) {
            fs.unlinkSync(failedApiLogsPath);
          }

          if (fs.existsSync(consoleErrorsPath)) {
            fs.unlinkSync(consoleErrorsPath);
          }

          return null;
        },

        writeFailedApiLogs({ logs }) {
          const filePath = 'cypress/fixtures/failedApiLogs.json';
          const logData = JSON.stringify(logs, null, 2);
          fs.writeFileSync(filePath, logData);
          return null;
        },

        logErrorToFile({ errors }) {
          const filePath = path.join(
              __dirname,
              'cypress',
              'fixtures',
              'consoleErrors.json'
          );
          const errorLogs = fs.existsSync(filePath)
              ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
              : [];
          errorLogs.push({ errors });
          fs.writeFileSync(filePath, JSON.stringify(errorLogs, null, 2));
          return null;
        },

        // Lighthouse task with saving to Excel
        lighthouse(results) {
          const reportDir = path.join('cypress', 'reports');
          const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
          const reportBaseName = `lighthouse-report-${timestamp}`;

          if (!results) {
            throw new Error('Lighthouse results are not defined');
          }

          // Define paths for JSON and HTML report files
          const jsonReportPath = path.join(reportDir, `${reportBaseName}.json`);
          const htmlReportPath = path.join(reportDir, `${reportBaseName}.html`);

          // Ensure the report directory exists
          if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
          }

          // Save JSON and HTML reports
          fs.writeFileSync(jsonReportPath, JSON.stringify(results, null, 2));
          const htmlReport = results.report;
          fs.writeFileSync(htmlReportPath, htmlReport, 'utf8');

          // Extract Lighthouse scores
          const scores = {
            performance: results.lhr.categories.performance.score * 100,
            accessibility: results.lhr.categories.accessibility.score * 100,
            bestPractices: results.lhr.categories['best-practices'].score * 100,
            seo: results.lhr.categories.seo.score * 100,
            pwa: results.lhr.categories.pwa.score * 100,
          };

          // Prepare data to save in Excel
          const reportData = [
            ['Metric', 'Score'],
            ['Performance', scores.performance],
            ['Accessibility', scores.accessibility],
            ['Best Practices', scores.bestPractices],
            ['SEO', scores.seo],
            ['PWA', scores.pwa],
          ];

          // Define the Excel workbook and worksheet
          const wb = xlsx.utils.book_new();
          const ws = xlsx.utils.aoa_to_sheet(reportData);

          // Add worksheet to workbook
          xlsx.utils.book_append_sheet(wb, ws, 'Lighthouse Scores');

          // Define Excel report path
          const excelReportPath = path.join(reportDir, `${reportBaseName}.xlsx`);

          // Write the workbook to an Excel file
          xlsx.writeFile(wb, excelReportPath);

          return null;
        },
      });

      return config;
    },
  },
});
