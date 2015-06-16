Feature: Features state
  Make sure features are in the default state after installation, and that
  there are no conflicts between features.

  @api
  Scenario: Visit content pages with an authenticated user from another company.
    Given I login with user "admin"
    When  I visit "admin/structure/features"
    Then  I should not see "Conflict"
    And   I should not see "Overridden"
