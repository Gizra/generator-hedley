<?php
/**
 * @file
 * Garmentbox profile.
 */

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * Allows the profile to alter the site configuration form.
 */
function garmentbox_form_install_configure_form_alter(&$form, $form_state) {
  // Pre-populate the site name with the server name.
  $form['site_information']['site_name']['#default_value'] = $_SERVER['SERVER_NAME'];
}

/**
 * Implements hook_install_tasks().
 */
function garmentbox_install_tasks() {
  $tasks = array();

  $tasks['garmentbox_setup_variables'] = array(
    'display_name' => st('Set Variables'),
    'display' => FALSE,
  );

  $tasks['garmentbox_setup_vocabularies'] = array(
    'display_name' => st('Set Vocabularies'),
    'display' => FALSE,
  );

  $tasks['garmentbox_setup_og_permissions'] = array(
    'display_name' => st('Set Blocks'),
    'display' => FALSE,
  );

  // Run this as the last task!
  $tasks['garmentbox_setup_rebuild_permissions'] = array(
    'display_name' => st('Rebuild permissions'),
    'display' => FALSE,
  );

  return $tasks;
}

/**
 * Task callback; Set variables.
 */
function garmentbox_setup_variables() {
  $variables = array(
    // Features default export path.
    'features_default_export_path' => 'profiles/garmentbox/modules/custom',
    // Mime-mail.
    'mimemail_format' => 'full_html',
    'mimemail_sitestyle' => FALSE,
    'mimemail_name' => 'GarmentBox',
    'mimemail_mail' => 'info@garmentbox.com',
    // jQuery versions.
    'jquery_update_jquery_version' => '1.10',
    'jquery_update_jquery_admin_version' => '1.5',
    // Enable restful files upload.
    'restful_file_upload' => 1,
    // Private files directory.
    'file_private_path' => 'sites/default/files/private',
    'file_default_scheme' => 'private',
  );

  foreach ($variables as $key => $value) {
    variable_set($key, $value);
  }
}

/**
 * Task callback; Setup OG permissions.
 *
 * We do this here, late enough to make sure all group-content were
 * created.
 */
function garmentbox_setup_og_permissions() {
  $og_roles = og_roles('node', 'company');
  $rid = array_search(OG_AUTHENTICATED_ROLE, $og_roles);

  $permissions = array();
  $types = array(
    'item',
    'item_variant',
    'material',
    'season',
  );
  foreach ($types as $type) {
    $permissions["create $type content"] = TRUE;
    $permissions["update own $type content"] = TRUE;
    $permissions["update any $type content"] = TRUE;
  }
  og_role_change_permissions($rid, $permissions);
}

/**
 * Task callback; Create site wide vocabularies.
 */
function garmentbox_setup_vocabularies() {
  $info = array(
    'season_status' => array(
      'name' => 'Season status',
      'description' => 'Status of a season.',
    ),
    'item_status' => array(
      'name' => 'Item status',
      'description' => 'Status of an item.',
    ),
  );

  foreach ($info as $machine_name => $row) {
    $vocabulary = (object) array(
      'name' => $row['name'],
      'description' => $row['description'],
      'machine_name' => $machine_name,
    );
    taxonomy_vocabulary_save($vocabulary);
  }
}

/**
 * Task callback; Setup blocks.
 */
function garmentbox_setup_blocks() {
  $default_theme = variable_get('theme_default', 'bartik');

  $blocks = array(
    array(
      'module' => 'system',
      'delta' => 'user-menu',
      'theme' => $default_theme,
      'status' => 1,
      'weight' => 0,
      'region' => 'header',
      'pages' => '',
      'title' => '<none>',
      'cache' => DRUPAL_NO_CACHE,
    ),
  );

  drupal_static_reset();
  _block_rehash($default_theme);
  foreach ($blocks as $record) {
    $module = array_shift($record);
    $delta = array_shift($record);
    $theme = array_shift($record);
    db_update('block')
      ->fields($record)
      ->condition('module', $module)
      ->condition('delta', $delta)
      ->condition('theme', $theme)
      ->execute();
  }
}

/**
 * Task callback; Rebuild permissions (node access).
 *
 * Setting up the platform triggers the need to rebuild the permissions.
 * We do this here so no manual rebuild is necessary when we finished the
 * installation.
 */
function garmentbox_setup_rebuild_permissions() {
  node_access_rebuild();
}
