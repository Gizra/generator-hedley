<?php

/**
 * @file
 * Contains \SkeletonCompaniesMigrate.
 */

class SkeletonCompaniesMigrate extends \SkeletonMigrateBase {

  public $entityType = 'node';
  public $bundle = 'company';

  public function __construct($arguments) {
    parent::__construct($arguments);

    $this
      ->addFieldMapping(OG_GROUP_FIELD)
      ->defaultValue(TRUE);

    // Group is private by default.
    $this
      ->addFieldMapping(OG_ACCESS_FIELD)
      ->defaultValue(TRUE);

    // Add a logo image.
    $this
      ->addFieldMapping('field_company_logo', 'field_company_logo');

    $this
      ->addFieldMapping('field_company_logo:file_replace')
      ->defaultValue(FILE_EXISTS_REPLACE);

    $this
      ->addFieldMapping('field_company_logo:source_dir')
      ->defaultValue($this->getMigrateDirectory() . '/images/');

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
    $row->field_company_logo = $row->_unique_id . '.jpg';
    if (!file_exists($image_path = $this->getMigrateDirectory() . '/images/'. $row->field_company_logo)) {
      $this->displayMessage(format_string('Unable to find image: @image', array('@image' => $image_path)));
    }
    return parent::prepareRow($row);
  }
}
