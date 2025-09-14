// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-file-upload';
import 'cypress-plugin-tab';
import 'cypress-downloadfile/lib/downloadFileCommand';




Cypress.Commands.add('getIfExists', (selector) => {
    return cy.get(selector, { timeout: 1 }).then(($element) => {
        if ($element.length > 0) {
            return $element;
        } else {
            return null;
        }
    });
});
Cypress.Commands.add('softExpect', (subject, expectation, message) => {
    try {
        expect(subject).to[expectation];
    } catch (error) {
        // Throw a custom error that doesn't stop the test
        Cypress.log({
            name: 'Soft Assertion Error',
            message: `${message}: ${error.message}`,
        });
    }
});
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Cypress.Commands.add('randomClickFromList', (selector) => {
    cy.get(selector).then(($elements) => {
        if ($elements.length > 0) {
            const randomIndex = getRandomInt(0, $elements.length - 1);
            cy.wrap($elements.eq(randomIndex)).scrollIntoView().click();
            //cy.wrap($elements.eq(randomIndex)).type('tab');
            //cy.wrap($elements.eq(randomIndex)).type('esc');


        } else {
            cy.log('No elements found in the list');
        }
    });
});
// cypress/support/commands.js

// Function to generate a random alphanumeric string
// cypress/support/commands.js

// Function to generate a random string
Cypress.Commands.add('generateRandomString', (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
});
// cypress/support/commands.js

// Function to generate a random word with ".com" at the end
Cypress.Commands.add('generateRandomWordWithCom', () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const wordLength = Cypress._.random(5, 10); // Adjust the length as needed
    let result = '';

    for (let i = 0; i < wordLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return `${result}.com`;
});
Cypress.Commands.add('generateRandomWord', () => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const wordLength = Cypress._.random(5, 10); // Adjust the length as needed
    let result = '';

    for (let i = 0; i < wordLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return `${result}`;
});
Cypress.Commands.add('generateRandomEmail', () => {
    const randomString = Cypress._.random(0, 1e6).toString();
    const email = `test${randomString}@example.com`;
    return email;
});
Cypress.Commands.add('generateRandomPhoneNumber', () => {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    const formattedPhoneNumber = `+1${randomNumber}`;

    return formattedPhoneNumber;
});
Cypress.Commands.add('highlightMissingElement', { prevSubject: 'optional' }, (subject) => {
    if (subject) {
        Cypress.$(subject).removeClass('highlight-missing-element');
    } else {
        // Adjust this selector to match the container or body of your application
        Cypress.$('body').append('<div class="highlight-missing-element"></div>');
    }

    return subject;
});


Cypress.Commands.add('create', (locator, text, options = {}) => {
    cy.get(locator, options)
        .contains(text)
        .click({ force: true });
});
Cypress.Commands.add('generateRandomNumber', () => {
    const randomNumber = Math.floor(Math.random() * 1000); // Adjust the range as needed
    return randomNumber;
});


Cypress.Commands.add('iterateAndClickByText', { prevSubject: 'element' }, (subject, expectedText) => {
    // Normalize expected text (convert to lowercase and remove spaces)
    const normalizedExpectedText = expectedText.toLowerCase().replace(/\s/g, '');

    // Iterate over each element
    cy.wrap(subject).each(($element) => {
        // Normalize element text (convert to lowercase and remove spaces)
        const normalizedElementText = $element.text().toLowerCase().replace(/\s/g, '');

        // Check if the normalized element text matches the normalized expected text
        if (normalizedElementText === normalizedExpectedText) {
            // Click the element if there's a match
            cy.wrap($element).click();
        }
    });
});
Cypress.Commands.add('spinnerNotExist', () => {
    // cy.xpath('//ng-progress//div[@active="true"]').should('exist');
    cy.xpath('//ng-progress//div[@active="true"]').should('not.exist');
});

Cypress.Commands.add('waitForTextToAppear', (selector, expectedText, options = {}) => {
    const { timeout = Cypress.config('defaultCommandTimeout') } = options;

    return cy.get(selector, { timeout }).should($elements => {
        let textFound = false;

        $elements.each((index, element) => {
            const elementText = Cypress.$(element).text().trim();
            const lowercaseElementText = elementText.toLowerCase();
            const lowercaseExpectedText = expectedText.toLowerCase();

            if (lowercaseElementText === lowercaseExpectedText) {
                textFound = true;
                return false; // Exit the each loop early
            }
        });

        if (!textFound) {
            throw new Error(`Text "${expectedText}" not found within the specified timeout`);
        }
    });
});
Cypress.Commands.add('checkTextToAppear', (selector, expectedText, errorMessage, options = {}) => {
    // Validate that both selector and expectedText are provided and are strings
    if (typeof selector !== 'string' || !selector.trim()) {
        cy.log('Invalid selector: The selector must be a non-empty string.');
        return; // Stop the command execution
    }
    if (typeof expectedText !== 'string' || !expectedText.trim()) {
        cy.log('Invalid expectedText: The expectedText must be a non-empty string.');
        return; // Stop the command execution
    }

    // Default timeout of 10 seconds if not provided
    const { timeout = 10000 } = options;

    return cy.get(selector, { timeout }).should($elements => {
        let textFound = false;

        $elements.each((index, element) => {
            const elementText = Cypress.$(element).text().trim();
            const lowercaseElementText = elementText.toLowerCase();
            const lowercaseExpectedText = expectedText.toLowerCase();

            if (lowercaseElementText === lowercaseExpectedText) {
                textFound = true;
                return false; // Exit the each loop early
            }
        });

        if (!textFound) {
            // Log the custom error message if provided, otherwise use a default error message
            cy.log(errorMessage || `Text "${expectedText}" not found within the specified timeout.`);
            throw new Error(errorMessage || `Text "${expectedText}" not found within the specified timeout`);
        }
    });
});

Cypress.Commands.add('checkingsomethingwentwrong', () => {
    cy.get('div').each(($container, index) => {

        const inputSelector = 'div[class="cdk-overlay-container"] div div snack-bar-container';
        const inputElements = $container.find(inputSelector);

        if (inputElements.length > 0) {
            throw new Error('Custom error message: Condition not met');
        }
    });
});
Cypress.Commands.add('clickDropdownOptionByText', (triggerLocator, optionLocator, optionText, errorMessage) => {
    const isXPath = (locator) => locator.startsWith('//') || locator.startsWith('(');

    // Click the element that opens the dropdown
    if (isXPath(triggerLocator)) {
        cy.xpath(triggerLocator).click();
    } else {
        cy.get(triggerLocator).click();
    }

    // Attempt to find and click the desired option by text
    cy.document().then((doc) => {
        const options = isXPath(optionLocator)
            ? Cypress.$(doc).xpath(optionLocator)
            : Cypress.$(doc).find(optionLocator);

        const matchingOption = options.filter((index, element) => {
            return Cypress.$(element).text().trim() === optionText;
        });

        if (matchingOption.length > 0) {
            cy.wrap(matchingOption.first()).click();
        } else {
            throw new Error(errorMessage);
        }
    });
});

