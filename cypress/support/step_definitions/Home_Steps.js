/// <reference types="cypress" />
import {Given,Then,When } from "@badeball/cypress-cucumber-preprocessor";
import Base_Page from "../page_objects/BA_Page";

const base_page=new Base_Page();



Given(/^Input Idenedi Mobile Number "(.*)"$/, (number) => {
    cy.Click("button[class='defaultButton']","Login Idenedi Button not found or Load Properly");

    // Use cy.origin to interact with elements on the new origin
    cy.origin('https://idenedi-prod-stag.azurewebsites.net', () => {
        // Wait for loader to disappear
        cy.waitForElementToBeVisible("div[class='page-loader']");

        // Wait for the input element to appear
        cy.waitForElementToBeVisible('input[id=\'number\']', 10000, 500);

        // Input the mobile number
        base_page.Input_Mobile_Number(number);
    });
});

Given(/^Input Idenedi Password "(.*)"$/, (pass) => {

    base_page.Input_Password(pass)

})

Given(`Open Login Page.`, () => {
    base_page.navigate_Prod()
})
Given(`Open Login Page`, () => {
    base_page.navigate()
})

Given(`Expect Home Page`, () => {
    base_page.Expect_Home_Page()
})
Given(`Select Project Group`, () => {
    base_page.Select_Project_Group()
})
Given(`Select Beneficiary`, () => {
    base_page.Select_Project_Beneficiary()
})
Given(`Select Lists All Element`, () => {
    base_page.Select_List_All_Element()
})
Given(`Select Labels Randomly`, () => {
    base_page.Select_Random_Tags()
})
Given(`Add New Stage`, () => {
    base_page.Add_New_Stage()
})
Given(/^Click on Stages Toggle Button "(.*)"$/, (stage) => {
    base_page.Toggle_Button_Stages(stage)
})
Given(/^Delete Stage No "(.*)"$/, (index) => {
    base_page.Delete_Stages(index)
})
Given(/^Write Stage Name "(.*)" and Stage No "(.*)" and Percentage "(.*)"$/, (stg_name,stg_no,percent) => {
    base_page.Stages(stg_name,stg_no,percent)
})
Given(/^Fill Platform Name "(.*)" and Percentage "(.*)"$/, (stg_name,percent) => {
    base_page.Platform(stg_name,percent)
})
Given(`Click on Create Project DropDown`, () => {
    base_page.Click_On_Create_Project_Drop_Down()
})

