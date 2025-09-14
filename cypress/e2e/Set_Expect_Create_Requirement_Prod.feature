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
    #Then Edit Project Randomly "Open"
    #Then Open Section "General Information"
    #Then Open Section "Project Calculation"

    Then Select Project Latest Created
    Then Expect Project Page Exist
    Then Click on Project Child Tabs "Scope"
    Then Click on Create Requirement Button "Create Draft"
   Then Add Requirement Title
    Then Add Description
#    Then Select Dependency "Start to Start"
   Then Select Dependency "None"
    #Then Select Dependency Requirement
    Then Select Owner "Usama Sohail"
   Then Set Priority "Low"
#    Then Set Priority "Medium"
#    Then Set Priority "High"
#    Then Set Priority "Critical"
    Then Select Start Date
   Then Select Due Date
    Then Select Phase "Initiation"
    Then Select Deliverable Type "One Time"
  Then Add Revenue Value "15"
  Then Add Cost Value "15"
  Then Add Efforts Value Hours "2" and Min "15"
  Then Add Points Value "15"
  Then Additional Choose "Include Stages & Platforms"
  #Then Turn "Off" Checkbox of Stage at No "1"
  Then Add Efforts on Stage No "1" in Min "15" and Percentage "10" and Owner "Usama Sohail"
    Then Add Efforts on Stage No "2" in Min "5" and Percentage "15" and Owner "Usama Sohail"
    Then Add Efforts on Stage No "3" in Min "13" and Percentage "14" and Owner "Usama Sohail"
    Then Add Efforts on Stage No "4" in Min "17" and Percentage "17" and Owner "Usama Sohail"
    Then Click on Create Requirement Button. "Create"
    Then Expect Requirement Created Successfully