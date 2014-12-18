<?php

$plugin = array(
  'label' => t('Tasks'),
  'resource' => 'tasks',
  'name' => 'tasks__1_0',
  'entity_type' => 'node',
  'bundle' => 'task',
  'description' => t('Export the "Task" content type.'),
  'class' => 'GbTasksResource',
  'authentication_types' => TRUE,
);
