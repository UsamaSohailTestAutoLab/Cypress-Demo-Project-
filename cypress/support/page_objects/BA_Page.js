/// <reference types="cypress" />

class Base_Page {
    navigate() {
        cy.fixture("config.json").then((data) => {
            cy.visit(data.Base_Url); // Visit the specified baseUrl
            cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");

            // Handle uncaught exceptions
            Cypress.on('uncaught:exception', (err) => {
                // Handle "Cannot use import statement outside a module" error
                if (err.message.includes('Cannot use import statement outside a module')) {
                    return false; // Prevent test from failing
                }

                // Handle "cancelled" promise rejection error
                if (err.message.includes('cancelled')) {
                    return false; // Ignore this error
                }

                // Let Cypress handle other exceptions
                return true;
            });

        });
    }
    Expect_Home_Page(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("div[role='progressbar']","Home Page not Found or Not Load Properly")
        cy.verifyPageTitle('engagementprov2test | StemeXe');
    }
    Select_Project_Group(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("input[placeholder='ProjectGroup']","Project Group Fields Not Exist or Not Loaded")
        cy.clickButton("input[placeholder='ProjectGroup']")
       // cy.clickButton("span[class='mat-option-text']")
        cy.randomClickFromList("span[class='mat-option-text']")
    }
    Select_Project_Beneficiary(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("input[placeholder='Beneficiary']","Beneficiary Fields Not Exist or Not Loaded")
        cy.clickButton("input[placeholder='Beneficiary']")
        // cy.clickButton("span[class='mat-option-text']")
        cy.randomClickFromList("span[class='mat-option-text']")
    }

