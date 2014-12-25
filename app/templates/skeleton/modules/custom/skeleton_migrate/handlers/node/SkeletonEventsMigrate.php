<?php

/**
 * @file
 * Contains \SkeletonEventsMigrate.
 */

class SkeletonEventsMigrate extends \SkeletonMigrateBase {

  public $entityType = 'node';
  public $bundle = 'event';

  public $csvColumns = array(
    array(OG_AUDIENCE_FIELD, 'Company'),
    array('uid', 'Author'),
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
      ->addFieldMapping('uid', 'uid')
      ->sourceMigration('SkeletonUsersMigrate');
  }
}
