<?php

$plugin = array(
  'label' => t('Update User Entity'),
  'resource' => 'users',
  'name' => 'update__1_1',
  'entity_type' => 'user',
  'bundle' => 'user',
  'description' => t('Users creation endpoint.'),
  'class' => 'SkeletonUsersResource',
  // Set the minor version.
  'minor_version' => 1,
  'rate_limit' => array(
    // The 'request' event is the basic event. You can declare your own events.
    'request' => array(
      'event' => 'request',
      // Rate limit is cleared every day.
      'period' => new \DateInterval('P1D'),
      'limits' => array(
        'authenticated user' => 10,
        'anonymous user' => 5,
        'administrator' => \RestfulRateLimitManager::UNLIMITED_RATE_LIMIT,
      ),
    ),
  ),
);
