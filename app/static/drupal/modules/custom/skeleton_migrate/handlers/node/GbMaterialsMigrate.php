<?php

/**
 * @file
 * Contains \GbMaterialsMigrate.
 */

class GbMaterialsMigrate extends GbMigration {

  public $entityType = 'node';
  public $bundle = 'material';

  public $csvColumns = array(
    array('field_material_images', 'Images'),
    array(OG_AUDIENCE_FIELD, 'Company'),
  );

  public $dependencies = array(
    'GbCompaniesMigrate',
  );

  public function __construct() {
    parent::__construct();

    $this->addFieldMapping('field_material_images', 'field_material_images');

    $this
      ->addFieldMapping('field_material_images:file_replace')
      ->defaultValue(FILE_EXISTS_REPLACE);
    $this
      ->addFieldMapping('field_material_images:source_dir')
      ->defaultValue(drupal_get_path('module', 'gb_migrate') . '/images');

    $this
      ->addFieldMapping(OG_AUDIENCE_FIELD, OG_AUDIENCE_FIELD)
      ->sourceMigration('GbCompaniesMigrate');
  }
}
