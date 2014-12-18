<?php

/**
 * @file
 * Contains \GbSeasonsMigrate.
 */

class GbSeasonsMigrate extends GbMigration {

  public $entityType = 'node';
  public $bundle = 'season';

  public $csvColumns = array(
    array(OG_AUDIENCE_FIELD, 'Company'),
    array('field_season_status', 'Status'),
  );

  public $dependencies = array(
    'GbCompaniesMigrate',
    'GbSeasonStatusTermsMigrate',
  );

  public function __construct() {
    parent::__construct();

    $this
      ->addFieldMapping(OG_AUDIENCE_FIELD, OG_AUDIENCE_FIELD)
      ->sourceMigration('GbCompaniesMigrate');

    $this
      ->addFieldMapping('field_season_status', 'field_season_status')
      ->sourceMigration('GbSeasonStatusTermsMigrate');
  }
}
