<?php

$plugin = array(
  'label' => t('Items'),
  'resource' => 'items',
  'name' => 'items__1_0',
  'entity_type' => 'node',
  'bundle' => 'item',
  'description' => t('Export the "Item" content type.'),
  'class' => 'SkeletonItemsResource',
  'authentication_types' => TRUE,
);
