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

    // Add a logo image.
    $this
      ->addFieldMapping('field_company_logo');

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

  /**
   * Add company logo by naming convertion.
   *
   * @todo: Move to value callback.
   */
  public function prepareRow($row) {
    $row->field_company_logo = $row->id . '.jpg';
    return parent::prepareRow($row);
  }
}
