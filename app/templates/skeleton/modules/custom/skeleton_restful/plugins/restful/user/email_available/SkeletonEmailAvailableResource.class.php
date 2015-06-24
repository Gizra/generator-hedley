<?php

/**
 * @file
 * Contains SkeletonEmailAvailableResource.
 */

class SkeletonEmailAvailableResource extends SkeletonAvailableResource {

  protected $field = 'email';
  protected $load_account_by = 'user_load_by_mail';
}