Given(`Select Project Latest Created`, () => {
    base_page.Click_Latest_Project()
})
Given(/^Edit Project Randomly "(.*)"$/, (status) => {
    base_page.Edit_Project_Randomly(status)
})
Given(/^Select Project Owner "(.*)"$/, (owner) => {
    base_page.Select_Owner_Project(owner)
})
Given(/^Select Type "(.*)"$/, (type) => {
    base_page.Select_Type_Project(type)
})
Given(/^Project Progress "(.*)"$/, (type) => {
    base_page.Project_Progress(type)
})
Given(/^Select Revenue Type "(.*)"$/, (type) => {
    base_page.Select_Type_Revenue(type)
})
Given(/^Select Cost Type "(.*)"$/, (type) => {
    base_page.Select_Type_Cost(type)
})
Given(/^Select Efforts Type "(.*)"$/, (type) => {
    base_page.Select_Type_Efforts(type)
})
Given(/^Select Points Type "(.*)"$/, (type) => {
    base_page.Select_Type_Points(type)
})
Given(/^Select Start Date Type "(.*)"$/, (type) => {
    base_page.Select_Start_Date(type)
})
Given(/^Select End Date Type "(.*)"$/, (type) => {
    base_page.Select_End_Date(type)
})
Given(/^Basic Statistics "(.*)"$/, (type) => {
    base_page.Basic_Statistics(type)
})
Given(/^Relative Statistics "(.*)"$/, (type) => {
    base_page.Relative_Statistics(type)
})
Given(/^Select Start Date of Project$/, () => {
    base_page.Select_Start_Date_Project()
})
Given(/^Select Due Date of Project$/, () => {
    base_page.Select_Due_Date_Project()
})
Given(/^Select Project Type "(.*)"$/, (type) => {
    base_page.Select_Project_Type(type)
})
Given(`Expect Project Page Exist`, () => {
    base_page.Expect_Project_Page()
})
Given(`Expect Associate Party Button Exist`, () => {
    base_page.Expect_Associate_Party_Page()
})
Given(`Expect Requirement Page Exist`, () => {
    base_page.Expect_Requirement_Page()
})
Given(`Expect Communication Plan Page Exist`, () => {
    base_page.Expect_Requirement_Page()
})
Given(`Expect More Page Exist`, () => {
    base_page.Expect_Requirement_Page()
})
Given(`Expect Phase Plan Page Exist`, () => {
    base_page.Expect_Phase_Plan_Page()
})
Given(`Expect Payment Page Exist`, () => {
    base_page.Expect_Payment_Plan_Page()
})
Given(`Expect Medical Leave Page Exist`, () => {
    base_page.Expect_Medical_Page()
})
Given(`Back to Previous Page`, () => {
    cy.goBackOrFail()
})
When(/^Click on Project Tab "(.*)"$/, (tab) => {
    base_page.Click_On_Project_Tab(tab)

})
When(/^Open Section "(.*)"$/, (tab) => {
    base_page.Select_Section(tab)

})
When(/^Set Project Name "(.*)"$/, (tab) => {
    base_page.Set_Project_Name(tab)

})
When(/^Select External Link "(.*)"$/, (link) => {
    base_page.External_Link(link)

})
When(/^Click on Project Child Tabs "(.*)"$/, (tab) => {
    base_page.Click_On_Project_Child_Tab(tab)

})
When(/^Click on Project Child Tabs. "(.*)"$/, (tab) => {
    base_page.Click_On_Tab(tab)

})
When(/^Click on Activities Tab "(.*)"$/, (tab) => {
    base_page.Click_On_Activities_Tab(tab)

})
When(/^Expect Activities Page Exist$/, () => {
    base_page.Expect_Activities_Page()

})
When(/^Expect Backlog Tab Exist$/, () => {
    base_page.Expect_Backlog_Page()

})
When(/^Click on Create Release Page "(.*)"$/, (tab) => {
    base_page.Click_On_Create_Notes_Page(tab)

})
When(/^Click on Create Requirement Button "(.*)"$/, (tab) => {
    base_page.Click_On_Buttons(tab)

})
When(/^Click on Create Requirement Button. "(.*)"$/, (tab) => {
    base_page.Click_On_Buttons_Finish(tab)

})
When(/^Expect Requirement Created Successfully$/, () => {
    base_page.Requirement_Created()

})
When(/^Click on Create Project Button "(.*)"$/, (tab) => {
    base_page.Click_On_Buttons_Create_Project(tab)

})
When(/^Click on "(.*)"$/, (tab) => {
    base_page.Click_On_Buttons_Project(tab)

})
When(/^Checked "(.*)" and Amount "(.*)"$/, (tab,amount) => {
    base_page.Project_Calculation(tab,amount)

})
When(/^Add Requirement Title$/, () => {
    base_page.Add_Requirement_Title()

})
When(/^Add Description$/, () => {
    base_page.Add_Description()

})
When(/^Select Dependency "(.*)"$/, (dep) => {
    base_page.Add_Dependency(dep)

})
When(/^Select Dependency Requirement$/, (dep) => {
    base_page.Req_Add_Dependency(dep)

})
When(/^Select Owner "(.*)"$/, (dep) => {
    base_page.Select_Owner(dep)

})
When(/^Select Phase "(.*)"$/, (dep) => {
    base_page.Select_Phase(dep)

})
When(/^Select Deliverable Type "(.*)"$/, (dep) => {
    base_page.Select_Deliverable_Type(dep)

})
When(/^Add Revenue Value "(.*)"$/, (rev) => {
    base_page.Revenue_Value(rev)

})
When(/^Add Cost Value "(.*)"$/, (cost) => {
    base_page.Cost_Value(cost)

})
When(/^Add Points Value "(.*)"$/, (cost) => {
    base_page.Point_Value(cost)

})

