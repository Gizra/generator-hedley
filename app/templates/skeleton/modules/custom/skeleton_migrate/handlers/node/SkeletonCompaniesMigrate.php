<?php

/**
 * @file
 * Contains \SkeletonCompaniesMigrate.
 */

class SkeletonCompaniesMigrate extends \SkeletonMigrateBase {

  public $entityType = 'node';
  public $bundle = 'company';

  public function __construct() {
    parent::__construct();
    $this
      ->addFieldMapping(OG_GROUP_FIELD)
      ->defaultValue(TRUE);

    // Group is private by default.
    $this
      ->addFieldMapping(OG_ACCESS_FIELD)
      ->defaultValue(TRUE);

    // Add an image by the unique ID name.
    $this
      ->addFieldMapping('field_company_logo')
      ->defaultValue('company1');

    $this
      ->addFieldMapping('field_company_logo:file_replace')
      ->defaultValue(FILE_EXISTS_REPLACE);

    $path = variable_get('skeleton_migrate_directory', FALSE) ? variable_get('skeleton_migrate_directory') : drupal_get_path('module', 'skeleton_migrate');
    $this
      ->addFieldMapping('field_company_logo:source_dir')
      ->defaultValue($path . '/images');

    $this
      ->addFieldMapping('field_company_logo:destination_dir', 'destination');

    // Group belong to the admin by default.
    $this
      ->addFieldMapping('uid')
      ->defaultValue('1');
  }

}
