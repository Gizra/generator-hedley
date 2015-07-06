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
   */
  public function resetPassword() {

    $email = $this->request['email'];

    if (!$account = user_load_by_mail($email)) {
      throw new \RestfulBadRequestException('Email does\'t exists.');
    }

    $this->sendToken('reset_password', $account);

    throw new \SkeletonRestfulEmptyResponse();
  }

}
