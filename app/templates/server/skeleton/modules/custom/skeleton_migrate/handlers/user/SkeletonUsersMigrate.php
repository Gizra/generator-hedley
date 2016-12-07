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
    '_unique_id',
    '_company',
    '_username',
    '_password',
    '_email',
  );

  public $entityType = 'user';

  public $dependencies = array(
    'SkeletonCompaniesMigrate',
  );

  public function __construct($arguments) {
    parent::__construct($arguments);

    $this->description = t('Import users from a CSV file.');

    $this
      ->addFieldMapping('og_user_node', '_company')
      ->separator('|')
      ->sourceMigration('SkeletonCompaniesMigrate');

    $this->addFieldMapping('name', '_username');
    $this->addFieldMapping('pass', '_password');
    $this->addFieldMapping('mail', '_email');
    $this
      ->addFieldMapping('roles')
      ->defaultValue(DRUPAL_AUTHENTICATED_RID);

    $this
      ->addFieldMapping('status')
      ->defaultValue(TRUE);

    // Create a map object for tracking the relationships between source rows
    $key = array(
      '_unique_id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );
    $destination_handler = new MigrateDestinationUser();
    $this->map = new MigrateSQLMap($this->machineName, $key, $destination_handler->getKeySchema());

    $query = db_select('_raw_user', 't')
      ->fields('t')
      ->orderBy('__id');

    $this->source = new MigrateSourceSQL($query, $this->fields);

    // Create a MigrateSource object.
    $this->destination = new MigrateDestinationUser();
  }
}
