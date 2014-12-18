<?php

/**
 * @file
 * Contains \GbItemsMigrate.
 */

class GbItemsMigrate extends GbMigration {

  public $entityType = 'node';
  public $bundle = 'item';

  public $csvColumns = array(
    array('body', 'Body'),
    array('field_season', 'Season'),
    array('field_item_status', 'Status'),
  );

  public $dependencies = array(
    'GbItemStatusTermsMigrate',
    'GbSeasonsMigrate',
  );

  public function __construct() {
    parent::__construct();

    $this->addFieldMapping('body', 'body');

    $this
      ->addFieldMapping('field_season', 'field_season')
      ->sourceMigration('GbSeasonsMigrate');

    $this
      ->addFieldMapping('field_item_status', 'field_item_status')
      ->sourceMigration('GbItemStatusTermsMigrate');
  }

}