Cypress.Commands.add('typeRandomWordsIntoInputs', (containerSelector, inputSelector) => {
    cy.get(containerSelector).each(($container, index) => {
        const inputElements = $container.find(inputSelector);

        if (inputElements.length > 0) {

            cy.wrap(inputElements).each(($input, inputIndex) => {
                cy.generateRandomWordWithCom().then((randomWord) => {
                    cy.log(randomWord);
                    cy.wrap($input).scrollIntoView().type(randomWord)

                })
                // Additional actions or assertions based on your needs
            });
        } else {
            cy.log(`No input elements found within container ${index + 1}`);
        }
    });
});
Cypress.Commands.add('compareTextUsingXPath', (xpathLocator, textToCompare) => {
    // Normalize the text by making it lowercase and removing spaces
    const normalizeText = (text) => text.replace(/\s+/g, '').toLowerCase();
    const normalizedTextToCompare = normalizeText(textToCompare);

    let matchFound = false;

    // Use XPath to find elements and compare their text content
    cy.xpath(xpathLocator).each(($el) => {
        const elementText = $el.text();
        const normalizedElementText = normalizeText(elementText);

        // Compare the normalized texts
        if (normalizedElementText === normalizedTextToCompare) {
            cy.log(`Match found: ${elementText}`);
            matchFound = true;
            // Click on the matched element
            cy.wrap($el).scrollIntoView().click();

        } else {
            cy.log(`No match for: ${elementText}`);
        }
    }).then(() => {
        // Assert that at least one match was found
        expect(matchFound, `Match for "${textToCompare}"`).to.be.true;
    });
});
Cypress.Commands.add('compareNumberUsingXPath', (xpathLocator, numberToCompare) => {
    // Convert the number to compare to a string and normalize it by removing spaces
    const normalizeNumber = (num) => num.toString().replace(/\s+/g, '');
    const normalizedNumberToCompare = normalizeNumber(numberToCompare);

    let matchFound = false;

    // Use XPath to find elements and compare their text content as a number
    cy.xpath(xpathLocator).each(($el) => {
        const elementText = $el.text().trim();
        const normalizedElementText = normalizeNumber(elementText);

        // Compare the normalized texts
        if (normalizedElementText === normalizedNumberToCompare) {
            cy.log(`Match found: ${elementText}`);
            matchFound = true;
        } else {
            cy.log(`No match for: ${elementText}`);
        }
    }).then(() => {
        // Assert that at least one match was found
        expect(matchFound, `Returning to Stage Successfully "${numberToCompare}"`).to.be.true;
    });
});
Cypress.Commands.add('clickLinkWithTextInTopArea', (expectedText) => {
    let found = false;

    cy.get("div.top-area a").each(($el, index) => {
        const text = $el.text().trim();
        if (text.includes(expectedText)) {
            found = true;
            const href = $el.attr('href');
            cy.log(`✅ Found and clicking link with text "${text}" and href "${href}"`);
            cy.wrap($el).click();
            return false; // exit loop
        } else {
            cy.log(`⛔ Link at index ${index} with text "${text}" did not match.`);
        }
    }).then(() => {
        if (!found) {
            throw new Error(`❌ No link in 'div.top-area a' contained the expected text: "${expectedText}"`);
        }
    });
});
Cypress.Commands.add('clickIfTextMatchedXpath', (selector, expectedText) => {
    const isXPath = selector.trim().startsWith('//') || selector.trim().startsWith('.//');
    let matchFound = false;

    const getElements = () => isXPath ? cy.xpath(selector) : cy.get(selector);

    getElements().each(($el, index) => {
        const actualText = $el.text().trim();
        cy.log(`🔍 Element at index ${index} has text: "${actualText}"`);

        if (actualText === expectedText) {
            matchFound = true;
            cy.wrap($el).scrollIntoView().click({ force: true });
            cy.log(`✅ Clicked on element at index ${index} with text: "${actualText}"`);
            return false; // stop iteration
        }
    }).then(() => {
        if (!matchFound) {
            throw new Error(`❌ No element with selector "${selector}" matched the expected text "${expectedText}".`);
        }
    });
});

Cypress.Commands.add('clickIfTextMatched', (selector, expectedText) => {
    let matchFound = false;

    cy.get(selector).each(($el, index, $list) => {
        const actualText = $el.text().trim();
        cy.log(`✅ Clicked on element at index ${index} with text: "${actualText}".`);
        if (actualText.includes(expectedText)) {
            matchFound = true;
            cy.wrap($el).scrollIntoView().click();
            cy.log(`✅ Clicked on element at index ${index} with text: "${actualText}".`);
            return false; // stop iteration once clicked
        } else {
           // throw new Error(`❌ No element with selector "${selector}" contained the expected text "${expectedText}".`);
        }
    }).then(() => {
        if (!matchFound) {
            throw new Error(`❌ No element with selector "${selector}" contained the expected text "${expectedText}".`);
        }
    });
});
Cypress.Commands.add('typeOrFail', (selector, value, errorMessage) => {
    cy.get(selector)
        .clear()
        .type(value)
        .should('have.value', value)
        .then($el => {
            const actualValue = $el.val();
            if (actualValue !== value) {
                throw new Error(errorMessage || `❌ Expected value "${value}" was not typed correctly.`);
            } else {
                cy.log(`✅ Successfully typed "${value}" into ${selector}`);
            }
        });
});

Cypress.Commands.add('clickIfTextMatches', (selector, expectedText) => {
    let matchFound = false;

    cy.get(selector).each(($el, index, $list) => {
        const actualText = $el.text().trim();
        if (actualText.includes(expectedText)) {
            matchFound = true;
            cy.wrap($el).scrollIntoView().click();
            cy.log(`✅ Clicked on element at index ${index} with text: "${actualText}".`);
            return false; // stop iteration once clicked
        } else {
            cy.log(`⛔ Element at index ${index} has text "${actualText}", which does not contain expected "${expectedText}".`);
        }
    }).then(() => {
        if (!matchFound) {
            throw new Error(`❌ No element with selector "${selector}" contained the expected text "${expectedText}".`);
        }
    });
});
Cypress.Commands.add('clickIfTextMatchesOtherWiseFail', (selector, expectedText) => {
    cy.get(selector).filter((index, el) => {
        return Cypress.$(el).text().trim().includes(expectedText);
    }).then($filtered => {
        if ($filtered.length > 0) {
            cy.wrap($filtered[0]).scrollIntoView().click();
            cy.log(`✅ Clicked on element with text: "${$filtered[0].innerText.trim()}"`);
        } else {
            throw new Error(`❌ No element with selector "${selector}" contained the expected text "${expectedText}".`);
        }
    });
});
Cypress.Commands.add('clickIfTextMatchesScroll', (selector, expectedText) => {
    let found = false;

    cy.get(selector).each(($el, index, $list) => {
        const actualText = $el.text().trim();
        if (actualText.includes(expectedText)) {
            found = true;
            cy.wrap($el)
                .scrollIntoView({ block: 'center', inline: 'center', duration: 500, easing: 'linear' })
                .click()
                .then(() => {
                    cy.log(`Clicked on element at index ${index} with text: "${actualText}".`);
                });
            return false; // Exit the each loop after clicking
        } else {
            cy.log(`Element at index ${index} has text "${actualText}", which does not contain expected "${expectedText}".`);
        }
    }).then(() => {
        if (!found) {
            throw new Error(`No element found with text containing "${expectedText}".`);
        }
    });
});

Cypress.Commands.add('pressEnterIfTextMatchesScroll', (selector, expectedText) => {
    let found = false;

    cy.get(selector).each(($el, index) => {
        const actualText = $el.text().trim();
        if (actualText.includes(expectedText)) {
            found = true;
            cy.wrap($el)
                .scrollIntoView({ block: 'center', inline: 'center', duration: 500, easing: 'linear' })

                .type('{enter}')
                .then(() => {
                    cy.log(`Pressed Enter on element at index ${index} with text: "${actualText}".`);
                });
            return false; // Exit the each loop after pressing Enter
        } else {
            cy.log(`Element at index ${index} has text "${actualText}", which does not contain expected "${expectedText}".`);
        }
    }).then(() => {
        if (!found) {
            throw new Error(`No element found with text containing "${expectedText}".`);
        }
    });
});





// cypress/support/commands.ts
// cypress/support/commands.js
// cypress/support/commands.ts
//import '@cypress-audit/commands';

// Ensure this command is loaded globally
// Cypress.Commands.add('runLighthouse', () => {
//   cy.lighthouse();
// });

// cypress/support/commands.js

// cypress/support/commands.js

// Cypress.Commands.add('checkApiFailures', () => {
//   // Intercept all network requests
//   cy.intercept('**').as('allRequests');
//
//   // Perform actions that will trigger API requests
//   cy.then(() => {
//     // Wait for requests and check their status
//     cy.wait('@allRequests').then((interceptions) => {
//       interceptions.forEach((interception) => {
//         if (interception.response.statusCode >= 400) {
//           // Log the details of the failed API request
//           const { method, url } = interception.request;
//           const { statusCode, body } = interception.response;
//           const errorMessage = `API request failed: ${method} ${url} with status ${statusCode}. Response body: ${JSON.stringify(body)}`;
//
//           // Log the error message to Cypress
//           cy.log(errorMessage);
//
//           // Throw an error to fail the test with the detailed message
//           throw new Error(errorMessage);
//         }
//       });
//     });
//   });
// });
// cypress/support/commands.js

//cypress/support/commands.js

// Cypress.Commands.add('checkApiFailures', () => {
//     // Intercept all network requests
//     cy.intercept('**', (req) => {
//         req.on('response', (res) => {
//             if (res.statusCode >= 400) {
//                 // Log the details of the failed API request
//                 const { method, url } = req;
//                 const { statusCode, body } = res;
//                 const errorMessage = `API request failed: ${method} ${url} with status ${statusCode}. Response body: ${JSON.stringify(body)}`;