When(/^Additional Choose "(.*)"$/, (cost) => {
    base_page.Additional_Value(cost)

})
When(/^Add Efforts Value Hours "(.*)" and Min "(.*)"$/, (Efforts_Hrs,Efforts_Min) => {
    base_page.Efforts_Value(Efforts_Hrs,Efforts_Min)

})
When(/^Add Efforts on Stage No "(.*)" in Min "(.*)" and Percentage "(.*)" and Owner "(.*)"$/, (index,Efforts_Min,Percentage,Owner) => {
    base_page.Stage_Data(index,Efforts_Min,Percentage,Owner)

})
When(/^Turn "(.*)" Checkbox of Stage at No "(.*)"$/, (type,no) => {
    base_page.Stage_Check_Box(type,no)

})
When(/^Set Priority "(.*)"$/, (dep) => {
    base_page.Select_Priority(dep)

})
When(/^Check OS "(.*)" at "(.*)"$/, (os,value) => {
    base_page.Select_Checkbox(os, value)

})
When(/^Select Start Date$/, (dep) => {
    base_page.Start_Date()

})
When(/^Select Due Date$/, (dep) => {
    base_page.Due_Date()

})
When(/^Expect Text Exist "(.*)"$/, (text) => {
    //  cy.xpath('//ng-progress//div[@active="true"]').should('not.exist');

    const toggleButton = "span.mat-button-toggle-label-content";
    cy.get(toggleButton).should("be.visible")
    // Set your expected text
    cy.verifyTextInElements('span.mat-button-toggle-label-content', text);


})
When(/^Expect Text Exist. "(.*)"$/, (text) => {
    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    // Set your expected text
    cy.verifyTextInElements('div[class=\'title\']', text);


})
When(/^Expect Create Button Requirements "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElements('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Create Fixes Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElements('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Create Timeline Button "(.*)"$/, (text) => {
  //  cy.get("mat-spinner[class='mat-progress-spinner mat-spinner mat-primary mat-progress-spinner-indeterminate-animation']").should("not.exist")
    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Attach File Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Create Risk Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Create Issue Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Create Notes Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('button[class="filter-button defaultButton pointer marl10 marr10"]', text);


})
When(/^Expect Create Release Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('span[class=\'margin-for-custom\']', text);


})
When(/^Expect Create Question Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('button[class="defaultButton cp-button"]', text);


})
When(/^Expect Create Release DropDown "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElements("button[role='menuitem'] span",text)
    cy.clickIfTextMatched("button[role='menuitem'] span",text)
    if (text ==="Create Release") {

        cy.verifyTextInElements("div[class='h-title ng-star-inserted']", text)
    }
    if (text ==="Generate Link") {
        cy.verifyTextInElements("div[class='h-title ng-star-inserted']", "Generate Release")
    }
    cy.clickIfTextMatched("div[class='h-close']","clear")
})
When(/^Click on Create Release Button "(.*)"$/, (text) => {

    cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.verifyTextInElement('span[class=\'margin-for-custom\']', text);
    cy.clickIfTextMatched("span[class='margin-for-custom']",text)

})
When(/^Expect All The Tabs Exist$/, () => {

   // cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    cy.waitForElementToBeVisibleMsg("a[class='mat-tab-link mat-focus-indicator ng-star-inserted']","Tabs of TimeLine Missing")


})
When(/^Expect Text Exist Part "(.*)"$/, (text) => {

 cy.waitForTextToAppear("div[class='title']",text)



})
When(/^Expect Text DropDown Selected "(.*)"$/, (text) => {

    // Set your expected text
    cy.verifyTextInElements('span[class*="mat-select-min-line"]\n', text);


})
When(/^Select Option from Dropdown "(.*)"$/, (drop_down) => {

    cy.selectDropdownOption("mat-select[formcontrolname='country']", drop_down);


})
When(/^Input Phone Number "(.*)"$/, (validPhoneNumber) => {

    // Set your input number
    cy.waitForElementToBeVisible('input[formcontrolname=\'phoneNumber\']');
    cy.enterPhoneNumber("input[formcontrolname='phoneNumber']", validPhoneNumber);



})
When(/^Input Password "(.*)"$/, (password) => {

    // Set your input number
    cy.waitForElementToBeVisible('input[formcontrolname=\'password\']');
    cy.wait(2000)
    cy.enterPassword("input[formcontrolname='password']", password);

})

When(/^Click on Sign in Button$/, () => {

    // Expect Sign In Button

    cy.clickButton("button[type='submit']");
    cy.spinnerNotExist()


})
