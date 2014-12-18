<?php

/**
 * @file
 * Contains \GbItemVariantsMigrate.
 */

class GbItemVariantsMigrate extends GbMigration {

  public $entityType = 'node';
  public $bundle = 'item_variant';

  public $csvColumns = array(
    array('field_item', 'Item'),
    array('field_materials', 'Materials'),
    array('field_item_variant_images', 'Images'),
    array('field_item_status', 'Status'),
    array('field_retail_price', 'Retail price'),
    array('field_wholesale_price', 'Wholesale price'),
  );

  public $dependencies = array(
    'GbItemsMigrate',
    'GbMaterialsMigrate',
  );

  public function __construct() {
    parent::__construct();
    $this->addFieldMapping('body', 'body');

    $this
      ->addFieldMapping('field_item', 'field_item')
      ->sourceMigration('GbItemsMigrate');

    $this
      ->addFieldMapping('field_materials', 'field_materials')
      ->sourceMigration('GbMaterialsMigrate');

    $this
      ->addFieldMapping('field_item_variant_images', 'field_item_variant_images')
      ->separator('|');

    $this
      ->addFieldMapping('field_item_variant_images:file_replace')
      ->defaultValue(FILE_EXISTS_REPLACE);

    $this
      ->addFieldMapping('field_item_variant_images:source_dir')
      ->defaultValue(drupal_get_path('module', 'gb_migrate') . '/images');

    $this
      ->addFieldMapping('field_item_status', 'field_item_status')
      ->sourceMigration('GbItemStatusTermsMigrate');

    $this->addFieldMapping('field_retail_price', 'field_retail_price');

    $this->addFieldMapping('field_wholesale_price', 'field_wholesale_price');

  }

  /**
   * Overrides \GbMigration::complete().
   *
   * Flag certain item variants as line-sheet items.
   *
   * @todo: Re-add once line sheet is added.
   */
  public function complete($entity, $row) {
    return;

    $titles = array(
      'Lines v-neck shirt',
      'Black v-neck shirt',
    );

    if (!in_array($entity->title, $titles)) {
      return;
    }

    $account = user_load(1);
    flag('flag', 'line_sheet', $entity->nid, $account);
  }
}
