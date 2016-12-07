<?php

$plugin = array(
  'label' => t('Companies'),
  'resource' => 'companies',
  'name' => 'companies__1_0',
  'entity_type' => 'node',
  'bundle' => 'company',
  'description' => t('Export the "Company" content type.'),
  'class' => 'SkeletonCompaniesResource',
  'authentication_types' => TRUE,
);
