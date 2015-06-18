<?php

/**
 * @file
 * Contains SkeletonTokenNotifierResource.
 */

class SkeletonTokenNotifierResource extends \RestfulEntityBaseUser {

  /**
   * Create a token and send it to the user.
   *
   * @param $message_type
   *  The type of the message to send.
   * @param $account
   *  The user account.
   *
   * @return array
   *  Return the account that was given.
   */
  protected function sendToken($message_type, $account) {

    if (empty($account)) {
      return array();
    }

    $controller = new RestfulTokenAuthController('restful_token_auth');
    $token = $controller->generateAccessToken($account->uid);

    // Sending Email with instructions to the user.
    return $this->notifyUser($message_type, $account, $token->token);
  }

  /**
   * Send an email to the user with the token.
   *
   * @param $message_type
   *  The type of the message.
   * @param $account
   *  The account of the user to notify.
   * @param $token
   *  The token of the user.
   */
  protected function notifyUser($message_type, $account, $token) {
    $message = message_create($message_type, array('arguments' => array('@token' => $token)), $account);
    $wrapper = entity_metadata_wrapper('message', $message);
    return message_notify_send_message($wrapper->value(), array('mail' => $account->mail));
  }
}
