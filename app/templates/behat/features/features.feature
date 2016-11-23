Feature: Features state
  Make sure features are in the default state after installation, and that
  there are no conflicts between features.

  @api
  Scenario: Visit the features page and check that there are no conflicts and no overridden features.
    Given I login with user "admin"
    When  I visit "admin/structure/features"
    Then  I should not see "Conflict"
    And   I should not see "Overridden"