//                 // Log the error message to Cypress
//                 cy.log(errorMessage);

//                 // Fail the test by throwing an error
//                 throw new Error(errorMessage);
//             }
//         });
//     }).as('allRequests');

//     // Wait for a reasonable amount of time for requests
//     cy.wait('@allRequests', { timeout: 10000 }).then((interceptions) => {
//         // Handle cases where no requests are made
//         if (!interceptions || interceptions.length === 0) {
//             cy.log('No API requests were made');
//             return;
//         }

//         interceptions.forEach((interception) => {
//             if (interception.response.statusCode >= 400) {
//                 // Log the details of the failed API request
//                 const { method, url } = interception.request;
//                 const { statusCode, body } = interception.response;
//                 const errorMessage = `API request failed: ${method} ${url} with status ${statusCode}. Response body: ${JSON.stringify(body)}`;

//                 // Log the error message to Cypress
//                 cy.log(errorMessage);

//                 // Fail the test by throwing an error
//                 throw new Error(errorMessage);
//             }
//         });
//     });
// });

Cypress.Commands.add('saveNetworkFails', () => {
    const networkFails = [];

    cy.intercept('*', (request) => {
        request.continue((response) => {
            if (response.statusMessage !== 'OK') {
                networkFails.push({ request, response });
            }
        });
    }).as('allRequests');

    return cy.wait('@allRequests').then(() => {
        cy.writeFile('cypress/fixtures/networkFails.json', networkFails);
    });
});
Cypress.on('command:complete', (command) => {
    if (command.get('name') !== 'saveNetworkFails') {
        cy.saveNetworkFails();
    }
})
Cypress.Commands.add('getRandomArabicText', () => {
    const arabicWords = [
        'مرحبا',    // 5 characters
        'اختبار',   // 7 characters
        'عربي',     // 4 characters
        'نص',       // 3 characters
        'عشوائي',   // 6 characters
        'كتابة',    // 5 characters
        'قلم',      // 3 characters
        'مفكرة',    // 6 characters
        'كتاب',     // 4 characters
        'ورقة',     // 4 characters
        'مدينة',    // 5 characters
        'صديق',     // 5 characters
        'طاولة',    // 6 characters
        'قهوة',     // 4 characters
        'دراجة',    // 5 characters
        'مفتاح',    // 6 characters
        'هاتف',     // 4 characters
        'نافذة',    // 5 characters
        'كهرباء',   // 7 characters
        'زهرة'      // 4 characters
    ];
    const randomIndex = Math.floor(Math.random() * arabicWords.length);
    return arabicWords[randomIndex];
});
Cypress.Commands.add('waitForElementToBeVisibleMsg', (selector,Error) => {
    cy.waitUntil(() =>
            cy.get('body').then(($body) => {
                if ($body.find(selector).length > 0) {
                    return cy.get(selector).should('be.visible'); // Return true if visible
                }
                return false; // Keep retrying if element is not found
            }),
        {
            errorMsg: Error, // Custom error message
            timeout: 40000, // Maximum time to wait (15 seconds)
            interval: 500 // Retry every 500 milliseconds
        });
});
Cypress.Commands.add('randomClickFromListXpathStatus', (status) => {
    const xpath = `//div[@class='status-col']//div[text()='${status}']/following-sibling::div[@class='threedots']`;

    cy.xpath(xpath).then(($elements) => {
        if ($elements.length) {
            const randomIndex = Math.floor(Math.random() * $elements.length);
            cy.wrap($elements[randomIndex]).click();
        } else {
            throw new Error(`No elements found for status: ${status}`);
        }
    });
});

Cypress.Commands.add('waitForElementToBeVisibleMsgScroll', (selector,Error) => {
    cy.waitUntil(() =>
            cy.get('body').then(($body) => {
                if ($body.find(selector).length > 0) {
                    return cy.get(selector).scrollIntoView().should('be.visible'); // Return true if visible
                }
                return false; // Keep retrying if element is not found
            }),
        {
            errorMsg: Error, // Custom error message
            timeout: 40000, // Maximum time to wait (15 seconds)
            interval: 500 // Retry every 500 milliseconds
        });
});
Cypress.Commands.add('waitForElementToNotBeVisibleMsg', (selector, error) => {
    cy.waitUntil(() =>
            cy.get('body').then(($body) => {
                const exists = $body.find(selector).length > 0;

                if (exists) {
                    // Element still exists — FAIL immediately
                    throw new Error(error);
                } else {
                    // Element not found — PASS
                    return true;
                }
            }),
        {
            errorMsg: error,    // Custom error message if waitUntil retries run out
            timeout: 40000,     // Wait up to 40s
            interval: 500       // Retry every 500ms
        }
    );
});



Cypress.Commands.add('waitForElementToBeVisibleMsgXpath', (xpathSelector, errorMsg) => {
    cy.waitUntil(() =>
            cy.xpath(xpathSelector).then(($el) => {
                if ($el.length > 0) {
                    return cy.wrap($el).should('be.visible'); // Check if the element is visible
                }
                return false; // Retry if the element is not found
            }),
        {
            errorMsg: errorMsg, // Custom error message
            timeout: 40000, // Maximum time to wait (40 seconds)
            interval: 500 // Retry every 500 milliseconds
        }
    );
});

Cypress.Commands.add('waitForSpinnerToDisappear', (selector = 'mat-spinner', timeout = 30000, interval = 500) => {
    cy.waitUntil(() =>
            cy.get('body').then(($body) => {
                return $body.find(selector).length === 0;  // Check if the spinner no longer exists
            }),
        {
            timeout: timeout,
            interval: interval,
            errorMsg: 'Spinner did not disappear within the timeout period'
        }
    );
});
Cypress.Commands.add('selectDropdownOption', (dropdownSelector, optionText) => {
    // Click the dropdown to open the options
    cy.get(dropdownSelector).click();

    // Find the dropdown options and select the one that matches the text
    cy.get('mat-option span').contains(optionText).click();
});
Cypress.Commands.add('selectDropdownOptionNew', (dropdownSelector, optionText) => {


    // Find the dropdown options and select the one that matches the text
    cy.get(dropdownSelector).contains(optionText).click();
});
Cypress.Commands.add('waitForElementToBeVisible', (selector) => {
    cy.waitUntil(() =>
            cy.get('body').then(($body) => {
                if ($body.find(selector).length > 0) {
                    return cy.get(selector).should('be.visible'); // Return true if visible
                }
                return false; // Keep retrying if element is not found
            }),
        {
            errorMsg: `Element with selector "${selector}" not found or not visible`, // Custom error message
            timeout: 15000, // Maximum time to wait (15 seconds)
            interval: 500 // Retry every 500 milliseconds
        });
});
Cypress.Commands.add('enterPhoneNumber', (locator, phoneNumber) => {
    // Validate that the input is numeric
    if (!/^\d+$/.test(phoneNumber)) {
        throw new Error('Phone number must contain only numeric values.');
    }

    // Enter the phone number into the input field using the provided locator
    cy.get(locator).clear().type(phoneNumber);
});
Cypress.Commands.add('clickAllButFirstTwo', (selector) => {
    cy.get(selector).then(($elements) => {
        if ($elements.length <= 2) {
            throw new Error(`❌ Not enough elements to click. Selector "${selector}" returned ${$elements.length} element(s).`);
        }

        for (let i = 2; i < $elements.length; i++) {
            cy.wrap($elements[i])
                .scrollIntoView()
                .click({ force: true })
                .then(() => {
                    cy.log(`✅ Clicked element ${i} with selector "${selector}".`);
                });
        }
    });
});
Cypress.Commands.add('clickRandomSubset', (selector) => {
    cy.get(selector).then(($elements) => {
        const total = $elements.length;

        if (total <= 1) {
            throw new Error(`❌ Not enough elements found to click randomly. Found: ${total}`);
        }

        const numberToClick = Math.floor(Math.random() * (total - 1)) + 1; // At least 1, less than total
        cy.log(`🎯 Randomly clicking on ${numberToClick} of ${total} elements`);

        const indices = Array.from({ length: total }, (_, i) => i);
        const shuffled = indices.sort(() => 0.5 - Math.random());
        const toClick = shuffled.slice(0, numberToClick);

        toClick.forEach((index) => {
            cy.wrap($elements[index]).scrollIntoView().click({ force: true });
        });
    });
});

