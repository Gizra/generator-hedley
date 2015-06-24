<?php

/**
 * @file
 * Contains SkeletonUsersResource.
 */

class SkeletonUsersResource extends \SkeletonTokenNotifierResource {
  /**
   * Overrides RestfulEntityBaseUser::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['password'] = array(
      'property' => 'pass',
      'callback' => array($this, 'hideField')
    );

    $public_fields['email'] = array(
      'property' => 'mail',
    );

    $public_fields['username'] = array(
      'property' => 'name',
    );

    // Prevent from trying to set the user status on creation.
    if ($this->getMethod() != \RestfulBase::POST) {
      $public_fields['status'] = array(
        'property' => 'status',
      );
    }

    return $public_fields;
  }
  /**
   * Hide the field value.
   *
   * @return NULL
   */
  protected function hideField() {
    return NULL;
  }

  /**
   * Sending verification email.
   */
  public function createEntity() {
    $entity = parent::createEntity();

    $account = reset($entity);
    $this->sendToken('verify_email', user_load($account['id']));

    return $entity;
  }


  /**
   * Checks if the token is valid for this user.
   * We need to verify it because this resource is not authenticated require.
   *
   * @return bool
   */
  protected function checkPatchAccess() {
    $controller = new RestfulAuthenticationToken('restful_token_auth');
    return $controller->authenticate($this->getRequest(), $this->getMethod());
  }

  /**
   * @param $op
   * @param $entity_type
   * @param $entity
   *
   * @return bool
   */
  public function checkEntityAccess($op, $entity_type, $entity) {
    if ($this->getMethod() == \RestfulBase::PATCH) {
      return $this->checkPatchAccess();
    }
    if ($this->getMethod() == \RestfulBase::POST) {
      return TRUE;
    }
    return parent::checkEntityAccess($op, $entity_type, $entity);
  }

  /**
   * @param string $op
   * @param string $public_field_name
   * @param \EntityMetadataWrapper $property_wrapper
   * @param \EntityMetadataWrapper $wrapper
   *
   * @return bool
   */
  public function checkPropertyAccess($op, $public_field_name, EntityMetadataWrapper $property_wrapper, EntityMetadataWrapper $wrapper) {
    if ($this->getMethod() == \RestfulBase::PATCH) {
      return $this->checkPatchAccess();
    }
    if ($this->getMethod() == \RestfulBase::POST) {
      return TRUE;
    }
    return parent::checkPropertyAccess($op, $public_field_name, $property_wrapper, $wrapper);
  }
}
