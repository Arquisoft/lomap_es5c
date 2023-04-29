Feature: Log in into pod

Scenario: The user is not logged in the site
  Given A not logged user
  When Enters the app
  Then The login button is shown on the page