Cypress.Commands.add('clickButton', (locator) => {
    cy.get('body').then(($body) => {
        // Check if the button exists in the DOM
        if ($body.find(locator).length > 0) {
            // Click on the button
            cy.get(locator).scrollIntoView().click().then(() => {
                cy.log('Button clicked successfully');
            });
        } else {
            // If the button does not exist, throw a custom error
            throw new Error(`Button with locator "${locator}" not found`);
        }
    });
});
Cypress.Commands.add('clickButtonIndexXpath', (locator, index) => {
    const isXPath = locator.trim().startsWith('//') || locator.trim().startsWith('.//');
    const getElements = () => isXPath ? cy.xpath(locator) : cy.get(locator);

    cy.document().then((doc) => {
        const elements = isXPath
            ? Cypress.$(Cypress.$(doc.evaluate(locator, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)).toArray())
            : Cypress.$(doc).find(locator);

        if (elements.length === 0) {
            throw new Error(`❌ No elements found for locator "${locator}".`);
        }

        if (index >= elements.length) {
            cy.log(index,"index..........................")
            throw new Error(`❌ Index ${index} is out of bounds. Only ${elements.length} element(s) found for "${locator}".`);
        }

        getElements().eq(index).scrollIntoView().click().then(() => {
            cy.log(`✅ Button with locator "${locator}" at index ${index} clicked successfully`);
        });
    });
});

Cypress.Commands.add('clickButtonIndex', (locator, index) => {
    cy.get('body').then(($body) => {
        const elements = $body.find(locator);

        if (elements.length > 0) {
            if (index >= elements.length) {
                throw new Error(`Index ${index} is out of bounds. Only ${elements.length} element(s) found for "${locator}".`);
            }

            cy.get(locator).eq(index).scrollIntoView().click().then(() => {
                cy.log(`Button with locator "${locator}" at index ${index} clicked successfully`);
            });
        } else {
            throw new Error(`Button with locator "${locator}" not found`);
        }
    });
});
Cypress.Commands.add('typeInLastTextField', (locator, text) => {
    cy.get('body').then(($body) => {
        const elements = $body.find(locator);

        if (elements.length > 0) {
            cy.get(locator).last().scrollIntoView().clear().type(text).then(() => {
                cy.log(`Typed "${text}" in the last element with locator "${locator}"`);
            });
        } else {
            throw new Error(`Element with locator "${locator}" not found`);
        }
    });
});
Cypress.Commands.add('typeInFieldByIndex', (locator, index, text) => {
    cy.get('body').then(($body) => {
        const elements = $body.find(locator);

        if (elements.length > 0) {
            if (index >= elements.length) {
                throw new Error(`Index ${index} is out of bounds. Only ${elements.length} element(s) found for "${locator}".`);
            }

            cy.get(locator).eq(index).scrollIntoView().clear().type(text).then(() => {
                cy.log(`Typed "${text}" in element with locator "${locator}" at index ${index}`);
            });
        } else {
            throw new Error(`Element with locator "${locator}" not found`);
        }
    });
});

Cypress.Commands.add('enterPassword', (locator, password) => {
    // Ensure password is within allowed length (adjust limits as needed)
    if (password.length < 6 || password.length > 20) {
        throw new Error('Password must be between 6 and 20 characters long.');
    }

    // Enter the valid password into the input field using the provided locator
    cy.get(locator).clear().type(password);
});
Cypress.Commands.add('waitForSpinnerToDisappear', (selector = 'mat-spinner', timeout = 30000, interval = 500) => {
    cy.waitUntil(() =>
            cy.get('body').then(($body) => {
                return $body.find(selector).length === 0;  // Check if the spinner no longer exists
            }),
        {
            timeout: timeout,
            interval: interval,
            errorMsg: 'Spinner did not disappear within the timeout period'
        }
    );
});
Cypress.Commands.add('verifyButtonState', (selector, expectedState) => {
    // Check if the selector is valid and the button exists
    cy.get(selector).then((button) => {
        if (expectedState === 'enabled') {
            // Check if the button is not disabled
            if (button.is(':disabled')) {
                // Log error if button is disabled but expected to be enabled
                throw new Error(`Expected button to be enabled, but it is disabled.`);
            } else {
                cy.log('Button is enabled.');
            }
        } else if (expectedState === 'disabled') {
            // Check if the button is disabled
            if (!button.is(':disabled')) {
                // Log error if button is enabled but expected to be disabled
                throw new Error(`Expected button to be disabled, but it is enabled.`);
            } else {
                cy.log('Button is disabled.');
            }
        } else {
            throw new Error('Expected state must be "enabled" or "disabled".');
        }
    });
});
Cypress.Commands.add('searchByAppNumberAndName', () => {
    // Locators
    const searchBox = '//input[@placeholder="Search"]';
    const appNumberLocator = '(//div[contains(@class,"description")]//div[last()])[last()]'; // Application number
    const appNameLocator = '(//div[contains(@class,"name")]//div[last()])[last()]'; // Application name
    const progressBar = "div[class='ng-progress-bar'][active='true']";

    // Step 1: Wait for progress bar to disappear
    cy.get(progressBar).should("not.exist");

    // Step 2: Retrieve the first application number
    cy.xpath(appNumberLocator).invoke('text').then((appNumber) => {
        const trimmedAppNumber = appNumber.trim();
        cy.log(`Application Number Retrieved: ${trimmedAppNumber}`);

        // Step 3: Search the application number
        cy.xpath(searchBox).clear().type(trimmedAppNumber);
        cy.get(progressBar).should("not.exist");

        // Step 4: Verify the results for the application number
        cy.xpath(appNumberLocator).should('exist').then(() => {
            cy.log(`Search results exist for Application Number: ${trimmedAppNumber}`);
        });
    });

    // Step 5: Retrieve the first application name
    cy.xpath(appNameLocator).invoke('text').then((appName) => {
        const trimmedAppName = appName.trim();
        cy.log(`Application Name Retrieved: ${trimmedAppName}`);

        // Step 6: Search the application name
        cy.xpath(searchBox).clear().type(trimmedAppName);
        cy.get(progressBar).should("not.exist");

        // Step 7: Verify the results for the application name
        cy.xpath(appNameLocator).should('exist').then(() => {
            cy.log(`Search results exist for Application Name: ${trimmedAppName}`);
        });
    });
});


Cypress.Commands.add('searchApplicationByNumberAndName', ({
                                                              appNumberSelector,
                                                              appNameSelector,
                                                              searchButtonSelector,
                                                              searchResultsSelector,
                                                              resultNumberSelector,
                                                              resultNameSelector,
                                                              resultValidationCallback,
                                                              useXPath = false // Optional flag to decide whether to use XPath or CSS
                                                          }) => {
    const getSelector = (selector) => {
        return useXPath ? cy.xpath(selector) : cy.get(selector);
    };

    // Step 1: Trigger a search by clicking the search button
    getSelector(searchButtonSelector).click();
    cy.log(`Clicked search button: ${searchButtonSelector}`);

    // Wait for the progress bar to disappear before interacting with the results
    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");

    // Step 2: Wait for search results to load
    getSelector(searchResultsSelector).should('be.visible');
    cy.log('Search results loaded.');

    // Step 3: Retrieve the first application number and name from the results
    let appNumber, appName;

    if (useXPath) {
        // Using XPath to get the application number and name directly
        cy.xpath(resultNumberSelector).first().invoke('text').then((number) => {
            appNumber = number.trim();
            cy.log(`Retrieved Application Number: ${appNumber}`);

            // Now retrieve the application name
            cy.xpath(resultNameSelector).first().invoke('text').then((name) => {
                appName = name.trim();
                cy.log(`Retrieved Application Name: ${appName}`);

                // Step 4: Clear only the search input field (//input[@placeholder="Search"])
                cy.xpath('//input[@placeholder="Search"]').clear();

                // Enter the application number
                getSelector(appNumberSelector).type(appNumber);
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                cy.log(`Searching with Application Number: ${appNumber}`);

                // Trigger the search by clicking the search button
                getSelector(searchButtonSelector).click();
                cy.log(`Clicked search button for Application Number: ${searchButtonSelector}`);

                // Wait for results to load
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                getSelector(searchResultsSelector).should('be.visible');
                cy.log(`Search results visible for Application Number: ${appNumber}`);

                // Optional validation callback for application number search
                if (resultValidationCallback) {
                    resultValidationCallback();
                }

                // Step 5: Clear only the search input field (//input[@placeholder="Search"])
                cy.xpath('//input[@placeholder="Search"]').clear();

                // Enter the application name
                getSelector(appNameSelector).type(appName);
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                cy.log(`Searching with Application Name: ${appName}`);

                // Trigger the search by clicking the search button
                getSelector(searchButtonSelector).click();
                cy.log(`Clicked search button for Application Name: ${searchButtonSelector}`);

                // Wait for results to load
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                getSelector(searchResultsSelector).should('be.visible');
                cy.log(`Search results visible for Application Name: ${appName}`);

                // Optional validation callback for application name search
                if (resultValidationCallback) {
                    resultValidationCallback();
                }
            });
        });
    } else {
        // Non-XPath (CSS) version
        getSelector(resultNumberSelector).first().invoke('text').then((number) => {
            appNumber = number.trim();
            cy.log(`Retrieved Application Number: ${appNumber}`);

            // Now retrieve the application name
            getSelector(resultNameSelector).first().invoke('text').then((name) => {
                appName = name.trim();
                cy.log(`Retrieved Application Name: ${appName}`);

                // Clear only the search input field (//input[@placeholder="Search"])
                cy.xpath('//input[@placeholder="Search"]').clear();

                // Enter the application number
                getSelector(appNumberSelector).type(appNumber);
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                cy.log(`Searching with Application Number: ${appNumber}`);

                getSelector(searchButtonSelector).click();
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                getSelector(searchResultsSelector).should('be.visible');

                if (resultValidationCallback) {
                    resultValidationCallback();
                }

                // Clear only the search input field (//input[@placeholder="Search"])
                cy.xpath('//input[@placeholder="Search"]').clear();

                // Enter the application name
                getSelector(appNameSelector).type(appName);
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");

                getSelector(searchButtonSelector).click();
                cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
                getSelector(searchResultsSelector).should('be.visible');

                if (resultValidationCallback) {
                    resultValidationCallback();
                }
            });
        });
    }
});


