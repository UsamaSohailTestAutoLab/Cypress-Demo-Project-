Feature: Project Links Validation Part 1
  Scenario: Project Links Validations
  This part of the test ensures that all key child tabs within a selected project are accessible, render correctly, and contain the expected interactive elements and text content. The test navigates to each tab one by one, validates the presence of specific buttons or labels, and returns to the project main page after each check. Tabs covered include:
  Parties & Contacts: Validates the existence of the "Associate Party" button and checks for the text labels "Parties & Contacts" and "Responsibility Matrix".
  Responsibility Matrix: Confirms similar validations as above to ensure both labels and action buttons are consistent.
  Scope: Verifies the visibility of the "Create Draft" button for initiating requirements.
  Fixes: Ensures that the "Create Fix" button is present to allow users to log new fixes.
  Plan: Checks that all plan-related tabs are rendered correctly and that the "Create Timeline" button is available.
  Documents: Validates the presence of the "Attach File" button for document uploads.
  Notes: Confirms that the "Create Note" button is visible and functional.
  Release: Navigates through the release creation flow by interacting with the "Create" button multiple times to verify dropdown states like "Create Release" and "Generate Link".
  Q & A: Ensures that the "Create Question" button is present on the Q&A page.
  Open, Completed, and Efforts(hrs) Activities Tabs: Each of these tabs is accessed to confirm the presence of the "Activities" page and the "Backlog" tab, validating that task tracking functionality is available across all project phases.
    Given Open Login Page
    Then Expect Text Exist "Mobile Number"
    Then Expect Text Exist "ID"
    Then Select Option from Dropdown "Pakistan"
    Then Input Phone Number "3216337292"
    Then Input Password "aaaaaaaa"
    Then Click on Sign in Button
    Then Expect Home Page
    Then Select Project Latest Created
    Then Expect Project Page Exist
    Then Click on Project Child Tabs "Parties & Contacts"
    Then Expect Associate Party Button Exist
    Then Expect Text Exist. "Parties & Contacts"
    Then Expect Text Exist. "Responsibility Matrix"
    Then Back to Previous Page
    Then Click on Project Child Tabs "Responsibility Matrix"
    Then Expect Associate Party Button Exist
    Then Expect Text Exist. "Parties & Contacts"
    Then Expect Text Exist. "Responsibility Matrix"
    Then Back to Previous Page
    Then Click on Project Child Tabs "Scope"
    Then Expect Create Button Requirements "Create Draft"
    Then Back to Previous Page
    Then Click on Project Child Tabs "Fixes"
    Then Expect Create Fixes Button "Create Fix"
    Then Back to Previous Page
    Then Click on Project Child Tabs "Plan"
    Then Expect All The Tabs Exist
    Then Expect Create Timeline Button "Create Timeline"
    Then Back to Previous Page
    Then Click on Project Child Tabs "Documents"
    Then Expect Attach File Button "Attach File"
    Then Back to Previous Page
    Then Click on Project Child Tabs "Notes"
    Then Expect Create Notes Button "Create Note"
    Then Click on Create Release Page "Release"
    Then Expect Create Release Button "Create"
    Then Click on Create Release Button "Create"
    Then Expect Create Release DropDown "Create Release"
    Then Click on Create Release Button "Create"
    Then Expect Create Release DropDown "Generate Link"
    Then Back to Previous Page
    Then Back to Previous Page
    Then Click on Project Child Tabs "Q & A"
    Then Expect Create Question Button "Create Question"
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Open"
    Then Expect Activities Page Exist
    Then Click on Activities Tab "Backlog"
    Then Expect Backlog Tab Exist
    Then Back to Previous Page
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Completed"
    Then Expect Activities Page Exist
    Then Click on Activities Tab "Backlog"
    Then Expect Backlog Tab Exist
    Then Back to Previous Page
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Efforts(hrs)"
    Then Expect Activities Page Exist
    Then Click on Activities Tab "Backlog"
    Then Expect Backlog Tab Exist
    Then Back to Previous Page
    Then Back to Previous Page









