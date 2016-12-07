<?php

/**
 * @file
 * Contains \SkeletonMigration.
 */

abstract class SkeletonMigrateBase extends Migration {

  public function __construct($arguments) {
    parent::__construct($arguments);

    // Make sure we can use it for node and term only.
    if (!in_array($this->entityType, array('node', 'taxonomy_term'))) {
      throw new Exception('\SkeletonMigration supports only nodes and terms.');
    }

    $this->description = t('Import @type - @bundle from SQL table', array('@type' => $this->entityType, '@bundle' => $this->bundle));

    $this->fields = !empty($this->fields) ? $this->fields : array();
    $sql_fields[] = '_unique_id';

    if ($this->entityType == 'node') {
      $this->addFieldMapping('title', '_title');
      $class_name = 'MigrateDestinationNode';
      $sql_fields[] = '_title';
    }
    elseif ($this->entityType == 'taxonomy_term') {
      $this->addFieldMapping('name', '_name');
      $class_name = 'MigrateDestinationTerm';
      $sql_fields[] = '_name';
    }

    // Rebuild the csv columns array.
    $this->fields = array_merge($sql_fields, $this->fields);

    // Create a map object for tracking the relationships between source rows
    $key = array(
      '_unique_id' => array(
        'type' => 'varchar',
        'length' => 255,
        'not null' => TRUE,
      ),
    );

    $destination_handler = new MigrateDestinationEntityAPI($this->entityType, $this->bundle);
    $this->map = new MigrateSQLMap($this->machineName, $key, $destination_handler->getKeySchema($this->entityType));

    // Create a MigrateSource object.
    $sql_table = (isset($this->sqlTable)) ? '_raw_' . $this->sqlTable : '_raw_' . $this->bundle;

    $query = db_select($sql_table, 't')
      ->fields('t')
      ->orderBy('__id');
    $this->source = new MigrateSourceSQL($query, $this->fields);

    $this->destination = new $class_name($this->bundle, array('text_format' => 'filtered_html'));
  }

  /**
   * Return the migrate directory.
   *
   * @return string
   *   The migrate directory.
   */
  protected function getMigrateDirectory() {
    return variable_get('skeleton_migrate_directory', FALSE) ? variable_get('skeleton_migrate_directory') : drupal_get_path('module', 'skeleton_migrate');
  }
}