Cypress.Commands.add('checkTextAndIndexNotFound', (parentSelector, textToMatch, indexToCheck, customSuccessMessage) => {
    // Get the list of elements that match the parent selector
    cy.get(parentSelector).eq(indexToCheck).then((element) => {
        // Get the text of the element at the specified index
        const actualText = element.text().trim();
        cy.log("Text to match:", textToMatch);
        cy.log("Actual text found:", actualText);

        // Check if the actual text does NOT match the expected text
        if (actualText !== textToMatch) {
            // If the text doesn't match, log success with the custom success message
            cy.log(`${customSuccessMessage} (Text: "${actualText}", Index: ${indexToCheck})`);
        } else {
            // If it matches, log a failure message (or take any action if required)
            cy.log(`Text "${textToMatch}" was found at index ${indexToCheck}, but was expected to be different.`);
            throw new Error(`Text match failure at index ${indexToCheck}: Expected not to match "${textToMatch}", but found it.`);
        }
    });
});

Cypress.Commands.add('checkTextAndIndex', (parentSelector, textToMatch, indexToCheck, customErrorMessage) => {
    // Get the list of elements that match the parent selector
    cy.get(parentSelector).eq(indexToCheck).then((element) => {
        // Get the text of the element at the specified index
        const actualText = element.text().trim();
        cy.log("text to match.......",textToMatch)
        cy.log("Actual text to match.......",actualText)
        // Check if the actual text matches the expected text
        if (actualText !== textToMatch) {
            // If the text doesn't match, throw an error with the custom message
            throw new Error(`${customErrorMessage} (Expected: "${textToMatch}", Actual: "${actualText}", Index: ${indexToCheck})`);
        } else {
            // If it matches, log success
            cy.log(`Text "${textToMatch}" matched at index ${indexToCheck}`);
        }
    });
});
// In cypress/support/commands_cross_origin.js (or any custom command file)

Cypress.Commands.add('originVerifyTextInElements', (selector, expectedText) => {
    cy.origin('https://esp-stemexe-qa.azurewebsites.net', { args: [selector, expectedText] }, (selector, expectedText) => {
        let foundMatch = false;

        cy.get(selector).each(($element) => {
            const actualText = $element.text().trim().toLowerCase();
            const expected = expectedText.toLowerCase();

            if (actualText === expected) {
                foundMatch = true;
            }
        }).then(() => {
            if (!foundMatch) {
                expect(foundMatch, `No elements matched the expected text: "${expectedText}"`).to.be.true;
            }
        });
    });
});
Cypress.Commands.add('generateRandomRequirementTitle', (selector, errorMessage) => {
    const actionVerbs = [ 'Create', 'Update', 'Delete', 'Verify', 'Configure', 'Optimize',
        'Implement', 'Enable', 'Disable', 'Review', 'Track', 'Generate' ];

    const subjects = [ 'user profile', 'dashboard metrics', 'login feature', 'notification system',
        'project settings', 'data export functionality', 'search results', 'API endpoint',
        'error logging', 'authentication flow', 'access permissions' ];

    const conditions = [ 'for admin users', 'with proper validation', 'using REST API',
        'under high load', 'on mobile view', 'for logged-in users only',
        'in production environment', 'with audit trail', 'for premium accounts' ];

    const verb = Cypress._.sample(actionVerbs);
    const subject = Cypress._.sample(subjects);
    const condition = Cypress._.sample(conditions);

    const sentence = `${verb} ${subject} ${condition}.`;

    cy.get(selector)
        .should('exist')
        .type(sentence)
        .should('have.value', sentence)
        .then(($el) => {
            const typedText = $el.val();
            if (typedText !== sentence) {
                throw new Error(errorMessage || `Failed to enter the requirement title. Expected: "${sentence}" but got: "${typedText}"`);
            }
        });

    // Save sentence for later use anywhere in the test run
    Cypress.env('requirementTitle', sentence);
});


Cypress.Commands.add('generateRandomRequirementDescription', (selector, errorMessage) => {
    const intros = [
        'This requirement focuses on', 'The purpose of this feature is to',
        'This functionality is intended to', 'We aim to',
        'This module is developed to'
    ];

    const details = [
        'improve overall system reliability', 'enhance user experience',
        'streamline business processes', 'reduce manual intervention',
        'provide better security controls', 'simplify configuration steps',
        'integrate third-party APIs', 'support cross-platform access'
    ];

    const benefits = [
        'resulting in better performance.', 'to ensure data consistency.',
        'while improving scalability.', 'to support future enhancements.',
        'with reduced operational cost.', 'to align with industry standards.'
    ];

    const intro = Cypress._.sample(intros);
    const detail = Cypress._.sample(details);
    const benefit = Cypress._.sample(benefits);

    const sentence = `${intro} ${detail} ${benefit}`;

    cy.get(selector)
        .should('exist')
        .clear()
        .type(sentence)
});

Cypress.Commands.add('verifyPageTitle', (expectedTitle) => {
    cy.title().should('eq', expectedTitle);
});
Cypress.Commands.add('clickLinkByTextInGrandparent', (targetText) => {
    const xpath = `//div[@class='text' and text()='${targetText}']/parent::div/parent::div//a`;

    cy.xpath(xpath).first().click(); // Click the first matching link
});
Cypress.Commands.add('clickIfTextMatchesIgnoreCase', (expectedText) => {
    cy.get("a.count-link-v2 div").each(($el, index) => {
        const actualText = $el.text().trim().toLowerCase();
        const expected = expectedText.trim().toLowerCase();

        if (actualText.includes(expected)) {
            cy.wrap($el).click();
            cy.log(`✅ Clicked on element at index ${index} with text: "${$el.text().trim()}"`);
            return false; // exit the `.each()` loop after clicking
        } else {
            cy.log(`❌ Skipped element at index ${index}: "${$el.text().trim()}"`);
        }
    }).then(($els) => {
        const matchFound = $els.toArray().some(el => el.textContent.trim().toLowerCase().includes(expectedText.trim().toLowerCase()));
        if (!matchFound) {
            throw new Error(`❌ No element found with text containing: "${expectedText}" (case-insensitive)`);
        }
    });
});
Cypress.Commands.add('goBackOrFail', () => {
    cy.url().then((initialUrl) => {
        cy.go('back');

        // Wait for navigation to complete
        cy.location('href').then((newUrl) => {
            if (newUrl === initialUrl) {
                throw new Error(`❌ Navigation back failed. URL did not change from "${initialUrl}".`);
            } else {
                cy.log(`✅ Successfully navigated back from "${initialUrl}" to "${newUrl}"`);
            }
        });
    });
});

