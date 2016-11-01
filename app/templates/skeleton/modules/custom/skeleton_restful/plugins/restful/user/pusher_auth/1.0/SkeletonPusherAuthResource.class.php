<?php

/**
 * @file
 * Contains SkeletonPusherAuthResource.
 */

class SkeletonPusherAuthResource extends \RestfulEntityBaseUser {

  /**
   * Overrides \RestfulEntityBase::controllers.
   */
  protected $controllers = array(
    '' => array(
      \RestfulInterface::POST => 'viewEntity',
    ),
  );

  /**
   * Overrides \RestfulEntityBaseUser::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = array();

    $public_fields['auth'] = array(
      'callback' => array($this, 'getPusherAuth'),
    );

    return $public_fields;
  }

  /**
   * Overrides \RestfulEntityBase::viewEntity().
   *
   * Always return the current user.
   */
  public function viewEntity($entity_id) {
    $request = $this->getRequest();

    if (empty($request['channel_name'])) {
      throw new \RestfulBadRequestException('"channel_name" property is missing');
    }

    if (empty($request['socket_id'])) {
      throw new \RestfulBadRequestException('"socket_id" property is missing');
    }

    $account = $this->getAccount();
    return parent::viewEntity($account->uid);
  }

  /**
   * Get the pusher auth.
   */
  protected function getPusherAuth() {
    $request = $this->getRequest();

    $pusher = skeleton_pusher_get_pusher();
    $result = $pusher->socket_auth($request['channel_name'], $request['socket_id']);
    $data = drupal_json_decode($result);

    return $data['auth'];
  }
}
