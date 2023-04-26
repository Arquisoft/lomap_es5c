Feature: LogInButton

  Scenario: Display login button when not logged in
    Given I am not logged in
    When I navigate to the page
    Then I should see the login button

  Scenario: Add a custom login provider
    Given the user is not logged in
    When I click on the login button
    And they add a custom login provider
    Then the custom provider should be displayed in the login dropdown

  Scenario: Login with a provider
    Given I am not logged in
    When I click on the login dropdown button
    And I select a provider from the list
    Then I should be redirected to the provider's login page

  Scenario: Display logout button when logged in
    Given I am logged in
    When I navigate to the page
    Then I should see the logout button

  Scenario: Logout
    Given I am logged in
    When I click on the logout button
    Then I should be logged out

