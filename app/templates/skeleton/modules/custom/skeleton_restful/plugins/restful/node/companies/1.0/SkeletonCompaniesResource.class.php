<?php

/**
 * @file
 * Contains SkeletonCompaniesResource.
 */

class SkeletonCompaniesResource extends \SkeletonEntityBaseNode {


  /**
   * Overrides \RestfulEntityBaseNode::publicFieldsInfo().
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['logo'] = array(
      'property' => 'field_company_logo',
      'process_callback' => array($this, 'imageProcess'),
      // This will add 3 image variants in the output.
      'image_styles' => array('thumbnail', 'medium', 'large'),
    );

    return $public_fields;
  }
}
