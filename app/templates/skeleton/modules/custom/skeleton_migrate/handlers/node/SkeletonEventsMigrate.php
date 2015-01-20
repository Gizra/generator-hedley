<?php

/**
 * @file
 * Contains \SkeletonEventsMigrate.
 */

class SkeletonEventsMigrate extends \SkeletonMigrateBase {

  public $entityType = 'node';
  public $bundle = 'event';

  public $fields = array(
    'location',
    'company',
    'author',
  );

  public $dependencies = array(
    'SkeletonCompaniesMigrate',
    'SkeletonUsersMigrate',
  );


  public function __construct() {
    parent::__construct();


    $this
      ->addFieldMapping(OG_AUDIENCE_FIELD, 'company')
      ->sourceMigration('SkeletonCompaniesMigrate');

    $this
      ->addFieldMapping('uid', 'author')
      ->sourceMigration('SkeletonUsersMigrate');
  }

  /**
   * Map location field.
   *
   * @todo: Move to value callback.
   */
  public function prepare($entity, $row) {
    $row->location = explode('|', $row->location);
    $wrapper = entity_metadata_wrapper('node', $entity);
    $values = array(
      'lat' => $row->location[0],
      'lng' => $row->location[1],
    );
    $wrapper->field_location->set($values);
  }
}
