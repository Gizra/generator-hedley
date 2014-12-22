<?php

/**
 * @file
 * Contains \SkeletonEventsResource.
 */

class SkeletonEventsResource extends \SkeletonEntityBaseNode {

  /**
   * Overrides \RestfulEntityBaseNode::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['location'] = array(
      'property' => 'field_location',
      'process_callbacks' => array(
        array($this, 'processLocation'),
      ),
    );

    $public_fields['user'] = array(
      'property' => 'author',
      'resource' => array(
        'user' => array(
          'name' => 'users',
        ),
      ),
    );

    return $public_fields;
  }

  /**
   * Process callback; Clean the "location" field output.
   *
   * @param array $value
   *   The entire array of the location field.
   *
   * @return array
   *   Array keyed by "lat" and "lng".
   */
  protected function processLocation($value) {
    return array(
      'lat' => $value['lat'],
      'lng' => $value['lng'],
    );
  }
}
