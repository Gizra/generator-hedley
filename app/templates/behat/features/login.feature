Feature: User login
  In order to be able to be recognized by the site
  As an anonymous user
  We need to be able to login to the site

  @javascript
  Scenario: Login to site, and check access to the homepage.
    Given I login with user "admin"
     When I visit "/#/dashboard/1/events"
     Then I should wait for the text "demo (2)" to "appear"

