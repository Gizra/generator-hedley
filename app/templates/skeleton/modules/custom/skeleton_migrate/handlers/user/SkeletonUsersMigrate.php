<?php

/**
 * @file
 * Contains \SkeletonUsersMigrate.
 */

class SkeletonUsersMigrate extends Migration {

  /**
   * Map the field and properties to the CSV header.
   */
  public $csvColumns = array(
    array('id', 'Unique ID'),
    array('og_user_node', 'Company'),
    array('name', 'Username'),
    array('pass', 'Password'),
    array('mail', 'Email'),
  );

  public $entityType = 'user';

  public $dependencies = array(
    'SkeletonCompaniesMigrate',
  );

  public function __construct() {
    parent::__construct();
    $this->description = t('Import users from a CSV file.');

    $this
      ->addFieldMapping('og_user_node', 'og_user_node')
      ->separator('|')
      ->sourceMigration('SkeletonCompaniesMigrate');

    $this->addFieldMapping('name', 'name');
    $this->addFieldMapping('pass', 'pass');
    $this->addFieldMapping('mail', 'mail');
    $this
      ->addFieldMapping('roles')
      ->defaultValue(DRUPAL_AUTHENTICATED_RID);

    $this
      ->addFieldMapping('status')
      ->defaultValue(TRUE);

    // Create a map object for tracking the relationships between source rows
    $key = array(
      'id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );
    $destination_handler = new MigrateDestinationUser();
    $this->map = new MigrateSQLMap($this->machineName, $key, $destination_handler->getKeySchema());

    // Create a MigrateSource object.
    $this->source = new MigrateSourceCSV(drupal_get_path('module', 'skeleton_migrate') . '/csv/' . $this->entityType . '/user.csv', $this->csvColumns, array('header_rows' => 1));
    $this->destination = new MigrateDestinationUser();
  }


  /**
   * Fix an Entity reference related error when migrating multiple values.
   */
  public function prepare($entity, $row) {
    $ids = array();
    if (!empty($entity->og_user_node[LANGUAGE_NONE])) {
      foreach ($entity->og_user_node[LANGUAGE_NONE] as $value) {
        $ids[] = array('target_id' => $value['target_id']['destid1']);
      }
    }
    $entity->og_user_node[LANGUAGE_NONE] = $ids;
  }
}
