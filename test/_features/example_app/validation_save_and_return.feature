@feature @save_and_return @validations
Feature: Database validations
  A user should see appropriate validations for each page for the database journey

  @save_form
  Scenario: Saving a form
    Given I start the 'feature' application journey
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I fill 'saveEmail' with '=testemail.com'
    Then I click the 'Save and continue' button
    Then I should see the 'Enter your email address in the correct format' error
    Then I fill 'saveEmail' with 'test@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing 'Create a new form'
    Then I continue to the next step
    Then I should be on the 'reference' page showing 'Give your form a reference'
    Then I click the 'Save and continue' button
    Then I should see the 'You must enter a reference' error
    Then I fill 'reference' with '1234'
    Then I click the 'Save and continue' button
    Then I should be on the 'name' page showing 'What is your name?'
    Then I click the 'Save and continue' button
    Then I should see the 'Enter your full name' error
    Then I fill 'name' with 'Jane Doe'
    Then I click the 'Save and continue' button
    Then I should be on the 'checkboxes' page showing 'Where does your money come from each month?'
    Then I click the 'Save and continue' button
    Then I should see the 'Select all options that apply to you.' error
    Then I select 'Salary'
    Then I select 'Child Benefit'
    Then I click the 'Save and continue' button
    Then I should be on the 'text-area-input' page showing 'What are the details of your complaint?'
    Then I click the 'Save and continue' button
    Then I should see the 'Enter details about why you are making a complaint' error
    Then I fill 'textArea' text area with 'I would like to make a complaint'
    Then I click the 'Save and continue' button
    Then I should be on the 'confirm' page showing 'Check your answers before submitting your application.'
    Then I click the 'Confirm submission' button
    Then I should be on the 'confirmation' page showing 'Application successful'

    