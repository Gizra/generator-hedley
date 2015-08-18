<?php

$plugin = array(
  'label' => t('Pusher auth'),
  'description' => t('Authenticate a user by the token for integration with Pusher.'),
  'resource' => 'pusher_auth',
  'class' => 'SkeletonPusherAuthResource',
  'entity_type' => 'user',
  'bundle' => 'user',
  'authentication_types' => TRUE,
  // Add a passthrough formatter.
  'formatter' => 'simple',
);
