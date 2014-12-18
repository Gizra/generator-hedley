Feature: User login
  In order to be able to be recognized by the site
  As an anonymous user
  We need to be able to login to the site

  @javascript
  Scenario: Login to site, and check access to the homepage.
    Given I login with user "admin"
     When I visit "/#/dashboard/1/items/item/15/variant/21"
     Then I should wait for the text "Grey v-neck shirt" to "appear"

  @javascript
  Scenario: Login to site, and check access to the homepage.
    Given I login with user "admin"
    When I visit "/#/dashboard/1/items/item/15/variant/21"
    And I click "Unselect item"
    Then I should wait for the text "Grey v-neck shirt" to "disappear"

