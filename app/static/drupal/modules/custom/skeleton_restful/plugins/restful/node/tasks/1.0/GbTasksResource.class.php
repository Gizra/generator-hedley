<?php

/**
 * @file
 * Contains GbTasksResource.
 */

class GbTasksResource extends \GbEntityBaseNode {


  /**
   * Overrides \RestfulEntityBaseNode::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['host'] = array(
      'property' => 'field_node',
      'resource' => array(
        'item' => array(
          'resource_name' => 'items',
          'full_view' => FALSE,
        ),
        'item_variant' => array(
          'resource_name' => 'item_variants',
          'full_view' => FALSE,
        ),
      ),
    );

    return $public_fields;
  }
}
