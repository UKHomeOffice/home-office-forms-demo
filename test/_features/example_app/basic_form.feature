@feature @example_app @basic_form
Feature: Basic Form
  A user goes through the basic form

  Scenario: Full Basic Form Submission
    Given I start the 'base' application journey
    Then I click the 'Start' button
    Then I should be on the 'choose' page showing 'Select a Form'
    Then I select 'Basic Form'
    Then I click the 'Continue' button
    Then I should be on the 'name' page showing 'What is your full name?'
    Then I fill 'name' with 'Jane Doe'
    Then I click the 'Continue' button
    Then I should be on the 'dob' page showing 'What is your date of birth?'
    Then I enter a date of birth for a 30 year old
    Then I click the 'Continue' button
    Then I should be on the 'address' page showing 'What is your address in the UK?'
    Then I fill 'building' with '10 Downing Street'
    Then I fill 'townOrCity' with 'London'
    Then I fill 'postcode' with 'W12 3DE'
    Then I click the 'Continue' button
    Then I should be on the 'checkboxes' page showing 'Where does your money come from each month?'
    Then I select 'Salary'
    Then I select 'Child Benefit'
    Then I click the 'Continue' button
    Then I should be on the 'radio' page showing 'What country was the appeal lodged?'
    Then I select 'England and Wales'
    Then I click the 'Continue' button
    Then I should be on the 'email' page showing 'Enter your email address'
    Then I fill 'email' with 'test@email.com'
    Then I click the 'Continue' button
    Then I should be on the 'phone-number' page showing 'Enter your phone number'
    Then I fill 'phone' with '020 0000 0000'
    Then I click the 'Continue' button
    Then I should be on the 'confirm' page showing 'Check your answers before submitting your application.'
    Then I continue to the next step
    Then I should see 'Application complete' on the page
    Then I click the 'Start again' button
    Then I should be on the 'start' page showing 'The Home Office Forms Framework Demo'
