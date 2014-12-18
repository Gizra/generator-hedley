<?php

/**
 * @file
 * Contains GbItemVariantsResource.
 */

class GbItemVariantsResource extends \GbEntityBaseNode {


  /**
   * Overrides \RestfulEntityBaseNode::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['item'] = array(
      'property' => 'field_item',
      'resource' => array(
        'item' => array(
          'name' => 'items',
          'full_view' => FALSE,
        ),
      ),
    );

    $public_fields['images'] = array(
      'property' => 'field_item_variant_images',
      'process_callbacks' => array(
        array($this, 'imageProcess'),
      ),
      // This will add 3 image variants in the output.
      'image_styles' => array('thumbnail', 'medium', 'large'),
    );

    return $public_fields;
  }


  /**
   * Overrides \RestfulEntityBaseNode::getQueryForList();
   */
  public function getQueryForList() {
    $query =  parent::getQueryForList();

    $request = $this->getRequest();
    if (!empty($request['item'])) {
      $query->fieldCondition('field_item', 'target_id', intval($request['item']));
    }

    return $query;
  }

  /**
   * Return image URLs based on image styles.
   *
   * @param $value
   *   The image array.
   *
   * @return array
   *   Array keyed by the image style and the url as the value.
   */
  protected function logoProcess($value) {
    $uri = $value['uri'];
    $return = array(
      'original' => file_create_url($uri),
    );

    $image_styles = array(
      'thumbnail',
      'medium',
      'large',
    );

    foreach ($image_styles as $image_style) {
      $return[$image_style] = image_style_url($image_style, $uri);
    }
    return $return;
  }
}
