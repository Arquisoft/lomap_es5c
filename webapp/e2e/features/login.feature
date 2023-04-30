Feature: Log in into pod

Scenario: Display login button when not logged in
    Given I am not logged in
    When I navigate to the page
    Then I should see the login button


  Scenario: Display logout button when logged in
    Given I am logged in
    When I navigate to the page
    Then I should see the logout button