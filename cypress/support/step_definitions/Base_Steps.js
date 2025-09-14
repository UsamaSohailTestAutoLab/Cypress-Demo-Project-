/// <reference types="cypress" />
import { Before, After } from "@badeball/cypress-cucumber-preprocessor";

let failedApiLogs = [];
let consoleErrors = [];
let softAssertionCount = 0;

Before(() => {
    cy.clearLocalStorage();
    cy.log("Test execution started...");

    // Intercept all requests
    cy.intercept('*', (request) => {
        request.on('response', (response) => {
            if (response.statusCode >= 400) {
                // Ignore specific error codes
                if (![409, 401, 403, 405].includes(response.statusCode)) {
                    failedApiLogs.push({ request, response });
                    softAssertionCount++;

                    cy.document().then((doc) => {
                        const logDetails = JSON.stringify(response, null, 2);
                        const logContainer = doc.createElement('div');
                        logContainer.setAttribute('id', `log-details-${failedApiLogs.length - 1}`);
                        logContainer.style.position = 'fixed';
                        logContainer.style.top = '0';
                        logContainer.style.left = '0';
                        logContainer.style.width = '100%';
                        logContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                        logContainer.style.color = 'white';
                        logContainer.style.zIndex = '10000';
                        logContainer.style.padding = '10px';
                        logContainer.style.whiteSpace = 'pre-wrap';
                        logContainer.innerText = logDetails;

                        doc.body.appendChild(logContainer);

                        cy.wait(2000); // Adjust as needed

                        cy.screenshot(`failed-api-call-${failedApiLogs.length - 1}`, { capture: 'runner' }).then(() => {
                            doc.body.removeChild(logContainer);
                            cy.log(`Soft assertion: API request failed with status code ${response.statusCode}`);
                        });
                    });
                }
            }
        });
    }).as("allApiRequests");

    // Disable beforeunload
    cy.window().then((win) => {
        win.onbeforeunload = null;
    });

    // Handle uncaught exceptions
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Cannot use import statement outside a module') || err.message.includes('cancelled')) {
            return false;
        }
        return true;
    });

    // Capture console errors
    Cypress.on('window:before:load', (win) => {
        const originalConsoleError = win.console.error;
        win.console.error = function (...args) {
            originalConsoleError.apply(win.console, args);
            const errorMessage = args.map(arg => (typeof arg === 'object' && arg.stack ? arg.stack : String(arg))).join('\n');
            consoleErrors.push({ message: errorMessage });
            softAssertionCount++;

            cy.document().then((doc) => {
                const consoleLogContainer = doc.createElement('div');
                consoleLogContainer.setAttribute('id', `console-log-${consoleErrors.length - 1}`);
                consoleLogContainer.style.position = 'fixed';
                consoleLogContainer.style.bottom = '0';
                consoleLogContainer.style.left = '0';
                consoleLogContainer.style.width = '100%';
                consoleLogContainer.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
                consoleLogContainer.style.color = 'white';
                consoleLogContainer.style.zIndex = '10000';
                consoleLogContainer.style.padding = '10px';
                consoleLogContainer.style.whiteSpace = 'pre-wrap';
                consoleLogContainer.innerText = errorMessage;

                doc.body.appendChild(consoleLogContainer);

                cy.wait(1400);

                cy.screenshot(`console-error-${consoleErrors.length - 1}`, { capture: 'runner' }).then(() => {
                    doc.body.removeChild(consoleLogContainer);
                    cy.log(`Soft assertion: Console error captured`);
                });
            });
        };
    });
});

After(() => {
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Cannot use import statement outside a module') || err.message.includes('cancelled')) {
            return false;
        }
        return true;
    });

    // Ensure log containers are gone
    cy.log('Verifying log details do not exist');
    cy.get('div[id*="log-details"]').should('not.exist', { timeout: 10000 });

    cy.log('Verifying console logs do not exist');
    cy.get('div[id*="console-log"]').should('not.exist', { timeout: 10000 });

    // Save failed API logs to file
    cy.then(() => {
        if (failedApiLogs.length > 0) {
            cy.log('Writing failed API logs to file');
            return cy.task('writeFailedApiLogs', { logs: failedApiLogs }).then(() => {
                failedApiLogs = [];
                cy.log('Failed API logs written successfully');
            });
        }
    });

    // Save console errors to file
    cy.then(() => {
        if (consoleErrors.length > 0) {
            cy.log('Writing console errors to file');
            return cy.task('logErrorToFile', { errors: consoleErrors }).then(() => {
                consoleErrors = [];
                cy.log('Console errors written successfully');
            });
        }
    });

    // Report soft assertion summary
    cy.then(() => {
        if (softAssertionCount > 0) {
            cy.log(`⚠️ Soft assertions captured: ${softAssertionCount}`);
            softAssertionCount = 0;
        } else {
            cy.log('✅ No soft assertions during this test');
        }
    });
});
