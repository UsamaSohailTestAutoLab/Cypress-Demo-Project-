Feature: Advance Project Creation
  Scenario: Verify Create Advance Project Functionality of Plannexe
    Given Open Login Page
    Then Expect Text Exist "Mobile Number"
    Then Expect Text Exist "ID"
    Then Select Option from Dropdown "Pakistan"
    Then Input Phone Number "3216337292"
    Then Input Password "aaaaaaaa"
    Then Click on Sign in Button
    Then Expect Home Page
    Then Click on Create Project DropDown
    Then Select Project Type "Advance"
    Then Open Section "General Information"
    Then Set Project Name "Plannexe Automation"
    Then Select Project Group
    Then Select Project Owner "Usama Sohail"
    Then Select Type "Internal"
    Then Select External Link "test.com"
    Then Set Priority "Medium"
    Then Select Start Date of Project
    Then Select Due Date of Project
    Then Select Beneficiary
    Then Select Lists All Element
    Then Click on "Continue to Project Calculation"
    Then Project Progress "Timelines"
    Then Checked "Revenue" and Amount "2000000000000"
    Then Checked "Cost" and Amount "2000000000000"
    Then Checked "Efforts" and Amount "2000000000000"
    Then Checked "Points" and Amount "2000000000000"
    Then Select Revenue Type "Optional"
    Then Select Cost Type "Optional"
    Then Select Efforts Type "Optional"
    Then Select Points Type "Optional"
    Then Select Start Date Type "Optional"
    Then Select End Date Type "Optional"
    Then Basic Statistics "Timelines"
    Then Relative Statistics "Timelines"
    Then Click on "Continue to Labels"
    Then Select Labels Randomly
    Then Click on "Continue to Stages & Platforms"
    Then Click on Stages Toggle Button "Stages"
    Then Write Stage Name "Web" and Stage No "1" and Percentage "50"
    Then Write Stage Name "Android" and Stage No "2" and Percentage "50"
    Then Write Stage Name "IOS" and Stage No "3" and Percentage "50"
    Then Write Stage Name "QA" and Stage No "4" and Percentage "50"
    Then Delete Stage No "4"
    Then Add New Stage
    Then Write Stage Name "QA" and Stage No "4" and Percentage "50"
    Then Click on Stages Toggle Button "Platforms"
    Then Fill Platform Name "Automation" and Percentage "50"
    Then Click on "Continue to Deliverable Defaults"
    Then Click on Create Project Button "Create Project"


