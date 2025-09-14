Feature: Sample Feature
  Scenario: Verify Login Functionality of Plannexe
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
    Then Click on Project Child Tabs. "Requirements"
    Then Expect Requirement Page Exist
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Communication Plan"
    Then Expect Communication Plan Page Exist
    Then Back to Previous Page
    Then Click on Project Child Tabs. "More (10)"
    Then Expect More Page Exist
    Then Back to Previous Page
    Then Click on Project Tab "Phase Plan"
    Then Expect Phase Plan Page Exist
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Risks"
    Then Expect Create Risk Button "Create Risk"
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Issues"
    Then Expect Create Issue Button "Create Issue"
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Medical leave"
    Then Expect Medical Leave Page Exist
    Then Back to Previous Page
    Then Click on Project Child Tabs. "Payments"
    Then Expect Payment Page Exist
  ]
#    Then Expect Text Exist. "Parties & Contacts"
#    Then Expect Text Exist. "Responsibility Matrix"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Responsibility Matrix"
#    Then Expect Associate Party Button Exist
#    Then Expect Text Exist. "Parties & Contacts"
#    Then Expect Text Exist. "Responsibility Matrix"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Scope"
#    Then Expect Create Button Requirements "Create Draft"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Fixes"
#    Then Expect Create Fixes Button "Create Fix"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Plan"
#    Then Expect All The Tabs Exist
#    Then Expect Create Timeline Button "Create Timeline"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Documents"
#    Then Expect Attach File Button "Attach File"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Notes"
#    Then Expect Create Notes Button "Create Note"
#    Then Click on Create Release Page "Release"
#    Then Expect Create Release Button "Create"
#    Then Click on Create Release Button "Create"
#    Then Expect Create Release DropDown "Create Release"
#    Then Click on Create Release Button "Create"
#    Then Expect Create Release DropDown "Generate Link"
#    Then Back to Previous Page
#    Then Back to Previous Page
#    Then Click on Project Child Tabs "Q & A"
#    Then Expect Create Question Button "Create Question"
#    Then Back to Previous Page
#    Then Click on Project Child Tabs. "Open"
#    Then Expect Activities Page Exist
#    Then Click on Activities Tab "Backlog"
#    Then Expect Backlog Tab Exist
#    Then Back to Previous Page
#    Then Back to Previous Page
#    Then Click on Project Child Tabs. "Completed"
#    Then Expect Activities Page Exist
#    Then Click on Activities Tab "Backlog"
#    Then Expect Backlog Tab Exist
#    Then Back to Previous Page
#    Then Back to Previous Page
#    Then Click on Project Child Tabs. "Efforts(hrs)"
#    Then Expect Activities Page Exist
#    Then Click on Activities Tab "Backlog"
#    Then Expect Backlog Tab Exist
#    Then Back to Previous Page
#    Then Back to Previous Page









