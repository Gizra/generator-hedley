<?php

$plugin = array(
  'label' => t('Item variants'),
  'resource' => 'item_variants',
  'name' => 'item_variants__1_0',
  'entity_type' => 'node',
  'bundle' => 'item_variant',
  'description' => t('Export the "Item variants" content type.'),
  'class' => 'GbItemVariantsResource',
  'authentication_types' => TRUE,
);
