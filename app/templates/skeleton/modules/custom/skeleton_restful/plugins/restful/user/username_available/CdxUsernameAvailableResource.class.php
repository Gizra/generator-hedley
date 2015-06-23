<?php

/**
 * @file
 * Contains CdxUsernameAvailableResource.
 */

class CdxUsernameAvailableResource extends \RestfulBase implements RestfulDataProviderInterface {
  /**
   * Overrides \RestfulEntityBase::controllers.
   */
  protected $controllers = array(
    '' => array(
      \RestfulInterface::POST => 'usernameAvailable',
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
   * Checks if a username is available.
   *
   * @return array
   */
  public function usernameAvailable() {

    $request = $this->getRequest();
    $username = $request['username'];

    $query = new EntityFieldQuery();
    $result = $query
      ->entityCondition('entity_type', 'user')
      ->propertyCondition('mail', $username)
      ->count()
      ->execute();

    return array('available' => empty($result));
  }
}
