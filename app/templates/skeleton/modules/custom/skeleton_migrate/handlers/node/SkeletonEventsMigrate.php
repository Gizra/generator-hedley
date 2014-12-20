<?php

/**
 * @file
 * Contains \SkeletonEventsMigrate.
 */

class SkeletonEventsMigrate extends \SkeletonMigrateBase {

  public $entityType = 'node';
  public $bundle = 'event';

  public $csvColumns = array(
    array('field_location', 'Location'),
    array(OG_AUDIENCE_FIELD, 'Company'),
  );

  public $dependencies = array(
    'SkeletonCompaniesMigrate',
  );


  public function __construct() {
    parent::__construct();


    $this
      ->addFieldMapping(OG_AUDIENCE_FIELD, OG_AUDIENCE_FIELD)
      ->sourceMigration('SkeletonCompaniesMigrate');

    $this
      ->addFieldMapping('uid')
      ->defaultValue('1');
  }

  /**
   * Map location field.
   */
  public function prepare($entity, $row) {
    $row->field_location = explode('|', $row->field_location);

    $wrapper = entity_metadata_wrapper('node', $entity);
    $values = array(
      'lat' => $row->field_location[0],
      'lng' => $row->field_location[1],
    );
    $wrapper->field_location->set($values);
  }
}
