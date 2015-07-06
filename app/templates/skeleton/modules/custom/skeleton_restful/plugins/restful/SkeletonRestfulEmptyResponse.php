<?php

/**
 * @file
 * Contains SkeletonRestfulEmptyResponse
 */

class SkeletonRestfulEmptyResponse extends RestfulException {

  /**
   * Defines the HTTP error code.
   *
   * @var int
   */
  protected $code = 201;

  /**
   * Defines the description.
   *
   * @var string
   */
  protected $description = '';
}
