<?php

$plugin = array(
  'label' => t('Reset Password'),
  'description' => t('Sending a reset password link to the user.'),
  'name' => 'reset_password',
  'resource' => 'reset-password',
  'class' => 'SkeletonResetPasswordResource',
  'rate_limit' => array(
    // The 'request' event is the basic event. You can declare your own events.
    'request' => array(
      'event' => 'request',
      // Rate limit is cleared every day.
      'period' => new \DateInterval('P1D'),
      'limits' => array(
        'authenticated user' => 10,
        'anonymous user' => 10,
        'administrator' => \RestfulRateLimitManager::UNLIMITED_RATE_LIMIT,
      ),
    ),
  ),
);
