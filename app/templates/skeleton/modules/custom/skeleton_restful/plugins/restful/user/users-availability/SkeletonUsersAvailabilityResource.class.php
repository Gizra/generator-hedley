<?php

/**
 * @file
 * Contains SkeletonUsersAvailabilityResource.
 */
class SkeletonUsersAvailabilityResource extends \RestfulBase implements RestfulDataProviderInterface {

  /**
   * Overrides \RestfulEntityBase::controllers.
   */
  protected $controllers = array(
    '' => array(
      \RestfulInterface::GET => 'available',
    ),
  );

  /**
   * Return the properties that should be public.
   *
   * @throws \RestfulEntityViewMode
   *
   * @return array
   */
  public function publicFieldsInfo() {
    return array(
      'status' => array(),
    );
  }

  /**
   * Allow only specific keys from the request.
   */
  public function getKeys() {
    $request = $this->getRequest();

    // Remove unnecessary keys.
    foreach (array_keys($request) as $key) {

      if (!in_array($key, array('name', 'mail'))) {
        unset($request[$key]);
      }
    }

    return $request;
  }


  /**
   * Checks availability.
   * Assuming the class that inherit from here implemented the vars:
   * - "field"
   * - "load_account_by"
   *
   * @return array
   */
  public function available() {
    $request = $this->getKeys();
    $available = array();

    foreach ($request as $key => $value) {
      $function = 'user_load_by_' . $key;
      $account = $function($value);
      $available[$key] = !is_null($value) && empty($account);
    }

    return array('available' => $available);
  }
}
