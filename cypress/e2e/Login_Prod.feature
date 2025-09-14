Feature: User Authentication for Plannexe
  Scenario: Successful login with valid credentials
    Given Open Login Page
    Then Expect Text Exist "Mobile Number"
    Then Expect Text Exist "ID"
    Then Select Option from Dropdown "Pakistan"
    Then Input Phone Number "3216337292"
    Then Input Password "aaaaaaaa"
    Then Click on Sign in Button
    Then Expect Home Page


