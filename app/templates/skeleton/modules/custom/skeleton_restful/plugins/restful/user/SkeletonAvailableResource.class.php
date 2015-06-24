<?php

/**
 * @file
 * Contains SkeletonAvailableResource.
 */

class SkeletonAvailableResource extends \RestfulBase implements RestfulDataProviderInterface {

  /**
   * Overrides \RestfulEntityBase::controllers.
   */
  protected $controllers = array(
    '' => array(
      \RestfulInterface::POST => 'available',
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
   * Checks availability.
   * Assuming the class that inherit from here implemented the vars:
   * - "field"
   * - "load_account_by"
   *
   * @return array
   */
  public function available() {
    $request = $this->getRequest();
    $field = $request[$this->field];

    $function = $this->load_account_by;
    $account = $function($field);

    $available = !is_null($field) && empty($account);

    return array('available' => $available);
  }
}