Cypress.Commands.add('verifyTextInElements', (selector, expectedText) => {
    let foundMatch = false; // Flag to check if a match is found

    cy.get(selector).each(($element, index, $list) => {
        const actualText = $element.text().trim().toLowerCase();
        const expected = expectedText.toLowerCase();

        // Check if there's a match
        if (actualText === expected) {
            foundMatch = true; // Set flag to true if a match is found
        }
    }).then(() => {
        // Fail the test if no element matches
        if (foundMatch==false) {
            expect(foundMatch, `No elements matched the expected text: "${expectedText}"`).to.be.true;
        }
    });
});
Cypress.Commands.add('verifyTextInElement', (selector, expectedText) => {
    cy.get(selector).then(($elements) => {
        const expected = expectedText.trim().toLowerCase();
        let foundMatch = false;

        $elements.each((index, el) => {
            const actualText = el.innerText.trim().toLowerCase();
            if (actualText === expected) {
                foundMatch = true;
            }
        });

        // Assert after checking all elements
        expect(foundMatch, `No elements matched the expected text: "${expectedText}"`).to.be.true;
    });
});
Cypress.Commands.add('waitForAndClickByTextChild', (parentSelector, textToFind, childSelector) => {
    // Wait for the parent element to contain the specified text
    cy.get(parentSelector).contains(textToFind).then((parentElement) => {
        // Once parent element is found, find the child element based on the childSelector and click on it
        cy.wrap(parentElement)
            .find(childSelector)
            .click();
    });
});
Cypress.Commands.add('waitForAndClickByChildIndex', (childSelector, childIndex) => {
    // Find the child elements and click on the one at the specified index
    cy.get(childSelector)
        .eq(childIndex)   // Select child element at the specified index
        .click();
});
Cypress.Commands.add('clickIfTextMatchesIcon', (selector, textToMatch) => {
    // Determine if the selector is an XPath or CSS
    const isXPath = selector.startsWith('//') || selector.startsWith('(');

    // If it's XPath, use cy.xpath, otherwise use cy.get for CSS
    const getElement = isXPath ? cy.xpath(selector) : cy.get(selector);

    getElement.then((element) => {
        // Check if the text matches the expected text
        const actualText = element.text().trim();
        cy.log("Log Text..................change actual",actualText)
        cy.log("Log Text..................change text match",textToMatch)
        if (actualText === textToMatch) {
            // If the text matches, click the element
            cy.wrap(element).click();
            cy.log(`Text matched: "${textToMatch}". Icon clicked.`);
        } else {
            // If the text doesn't match, log a message
            cy.log(`Text did not match. Already clicked or irrelevant action.`);
            console.log(`Text did not match. Expected: "${textToMatch}", Actual: "${actualText}"`);
        }
    });
});
Cypress.Commands.add('clickUntilMatch', (statusSelector, buttonSelector, targetText) => {
    function getElement(selector) {
        if (selector.startsWith('//') || selector.startsWith('(')) {
            return cy.xpath(selector); // XPath support
        } else {
            return cy.get(selector); // CSS support
        }
    }

    function attemptClick() {
        cy.wait(3000);
        getElement(statusSelector).click();

        getElement(buttonSelector, { timeout: 5000 }).then(($buttons) => {
            let matchFound = false;

            Cypress._.forEach($buttons, (button) => {
                const buttonText = button.innerText.trim();

                // Click the button always
                cy.wrap(button).click();

                if (buttonText === targetText) {
                    matchFound = true; // Found the target
                    return false; // Break out of forEach early
                }
            });

            if (!matchFound) {
                cy.wait(1000).then(() => {
                    attemptClick(); // Retry if not matched
                });
            }
        });
    }

    attemptClick();
});



Cypress.Commands.add('waitForAndClickByText', (selector, expectedText) => {
    // Wait for the list of elements to appear and verify it contains at least one element
    cy.get(selector, { timeout: 30000 }).should('exist').then(($elements) => {
        if ($elements.length === 0) {
            throw new Error('No group exists. There must be at least one group or join another group.');
        }

        // If elements are found, iterate over them and look for the matching text
        cy.wrap($elements).each(($el, index) => {
            const actualText = $el.text().trim(); // Get the text of each element and trim whitespace

            // Compare the text of each element with the expected text
            if (actualText === expectedText) {
                cy.wrap($el).click();  // Click the element if the text matches
                cy.log(`Clicked on element at index ${index} with text: "${actualText}".`);
                return false;  // Exit the loop after clicking the matching element
            }
        }).then(() => {
            cy.log(`No match found for text: "${expectedText}".`);  // Log if no match is found
        });
    });
});
Cypress.Commands.add('waitForAndClickByTextScroll', (selector, expectedText) => {
    // Wait for the list of elements to appear and verify it contains at least one element
    cy.get(selector, { timeout: 30000 }).should('exist').then(($elements) => {
        if ($elements.length === 0) {
            throw new Error('No group exists. There must be at least one group or join another group.');
        }

        // If elements are found, iterate over them and look for the matching text
        cy.wrap($elements).each(($el, index) => {
            const actualText = $el.text().trim(); // Get the text of each element and trim whitespace

            // Compare the text of each element with the expected text
            if (actualText === expectedText) {
                cy.wrap($el).scrollIntoView().click();  // Scroll into view before clicking
                cy.log(`Clicked on element at index ${index} with text: "${actualText}".`);
                return false;  // Exit the loop after clicking the matching element
            }
        }).then(() => {
            cy.log(`No match found for text: "${expectedText}".`);  // Log if no match is found
        });
    });
});

Cypress.Commands.add('waitForAndClickByTextContains', (selector, expectedText) => {
    // Wait for the list of elements to appear and verify it contains at least one element
    cy.get(selector, { timeout: 30000 }).should('exist').then(($elements) => {
        if ($elements.length === 0) {
            throw new Error('No group exists. There must be at least one group or join another group.');
        }

        // If elements are found, iterate over them and look for the text that includes the expected text
        cy.wrap($elements).each(($el, index) => {
            const actualText = $el.text().trim(); // Get the text of each element and trim whitespace

            // Check if the actual text contains the expected text
            if (actualText.includes(expectedText)) {
                cy.wrap($el).click();  // Click the element if the text contains the expected text
                cy.log(`Clicked on element at index ${index} with text: "${actualText}".`);
                return false;  // Exit the loop after clicking the matching element
            }
        }).then(() => {
            cy.log(`No match found that contains text: "${expectedText}".`);  // Log if no match is found
        });
    });
});

// Cypress.Commands.add('captureNetworkFailures', () => {
//     cy.intercept("**/**", (req) => {
//         req.continue((res) => {
//             if (res.statusCode >= 400) {
//                 console.log(res); // Log the failed response
//             }
//         });
//     }).as("myRequest");

//     return cy.wait("@myRequest").then((interceptions) => {
//         interceptions.forEach((interception) => {
//             if (interception.response.statusCode >= 400) {
//                 console.log(interception.response); // Log the failed response
//                 cy.log(interception.response); // You can also use cy.log() to log to Cypress test runner
//             }
//         });
//     });
// });
// Cypress.on('window:before:load', (win) => {
//   const originalConsoleError = win.console.error;
//   win.console.error = function(...args) {
//     originalConsoleError.apply(win.console, args);
//
//     const message = args.join(' ');
//     cy.task('logErrorToFile', { message });
//
//     cy.log('Console Error:', ...args);
//     cy.screenshot(`console-error-${Date.now()}`);
//   };
// });
//cypress/support/commands.js
// Cypress.Commands.add('lighthouse', (options = {}) => {
//   cy.url().then((url) => {
//     const lighthouseOptions = {
//       ...options,
//       url,
//       thresholds: {
//         performance: 50,
//         accessibility: 50,
//         'best-practices': 50,
//         seo: 50,
//         pwa: 50,
//       },
//     };
//     cy.task('lighthouse', lighthouseOptions);
//   });
// });

// Cypress.Commands.add('lighthouse', (options = {}) => {
//   cy.url().then((url) => {
//     const lighthouseOptions = {
//       ...options,
//       url,
//     };
//     cy.task('lighthouse', lighthouseOptions);
//   });
// });

// In support/commands.js or support/commands.ts
// Cypress.Commands.add('runLighthouseAudit', (options = {}) => {
//   cy.lighthouse(options)
//       .then((results) => {
//         // Handle successful Lighthouse audit
//         cy.log('Lighthouse audit completed:', results);
//
//         // Optionally, save or display the audit report
//         if (results && results.report) {
//           cy.writeFile('lighthouse-report.json', results.report);
//         }
//       })
//       .catch((error) => {
//         // Handle errors during Lighthouse audit
//         cy.log('Error during Lighthouse audit:', error);
//         throw error; // Throw the error to fail the test if needed
//       });
// });
// cypress/support/commands.js

