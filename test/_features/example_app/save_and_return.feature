@feature @save_and_return
Feature: Save and return
  A user should save their form

  @save_and_continue
  Scenario: Going through the form
    Given I start the 'feature' application journey
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I should be on the 'start' page showing 'Enter your email address'
    Then I fill 'saveEmail' with 'test@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing 'Create a new form'
    Then I continue to the next step
    Then I should be on the 'reference' page showing 'Give your form a reference'
    Then I fill 'reference' with '1234'
    Then I click the 'Save and continue' button
    Then I should be on the 'name' page showing 'What is your name?'
    Then I fill 'name' with 'Jane Doe'
    Then I click the 'Save and continue' button
    Then I should be on the 'checkboxes' page showing 'Where does your money come from each month?'
    Then I select 'Salary'
    Then I select 'Child Benefit'
    Then I click the 'Save and continue' button
    Then I should be on the 'text-area-input' page showing 'What are the details of your complaint?'
    Then I fill 'textArea' text area with 'I would like to make a complaint'
    Then I click the 'Save and continue' button
    Then I should be on the 'confirm' page showing 'Check your answers before submitting your application.'
    Then I click the 'Confirm submission' button
    Then I should be on the 'confirmation' page showing 'Application successful'

  @save_and_exit
  Scenario: Save and exit of a form
    Given I start the 'feature' application journey
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I should be on the 'start' page showing 'Enter your email address'
    Then I fill 'saveEmail' with 'test@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing 'Create a new form'
    Then I continue to the next step
    Then I should be on the 'reference' page showing 'Give your form a reference'
    Then I fill 'reference' with '1234'
    Then I click the 'Save and continue' button
    Then I should be on the 'name' page showing 'What is your name?'
    Then I fill 'name' with 'Jane Doe'
    Then I click the 'Save and exit' button
    Then I should be on the 'save-and-exit' page showing 'You can return to your form at any time from the save and return page.'

  @delete_form
  Scenario: Creating and deleting a form
    Given I start the 'feature' application journey
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I should be on the 'start' page showing 'Enter your email address'
    Then I fill 'saveEmail' with 'testdelete@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing 'Create a new form'
    Then I continue to the next step
    Then I should be on the 'reference' page showing 'Give your form a reference'
    Then I fill 'reference' with '1234'
    Then I click the 'Save and continue' button
    Then I should be on the 'name' page showing 'What is your name?'
    Then I fill 'name' with 'Jane Doe'
    Then I click the 'Save and exit' button
    Then I click the 'Start again' button
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I should be on the 'start' page showing 'Enter your email address'
    Then I fill 'saveEmail' with 'testdelete@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing 'Create a new form'
    Then I click the 'Delete form' button
    Then I click the 'Delete this form' button
    Then I should be on the 'forms' page showing 'You do not currently have any draft forms'

    @save_and_update
    Scenario: Save and exit of a form
    Given I start the 'feature' application journey
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I should be on the 'start' page showing 'Enter your email address'
    Then I fill 'saveEmail' with 'testupdate@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing 'Create a new form'
    Then I continue to the next step
    Then I should be on the 'reference' page showing 'Give your form a reference'
    Then I fill 'reference' with '1234'
    Then I click the 'Save and exit' button
    Then I should be on the 'save-and-exit' page showing 'You can return to your form at any time from the save and return page.'
    Then I click the 'Start again' button
    Then I should be on the 'save-and-return' page showing 'Save and return feature'
    Then I click the 'Start a form' button
    Then I should be on the 'start' page showing 'Enter your email address'
    Then I fill 'saveEmail' with 'testupdate@email.com'
    Then I click the 'Save and continue' button
    Then I should be on the 'forms' page showing '1234'
    Then I click the 'Go to form' button
    Then I should be on the 'continue-form' page showing 'Do you want to continue this form'
    Then I click the 'Continue to next question' button
    Then I should be on the 'reference' page showing 'Give your form a reference'  
