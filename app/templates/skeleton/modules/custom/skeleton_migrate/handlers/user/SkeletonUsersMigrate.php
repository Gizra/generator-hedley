<?php

/**
 * @file
 * Contains \SkeletonUsersMigrate.
 */

class SkeletonUsersMigrate extends Migration {

  /**
   * Map the field and properties to the CSV header.
   */
  public $fields = array(
    'unique_id',
    'company',
    'username',
    'password',
    'email',
  );

  public $entityType = 'user';

  public $dependencies = array(
    'SkeletonCompaniesMigrate',
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import users from a CSV file.');

    $this
      ->addFieldMapping('og_user_node', 'company')
      ->separator('|')
      ->sourceMigration('SkeletonCompaniesMigrate');

    $this->addFieldMapping('name', 'username');
    $this->addFieldMapping('pass', 'password');
    $this->addFieldMapping('mail', 'email');
    $this
      ->addFieldMapping('roles')
      ->defaultValue(DRUPAL_AUTHENTICATED_RID);

    $this
      ->addFieldMapping('status')
      ->defaultValue(TRUE);

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'unique_id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );
    $destination_handler = new MigrateDestinationUser();
    $this->map = new MigrateSQLMap($this->machineName, $key, $destination_handler->getKeySchema());
    $query = db_select('_raw_user', 't')
      ->fields('t')
      ->orderBy('id');
    $this->source = new MigrateSourceSQL($query, $this->fields);

    // Create a MigrateSource object.
    $this->destination = new MigrateDestinationUser();
  }
}
