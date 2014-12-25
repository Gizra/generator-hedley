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
      // This will add 3 image variants in the output.
      'image_styles' => array('thumbnail', 'medium', 'large'),
      'process_callbacks  ' => array(
        array($this, 'imageProcess'),
      ),
    );

    return $public_fields;
  }
}