// cypress/support/commands.js

// cypress/support/commands.js
Cypress.Commands.add('selectRandomLookupValue', () => {
    const firstElementSelector = '//div[contains(@class,"mat-form-field-infix")]//mat-select//div//span[text()="Value"]'; // XPath for first element
    const optionsSelector = '//span[@class="mat-option-text"]'; // XPath for options

    return cy.xpath(firstElementSelector).then(($firstElements) => {
        if ($firstElements.length === 0) {
            cy.log('No more first elements to select. Stopping recursion.');
            return cy.wrap(0); // Wrap the value in cy.wrap() to keep it asynchronous
        }

        // If there's only one element, process it and stop
        if ($firstElements.length === 1) {
            cy.log('Only one first element left. Processing and stopping.');
            cy.wrap($firstElements[0]).scrollIntoView().click({ force: true });

            return cy.xpath(optionsSelector).then(($options) => {
                const optionsLength = $options.length;
                if (optionsLength > 0) {
                    let randomIndex;
                    let randomText;

                    // Loop to find a non-empty text option
                    do {
                        randomIndex = Math.floor(Math.random() * optionsLength);
                        randomText = $options.eq(randomIndex).text(); // Get the text of the random option
                    } while (!randomText.trim()); // Skip empty text options

                    cy.log('Selected option text: ' + randomText);

                    // Type the text of the selected option and press Enter
                    cy.get('input[aria-label=\'dropdown search\']').type(randomText);  // Type the random option text
                    cy.get('body').type('{enter}');    // Press Enter on the body to select

                    cy.wait(500);
                } else {
                    cy.log('No options available to select.');
                }

                return cy.wrap(1); // Return 1 after processing the last element, wrapped in cy.wrap()
            });
        }

        // Otherwise, process the first element and return the length
        return cy.wrap($firstElements[0]).scrollIntoView().click({ force: true }).then(() => {
            return cy.xpath(optionsSelector).then(($options) => {
                const optionsLength = $options.length;
                if (optionsLength > 0) {
                    let randomIndex;
                    let randomText;

                    // Loop to find a non-empty text option
                    do {
                        randomIndex = Math.floor(Math.random() * optionsLength);
                        randomText = $options.eq(randomIndex).text(); // Get the text of the random option
                    } while (!randomText.trim()); // Skip empty text options

                    cy.log('Selected option text: ' + randomText);

                    // Type the text of the selected option and press Enter
                    cy.get('input[aria-label=\'dropdown search\']').type(randomText);  // Type the random option text
                    cy.get('body').type('{enter}');    // Press Enter on the body to select

                    cy.wait(500);
                } else {
                    cy.log('No options available to select.');
                }

                return cy.wrap($firstElements.length); // Return the number of remaining elements wrapped in cy.wrap()
            });
        });
    });
});
Cypress.Commands.add('Log_In_Random', () => {
    // List of possible email addresses
    const emails = [
        'usamasohail29@mailinator.com',
        'usamasohail30@mailinator.com',
        'usamasohail31@mailinator.com',
        'usamasohail32@mailinator.com',
        'usamasohail35@mailinator.com'
    ];

    // Password for all accounts
    const pass = 'aaaaaa';

    // Pick a random email from the list
    const randomEmail = emails[Math.floor(Math.random() * emails.length)];

    // Log in with the selected random email and password
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(pass);
    cy.get('.mat-focus-indicator.gradient-btn').click();

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
});
Cypress.Commands.add('Log_In_Random_Prod', () => {
    // List of possible email addresses
    const emails = [
        'IslamKhan@mailinator.com',
        'natalia@mailinator.com',
        'def-test1@mailinator.com',
        'iqbalali@mailinator.com',
        'iqbalali@mailinator.com'
    ];

    // Password for all accounts
    const pass = 'aaaaaa';

    // Pick a random email from the list
    const randomEmail = emails[Math.floor(Math.random() * emails.length)];

    // Log in with the selected random email and password
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="email"]').type(randomEmail);
    cy.get('input[name="password"]').type(pass);
    cy.xpath("(//div[contains(@class,'snack-container')])[1]").should("not.exist")
    cy.get('.mat-focus-indicator.gradient-btn').click();

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
});
Cypress.Commands.add('checkFirstElementText', (elementSelector, expectedText) => {
    // Find the child elements within the body
    cy.get('body').within(() => {
        cy.get(elementSelector)
            .first() // Select the first element
            .then(($el) => {
                // Check if the text matches the expected value
                if ($el.text().trim() !== expectedText) {
                    throw new Error(`Text did not match! Expected "${expectedText}", but found "${$el.text().trim()}"`);
                } else {
                    cy.log('Text matches the expected value');
                }
            });
    });
});
Cypress.Commands.add('findTextInElementOrFail', (locator, expectedText, errorMessage) => {
    // Start from the 'body' and search for the element with the provided locator
    cy.get('body').find(locator, { timeout: 30000 }).should('exist').then(($element) => {
        const actualText = $element.text().trim(); // Get the text from the located element

        // Check if the actual text contains the expected text
        if (actualText.includes(expectedText)) {
            cy.log(`Text contains: "${expectedText}".`); // Log success if the text contains the expected text
        } else {
            // Fail the test with the custom error message provided from the parameter
            throw new Error(errorMessage);
        }
    });
});
Cypress.Commands.add('getTextsFromElements', (locator) => {
    const texts = []; // Initialize an empty array to store the text values

    // Get all the elements matched by the locator
    cy.get(locator).each(($el) => {
        // Push each element's text to the array
        texts.push($el.text().trim());
    }).then(() => {
        // Return the array of texts
        return texts;
    });
});


Cypress.Commands.add('clickFirstElement', (selector) => {
    cy.get('body').then(($body) => {
        // Check if the element exists in the DOM
        if ($body.find(selector).length > 0) {
            // If the element exists, click on the first element
            cy.get(selector).first().click();
        } else {
            // If no elements are found, throw an error
            throw new Error('No element exists, the list is empty.');
        }
    });
});
Cypress.Commands.add('getNumericFromText', (text) => {
    // Use a regular expression to remove all non-numeric characters
    const numericText = text.replace(/\D/g, ''); // \D matches any non-numeric character
    return numericText;
});
// Cypress.Commands.add to create a custom command 'ypress'
Cypress.Commands.add('uploadFile', (dataType) => {
    let fileName;
    let fileMimeType;

    if (dataType === '7') {
        // Upload a PDF for data-type='27'
        fileName = `sample${Math.floor(Math.random() * 5) + 1}.pdf`; // Assuming you have 5 PDF files (sample1.pdf to sample5.pdf)
        fileMimeType = 'application/pdf';
    } else {
        // Upload a JPG image for other data-types (e.g., data-type='7')
        fileName = `image${Math.floor(Math.random() * 5) + 1}.jpg`; // Assuming you have 5 images (image1.jpg to image5.jpg)
        fileMimeType = 'image/jpeg';
    }

    cy.fixture(fileName, 'base64').then(fileContent => {
        // Target the file input with the specific data-type value
        cy.get(`input[type="file"][data-type='${dataType}']`).attachFile({
            fileContent,
            fileName: fileName,
            encoding: 'base64',
            mimeType: fileMimeType
        });
    });
});

