<?php

$plugin = array(
  'label' => t('Events'),
  'resource' => 'events',
  'name' => 'events__1_0',
  'entity_type' => 'node',
  'bundle' => 'event',
  'description' => t('Export the "Event" content type.'),
  'class' => 'SkeletonEventsResource',
  'authentication_types' => TRUE,
);
