<?php

/**
 * @file
 * Contains SkeletonResetPasswordResource.
 */

class SkeletonResetPasswordResource extends \SkeletonTokenNotifierResource {
  /**
   * Overrides \RestfulEntityBase::controllers.
   */
  protected $controllers = array(
    '' => array(
      \RestfulInterface::POST => 'resetPassword',
    ),
  );

  /**
   * Send "Reset Password" email.
   *
   * @return array
   */
  public function resetPassword() {

    $email = $this->request['email'];

    $account = user_load_by_mail($email);

    if (empty($account)) {
      return array();
    }

    $this->sendToken('reset_password', $account);

    return array();
  }

}