Cypress.Commands.add('fields', () => {
    cy.get('body').then(($body) => {
        // Check if elements with [data-type] exist
        if ($body.find("[data-type]").length === 0) {
            cy.log('No elements with data-type exist');
            return;  // Exit the function if no elements are found
        }

        // If elements with [data-type] are found, process them
        cy.get("[data-type]").each(($el) => {
            const dataType = $el.attr('data-type');

            switch (dataType) {
                case '1':
                    // Write random text for data-type='1'
                    cy.wrap($el).type('RandomText1');
                    break;
                case '2':
                    // Add random tag for data-type='2'
                    const randomTag = Math.floor(Math.random() * 100);
                    cy.wrap($el).type(randomTag);
                    break;
                case '3':
                    // Write random number for data-type='3'
                    const randomNum = Math.floor(Math.random() * 1000).toString();
                    cy.wrap($el).type(randomNum);
                    break;
                case '10':
                    // Write random email for data-type='10'
                    const randomEmail = `test${Math.random().toString(36).substring(2, 7)}@example.com`;
                    cy.wrap($el).type(randomEmail);
                    break;
                case '16':
                    // Write random phone number for data-type='16'
                    const randomPhoneNumber = `123456${Math.floor(Math.random() * 10000)}`;
                    cy.wrap($el).type(randomPhoneNumber);
                    break;
                case '11':
                    // Write random number for data-type='11'
                    const randomNumber = Math.floor(Math.random() * 1000).toString();
                    cy.wrap($el).type(randomNumber);
                    break;
                default:
                    // Log if an unknown data-type is encountered
                    cy.log(`No action defined for data-type='${dataType}'`);
                    break;
            }
        }).then(() => {
            cy.log('All elements with data-type processed');
        });
    });
});
// Add this custom command to your Cypress commands file (e.g., cypress/support/commands.js)
Cypress.Commands.add('shouldNotHaveText', (locator, text, errorMessage) => {
    cy.get('body') // Start from the body
        .find(locator) // Find the element by the locator passed
        .should('not.contain', text) // Assert the text should not be present
        .then(($el) => {
            if ($el.text().includes(text)) {
                throw new Error(errorMessage || `The text "${text}" was found in the locator "${locator}". Test failed.`);
            }
        });
});
Cypress.Commands.add('selectRandomTimeOption', () => {
    // Click on the time input field
    cy.get("input[formcontrolname='time']").click();

    // Check from the body and look for available time options
    cy.get('body').find("div[class='primary-text']").then($options => {
        if ($options.length > 0) {
            // Select a random option if options exist
            const randomIndex = Math.floor(Math.random() * $options.length);
            cy.wrap($options[randomIndex]).click();
        } else {
            // Throw an error if no options are found
            cy.log('No time options available');
            throw new Error('No time options available.');
        }
    });
});
Cypress.Commands.add('VerifyState', (parentSelector, childSelector, errorMessage) => {
    // Get the parent element first
    cy.get(parentSelector).then(($parent) => {
        // Use jQuery to find child elements within the parent
        const $elements = $parent.find(childSelector);

        if ($elements.length > 0) {
            // Elements found - proceed
            cy.log('Element(s) found. Proceeding...');
            // Add interaction logic here if needed
        } else {
            // No elements found - throw custom error
            cy.log('No elements found. Executing else block.');
            throw new Error(errorMessage || 'No elements found.');
        }
    });
});
Cypress.Commands.add('verifySortingByLastCreated', (locator, errorMessage = 'Sorting is not in descending order') => {
    // Check if the locator is an XPath by looking for '//' at the start
    const isXPath = locator.startsWith('//') || locator.startsWith('.//');
    cy.log(`Locator provided: ${locator}`);
    cy.log(`Is XPath: ${isXPath}`);

    // Select elements using either XPath or CSS selector
    const getElements = isXPath ? cy.xpath(locator) : cy.get(locator);

    // Now work with the elements
    getElements.then((elements) => {
        cy.log(`Number of elements found: ${elements.length}`);

        // Extract text content from each element and store in an array
        const listOfStrings = [...elements].map(el => el.innerText);
        cy.log('Extracted list of strings:', JSON.stringify(listOfStrings));

        // Use regex to extract numeric digits from the strings and convert them to numbers
        const numericValues = listOfStrings.map(str => {
            cy.log(`Processing string: ${str}`);
            const match = str.match(/\d+/g); // Find all numeric digits
            const numericValue = match ? parseInt(match.join(''), 10) : null; // Join digits and convert to number
            cy.log(`Extracted numeric value: ${numericValue}`);
            return numericValue;
        }).filter(value => value !== null); // Remove any null values if regex doesn't match

        // Log the list of extracted numeric values for debugging
        cy.log('List of numeric values (unsorted):', JSON.stringify(numericValues));

        // Create a sorted copy of the numeric values in descending order
        const sortedList = [...numericValues].sort((a, b) => b - a);
        cy.log('List of numeric values (sorted):', JSON.stringify(sortedList));

        // Check if the original numericValues are in descending order (sorted by last created)
        const isSorted = numericValues.every((val, i, arr) => {
            if (i > 0) {
                cy.log(`Checking if ${val} <= ${arr[i - 1]}`);
                return val <= arr[i - 1]; // Ensure current value is less than or equal to the previous one
            }
            return true; // Always return true for the first element
        });

        // If not sorted in descending order, throw an error with the custom error message
        if (!isSorted) {
            cy.log('Sorting check failed!');
            throw new Error(errorMessage);
        } else {
            cy.log('List is sorted by last created order (descending).');
        }
    });
});



Cypress.Commands.add('searchText', (searchTerm) => {
    // Check from the body if the search box exists
    cy.get('body').find('input[placeholder="Search"]').then($searchBox => {
        if ($searchBox.length > 0) {
            // If the search box exists, type the search term
            cy.wrap($searchBox).type(searchTerm);

        } else {
            // Throw an error if the search box does not exist
            cy.log('Search box does not exist');
            throw new Error('Search box does not exist.');
        }
    });
});

Cypress.Commands.add('convertTextToInt', (locator) => {
    cy.get(locator)
        .invoke('text') // Get the text from the element
        .then((text) => {
            const number = parseInt(text, 10); // Convert the string to an integer
            return number;
        });
});
Cypress.Commands.add('typeInLookupInput', (text) => {
    cy.get("input[placeholder*='Find look up']").click().type(text);
});

Cypress.Commands.add('selectRandomElement', (locator, errorMessage = 'No element found. Please check the locator.') => {
    cy.get('body').then(($body) => {
        // Check if the locator exists in the body
        if ($body.find(locator).length > 0) {
            // If elements exist, select one randomly
            cy.get(locator).then(($elements) => {
                const elementCount = $elements.length;

                if (elementCount > 0) {
                    const randomIndex = Math.floor(Math.random() * elementCount);
                    cy.wrap($elements[randomIndex]).click();
                } else {
                    throw new Error(errorMessage);
                }
            });
        } else {
            throw new Error(errorMessage);
        }
    });
});
Cypress.Commands.add('findAndMatchText', (locator, expectedText, errorMessage) => {
    // Start by checking the body for the given locator
    cy.get('body').then((body) => {
        // Check if the locator exists in the body
        if (body.find(locator).length > 0) {
            // If the locator exists, find the element and check its text
            cy.get(locator).should(($el) => {
                const actualText = $el.text().trim();
                if (actualText !== expectedText) {
                    throw new Error(errorMessage);  // Throw custom error if text does not match
                }
            });
        } else {
            throw new Error(`Locator '${locator}' not found in the body`);  // Throw error if the locator is not found
        }
    });
});
Cypress.Commands.add('uploadRandomFile', (locator, fileCount = 5) => {
    // Generate a random number to pick a random image
    const randomNumber = Math.floor(Math.random() * fileCount) + 1;
    const fileName = `image${randomNumber}.jpg`; // Assuming files are named image1.jpg to image5.jpg

    // Fetch the file content from the fixtures folder
    cy.fixture(fileName).then(fileContent => {
        // Upload the file using the locator provided as a parameter
        cy.xpath(locator).attachFile({
            fileContent,
            fileName,
            encoding: 'base64',
            mimeType: 'image/jpeg',
        });
    });
});
Cypress.Commands.add('clickInsertAndSelectRandomFields', (insertButtonSelector, fieldLocator, count = 3) => {
    const selectedTexts = [];

    for (let i = 0; i < count; i++) {
        // First, click on the Insert button
        cy.get(insertButtonSelector).click();

        // Get the available fields and select one randomly
        cy.get(fieldLocator).then(elements => {
            // Shuffle the elements to randomize
            const availableElements = Cypress._.shuffle(elements);

            // Select one element randomly
            const el = availableElements[0]; // Always select the first element from the shuffled list

            const elementText = Cypress.$(el).text().trim();
            selectedTexts.push(elementText);

            // Click on the randomly selected element
            cy.wrap(el).click();
        });
    }

    // Save the selected texts in Cypress.env to access outside the test
    Cypress.env('selectedTexts', selectedTexts);
});
Cypress.Commands.add('searchAndClickFirst', (searchLocator, searchText) => {
    // Find the search input element, clear it, and type the search text
    cy.get(searchLocator).clear().type(searchText);
    cy.wait(2000)
    // Wait for the search results to appear
    cy.get('div[class="primary-text"]').should('be.visible');

    // Click on the first element from the list of search results
    cy.get('div[class="primary-text"]').first().click();
});
