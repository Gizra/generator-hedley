<?php

/**
 * @file
 * Contains CdxEmailAvailableResource.
 */

class CdxEmailAvailableResource extends \RestfulBase implements RestfulDataProviderInterface {
  /**
   * Overrides \RestfulEntityBase::controllers.
   */
  protected $controllers = array(
    '' => array(
      \RestfulInterface::POST => 'emailAvailable',
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
   * Checks if email is available.
   *
   * @return array
   */
  public function emailAvailable() {

    $request = $this->getRequest();
    $email = $request['email'];

    $query = new EntityFieldQuery();
    $result = $query
      ->entityCondition('entity_type', 'user')
      ->propertyCondition('mail', $email)
      ->count()
      ->execute();

    return array('available' => empty($result));
  }
}