    Select_List_All_Element(){
        cy.get("div[class='mat-chip-list-wrapper']").eq(0).click()
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickAllButFirstTwo("span[class='mat-option-text']");
        cy.get('body').type('{esc}');

    }
    Select_Random_Tags(){
        cy.clickRandomSubset("li[class='ng-star-inserted']");

    }
    Add_New_Stage(){
       cy.clickButton("div[class='apa-text']")
    }
    Toggle_Button_Stages(stg){
        cy.clickIfTextMatches("span[class*='mat-slide-toggle-content']",stg)

    }
    Delete_Stages(index){
     cy.clickButtonIndex("button[class='mat-focus-indicator mat-menu-trigger mat-icon-button mat-button-base']",index)
        cy.clickButton("button[class*='mat-focus-indicator danger-item mat-menu-item']")
       cy.clickIfTextMatched("button[class='defaultButton']","Delete")
    }
    Stages(stage_text,index,percent){
        //const new_index = parseInt(index, 10) + 2;

        cy.clickButtonIndex("mat-form-field input[type='text']",index)
        cy.typeInFieldByIndex("mat-form-field input[type='text']",index,stage_text)
        cy.typeInFieldByIndex("mat-form-field input[type='number']",index,percent)
    }
    Platform(stage_text,percent){

        cy.typeInLastTextField("input[type='text']", stage_text);
        cy.typeInLastTextField("input[type='number']", percent);

    }
    Click_On_Create_Project_Drop_Down(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("img[src='/assets/engaged-images/down-arrow.svg']","Create Project Button Arrow not Exist or Page not Load Properly")
        cy.clickButton("img[src='/assets/engaged-images/down-arrow.svg']")
    }
    Click_Random_Project(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.randomClickFromList("div[class='project-name inline'] div[class='inline'] a")
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    }
    Click_Latest_Project(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickFirstElement("div[class='project-name inline'] div[class='inline'] a")
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
    }
    Edit_Project_Randomly(status){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.randomClickFromListXpathStatus(status);  // or 'Pending', 'Closed', etc.

        cy.clickIfTextMatches("button[class*='mat-focus-indicator mat-menu-item'] span","Edit")
    }
    Select_Owner_Project(owner)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[placeholder='Project Owner']","No Owner Exist or Onwer Dropdown not Loaded Properly")
        cy.clickButton("input[placeholder='Project Owner']")
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Owner Exist or Onwer Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",owner)
    }
    Select_Type_Project(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[data-placeholder='Type']","No Type Field Exist or Type Dropdown not Loaded Properly")
        cy.clickButton("input[data-placeholder='Type']")
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Select_Type_Revenue(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[2]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[2]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Select_Type_Efforts(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[4]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[4]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Select_Type_Points(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[5]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[5]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }

    Select_Start_Date(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[6]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[6]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Select_End_Date(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[7]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[7]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Basic_Statistics(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[8]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[8]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Relative_Statistics(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[9]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[9]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Select_Type_Cost(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[3]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[3]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Project_Progress(type)
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("(//mat-select[@role='combobox'])[1]","No Project Progress Field Exist or Type Dropdown not Loaded Properly")
        cy.xpath("(//mat-select[@role='combobox'])[1]").click()
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Type Exist or Type Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",type)
    }
    Select_Start_Date_Project()
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("mat-icon[class='mat-icon notranslate datePickerIcon material-icons mat-ligature-font mat-icon-no-color']","No Date Picker Exist")
        cy.get("mat-icon[class='mat-icon notranslate datePickerIcon material-icons mat-ligature-font mat-icon-no-color']")
            .eq(0)
            .scrollIntoView()
            .click({ force: true });

        cy.waitForElementToBeVisibleMsg("span[class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-selected mat-calendar-body-today']","Current Date not Highlighted")
        cy.get("span[class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-selected mat-calendar-body-today']").eq(0).scrollIntoView().click()
    }
    Select_Due_Date_Project()
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");

        cy.waitForElementToBeVisibleMsg("mat-icon[class='mat-icon notranslate datePickerIcon material-icons mat-ligature-font mat-icon-no-color']","No Date Picker Exist")
        cy.get("mat-icon[class='mat-icon notranslate datePickerIcon material-icons mat-ligature-font mat-icon-no-color']")
            .eq(1)
            .scrollIntoView()
            .click({ force: true });


        cy.get('body').type('{enter}');
        cy.get('body').type('{enter}');

    }
    Select_Project_Type(type){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatched("button[class*='mat-focus-indicator mat-menu-item'] span",type)
    }
    Expect_Project_Page(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("div[class='top-text'] div[class='text']","Project Page not Found or Not Load Properly or We are still on Plannexe Home Page")
    }
    Expect_Associate_Party_Page(){
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("button[class='defaultButton cp-button ng-star-inserted']","Associate Party Button not Found or Not Load Properly or We are still on Plannexe Home Page")
    }
    Click_On_Project_Tab(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickLinkByTextInGrandparent(tab);
    }
    Click_On_Project_Child_Tab(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatchesIgnoreCase(tab)
    }
    Expect_Requirement_Page() {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.verifyTextInElements("div[class='current-page-title textContinue ng-star-inserted']","Charter")
        cy.waitForElementToBeVisibleMsg("div[class='tabTitle']","Tabs of Requirement Page Not Exist It Means User not on Requirement Page or Page not Loaded Properly")
    }
    Expect_Phase_Plan_Page() {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.verifyTextInElements("div[class='current-page-title textContinue ng-star-inserted']","Phases")
        cy.waitForElementToBeVisibleMsg("div[class='pbw-title textContinue cursor']","Tabs of Phase Plan Page Not Exist It Means User not on Phase Plan Page or Page not Loaded Properly")
    }
    Expect_Payment_Plan_Page() {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.verifyTextInElements("div[class='current-page-title textContinue ng-star-inserted']","Payments")
        cy.waitForElementToBeVisibleMsg("div[class='pbw-title textContinue cursor']","Tabs of Phase Plan Page Not Exist It Means User not on Phase Plan Page or Page not Loaded Properly")
    }
    Expect_Medical_Page() {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.verifyTextInElements("div[class='current-page-title textContinue ng-star-inserted']","Medical leave")
        cy.waitForElementToBeVisibleMsg("div[class='pbw-title textContinue cursor']","Tabs of Phase Plan Page Not Exist It Means User not on Phase Plan Page or Page not Loaded Properly")
    }
    Click_On_Tab(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.xpath("(//mat-progress-spinner)[2]").should("not.exist")
        cy.waitForTextToAppear("a.count-link-v2 div",tab)
        cy.clickIfTextMatchesIgnoreCase(tab)
    }
    Click_On_Activities_Tab(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatched("div[class='mat-tab-label-content']",tab)
    }
    Click_On_Create_Notes_Page(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatched("a[class*='mat-tab-link mat-focus-indicator']",tab)
    }
    Expect_Activities_Page()
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.verifyTextInElements("b[class='title']","Activities")
        cy.waitForElementToBeVisibleMsg("span[class='lbl']","Actiivities Status not Exist Open,Close etc or Page not Load Properly")
    }
    Expect_Backlog_Page()
    {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.verifyTextInElements("button[class='mat-focus-indicator add-action-btn gradient-btn mat-flat-button mat-button-base mat-primary add-scorecard']","Add Backlog Activity")
        cy.waitForElementToBeVisibleMsg("span[class='lbl']","Actiivities Status not Exist Open,Close etc or Page not Load Properly")
    }
    Select_Section(sectionTitle)
    {
        cy.xpath(`//div[normalize-space(text())='${sectionTitle}']/following-sibling::div`).scrollIntoView().click()

    }
    External_Link(link)
    {
        cy.waitForElementToBeVisibleMsg("input[formcontrolname='externalId']","External Link Input Field Not Exist")
        cy.typeOrFail("input[formcontrolname='externalId']",link,"External Link Input Form not Exist or Data not Typed or Page not Loaded")
    }
    Set_Project_Name(name)
    {
        cy.waitForElementToBeVisibleMsg("input[formcontrolname='name']","Project Name Input Field Not Exist")
        cy.typeOrFail("input[formcontrolname='name']",name,"Project Input Form not Exist or Data not Typed or Page not Loaded")
    }
    Click_On_Buttons(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatches("button[class='defaultButton cp-button']",tab)
    }
    Click_On_Buttons_Finish(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatches("button[class='defaultButton']",tab)
    }
    Requirement_Created() {
        cy.get("mat-progress-spinner[role='progressbar']").should("not.exist")
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.get("div[class='h-ai ng-star-inserted']").should("not.exist")
        const title = Cypress.env('requirementTitle');
        cy.log(title,"Title here.........................")
        cy.waitForElementToBeVisibleMsg("span[class='textContinue']","User not on Requirement Page")

        cy.verifyTextInElements("span[class='textContinue']",title)
    }
    Click_On_Buttons_Create_Project(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatches("button[class='defaultButton ng-star-inserted']",tab)
    }
    Click_On_Buttons_Project(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.clickIfTextMatches("button[class='defaultButton ng-star-inserted']",tab)
    }
    Project_Calculation(text,amount)
    {
        if (text==="Revenue off")
        {
            cy.clickIfTextMatched("div[class='revenue-checkbox'] span[class='mat-slide-toggle-content']",text)
        }
        if (text==="Cost off")
        {

            cy.clickIfTextMatched("div[class='revenue-checkbox'] span[class='mat-slide-toggle-content']",text)
        }
        if (text==="Efforts off")
        {

            cy.clickIfTextMatched("div[class='revenue-checkbox'] span[class='mat-slide-toggle-content']",text)
        }
        if (text==="Points off")
        {

            cy.clickIfTextMatched("div[class='revenue-checkbox'] span[class='mat-slide-toggle-content']",text)
        }
        if (text==="Revenue") {
            cy.get("input[color='xui']").eq(0).clear().type(amount)
        }
        if (text==="Cost") {
            cy.get("input[color='xui']").eq(1).clear().type(amount)
        }
        if (text==="Efforts") {
            cy.get("input[color='xui']").eq(2).clear().type(amount)
            cy.get("input[color='xui']").eq(3).clear().type(amount)
        }
        if (text==="Points") {
            cy.get("input[color='xui']").eq(4).clear().type(amount)
        }
    }

    Add_Requirement_Title(tab) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.generateRandomRequirementTitle('input[formcontrolname=\'title\']', 'Requirement title was not entered correctly! or Page not Loaded Properly');

    }
    Add_Description() {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.generateRandomRequirementDescription('div[id=\'persona-tagging\']', 'Requirement description was not correctly entered! or Page not Loaded Properly');
    }
    Add_Dependency(dep) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
       cy.waitForElementToBeVisibleMsg("div[class='dependency']","Requirement Dependency not Form not Showing")
        cy.clickButton("div[class='dependency']")
        cy.clickIfTextMatches("span[class='mat-radio-label-content']",dep)
        if (dep ==='None')
        {
            cy.waitForAndClickByTextScroll("button[class='defaultButton']","Save")
        }
    }
    Req_Add_Dependency(dep) {

        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("input[placeholder='Select Requirement']","No Requirement Dependency Exist")
        cy.clickButton("input[placeholder='Select Requirement']")
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Requirement Dependency Exist")
        cy.get("span[class='mat-option-text']").first().click()
        cy.waitForAndClickByText("button[class='defaultButton']","Save")
    }
    Select_Owner(owner) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='owner']","No Owner Exist or Onwer Dropdown not Loaded Properly")
        cy.clickButton("input[formcontrolname='owner']")
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Owner Exist or Onwer Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",owner)
    }
    Select_Deliverable_Type(Deliverable) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("mat-select[formcontrolname='deliverableType']","No deliverableType Exist or deliverableType Dropdown not Loaded Properly")
        cy.clickButton("mat-select[formcontrolname='deliverableType']")
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No deliverableType Exist or deliverableType Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",Deliverable)
    }
    Revenue_Value(Rev) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='revenue']","No Revenue Form Exist or Revenue not Loaded Properly")
        cy.typeOrFail("input[formcontrolname='revenue']",Rev,"Revenue Not Added or Field not Exist")
    }
    Cost_Value(cost) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='cost']","No cost Form Exist or cost not Loaded Properly")
        cy.typeOrFail("input[formcontrolname='cost']",cost,"cost Not Added or Field not Exist")
    }
    Point_Value(points) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='points']","No Points Form Exist or cost not Loaded Properly")
        cy.typeOrFail("input[formcontrolname='points']",points,"Points Not Added or Field not Exist")
    }
    Additional_Value(value) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgXpath("//mat-radio-button[@name='rgroup']/parent::li//div","No Additional Radio Button Exist or not Loaded Properly")
        cy.clickIfTextMatchedXpath("//mat-radio-button[@name='rgroup']/parent::li//div",value)
    }
    Efforts_Value(Efforts_Hrs,Efforts_Min) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='effortsHrs']","No Efforts Form Exist or cost not Loaded Properly")
        cy.typeOrFail("input[formcontrolname='effortsHrs']",Efforts_Hrs,"Effort Hours Not Added or Field not Exist")
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='effortsmins']","No effortsmins Form Exist or cost not Loaded Properly")
        cy.typeOrFail("input[formcontrolname='effortsmins']",Efforts_Min,"Effortsmins Not Added or Field not Exist")
    }
    Stage_Data(number,Efforts_Min,Percentage,owner) {
        const index=number-1;
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsg("div[class='effort-input'] input","No Efforts Form Exist or Efforts not Loaded Properly")
        cy.typeInFieldByIndex("div[class='effort-input'] input",index,Efforts_Min)
        cy.waitForElementToBeVisibleMsg("div[class='dbw-input'] input","No Percentage Form Exist or Percentage not Loaded Properly")
        cy.typeInFieldByIndex("div[class='dbw-input'] input",index,Percentage)
        cy.waitForElementToBeVisibleMsg("app-searchable-select[class='requirement-owner']","No Owner Exist or Onwer Dropdown not Loaded Properly")
        cy.clickButtonIndex("app-searchable-select[class='requirement-owner']",index)
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No Owner Exist or Onwer Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",owner)

    }
    Stage_Check_Box(type,no) {
        const number=no-1;
        cy.log(number, "show numberr..................")
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
       // cy.waitForElementToBeVisibleMsgXpath("//div[@class='text']/parent::div//mat-checkbox","Checkbox not Clicked or Not Exist or not Loaded Properly")
        if(type ==="Off") {
            cy.clickButtonIndexXpath("//div[@class='text']/parent::div//mat-checkbox", number)
        }
    }
    Select_Phase(Phase) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        cy.waitForElementToBeVisibleMsgScroll("input[formcontrolname='phase']","No phase Exist or phase Dropdown not Loaded Properly")
        cy.clickButton("input[formcontrolname='phase']")
        cy.waitForElementToBeVisibleMsg("span[class='mat-option-text']","No phase Exist or phase Dropdown not Loaded Properly")
        cy.clickIfTextMatches("span[class='mat-option-text']",Phase)
    }
    Select_Priority(Priority) {
        cy.get("div[class='ng-progress-bar'][active='true']").should("not.exist");
        if (Priority==='Low') {
            cy.waitForElementToBeVisibleMsgScroll("li[class='Low critical-tag ng-star-inserted'] div", "Low Priority Section not Exist or Not Load")
            cy.clickIfTextMatches("li[class='Low critical-tag ng-star-inserted'] div", Priority)
        }
        if (Priority==='Medium') {
            cy.waitForElementToBeVisibleMsgScroll("li[class*='Medium critical-tag'] div", "Medium Priority Section not Exist or Not Load")
            cy.clickIfTextMatches("li[class*='Medium critical-tag'] div", Priority)
        }
        if (Priority==='High') {
            cy.waitForElementToBeVisibleMsgScroll("li[class='High critical-tag ng-star-inserted'] div", "High Priority Section not Exist or Not Load")
            cy.clickIfTextMatches("li[class='High critical-tag ng-star-inserted'] div", Priority)
        }
        if (Priority==='Critical') {
            cy.waitForElementToBeVisibleMsgScroll("li[class='Critical critical-tag ng-star-inserted'] div", "Critical Priority Section not Exist or Not Load")
            cy.clickIfTextMatches("li[class='Critical critical-tag ng-star-inserted'] div", Priority)
        }
    }
    Select_Checkbox(os,value)
    {
        if (os ==='Android')
        {
             // You can change this to any platform name
            cy.xpath(`//div[text()='${os}']/ancestor::div/mat-checkbox`).eq(value).scrollIntoView().click();
        }
        if (os ==='Web')
        {
            // You can change this to any platform name
            cy.xpath(`//div[text()='${os}']/ancestor::div/mat-checkbox`).eq(value).scrollIntoView().click();
        }
    }
    Input_Mobile_Number()
    {
        cy.Type('input[id=\'number\']', '03216337292');
    }
    Input_Password()
    {
    cy.Type("input[id='password']","aaaaaaaa")
    }
    Start_Date()
    {

      cy.get("span[class='mat-mdc-button-touch-target']").first().scrollIntoView().click()
        cy.wait(2000)
      //  cy.get("mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today mat-calendar-body-selected").click({ force: true });
        cy.get("span[class='mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today']").click()
      //  cy.get('body').type('{enter}');



    }
    Due_Date()
    {

        cy.get("span[class='mat-mdc-button-touch-target']").eq(1).scrollIntoView().click()
       // cy.get("mat-calendar-body-cell-content mat-focus-indicator mat-calendar-body-today").should("be.visible")
        cy.get('body').type('{enter}');
        cy.get('body').type('{enter}');
      //  cy.get("mat-calendar-body-cell-content.mat-focus-indicator.mat-calendar-body-today").click({ force: true });

    }
    navigate_Prod() {
        cy.fixture("config.json").then((data) => {
            cy.visit(data.Base_Url_Prod); // Visit the specified baseUrl
        });
    }
}
    export default Base_Page;