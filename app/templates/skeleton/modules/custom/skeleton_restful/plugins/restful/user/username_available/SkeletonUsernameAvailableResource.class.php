<?php

/**
 * @file
 * Contains SkeletonUsernameAvailableResource.
 */

class SkeletonUsernameAvailableResource extends SkeletonAvailableResource {

  protected $field = 'username';
  protected $load_account_by = 'user_load_by_name';
}
