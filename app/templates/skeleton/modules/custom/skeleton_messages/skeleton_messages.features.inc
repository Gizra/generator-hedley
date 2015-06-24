<?php
/**
 * @file
 * skeleton_messages.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function skeleton_messages_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_default_message_type().
 */
function skeleton_messages_default_message_type() {
  $items = array();
  $items['reset_password'] = entity_import('message_type', '{
    "name" : "reset_password",
    "description" : "Reset Password",
    "argument_keys" : [],
    "argument" : [],
    "category" : "message_type",
    "data" : {
      "token options" : { "clear" : 0 },
      "purge" : { "override" : 0, "enabled" : 0, "quota" : "", "days" : "" }
    },
    "language" : "",
    "arguments" : null,
    "message_text" : { "und" : [
        {
          "value" : "Skeleton - Reset Password",
          "format" : "filtered_html",
          "safe_value" : "\\u003Cp\\u003ESkeleton - Reset Password\\u003C\\/p\\u003E\\n"
        },
        {
          "value" : "Hello,\\r\\n\\r\\nClick this link to reset your password:\\r\\n[skeleton:reset-password-link]",
          "format" : "filtered_html",
          "safe_value" : "\\u003Cp\\u003EHello,\\u003C\\/p\\u003E\\n\\u003Cp\\u003EClick this link to reset your password:\\u003Cbr \\/\\u003E\\n[skeleton:reset-password-link]\\u003C\\/p\\u003E\\n"
        }
      ]
    }
  }');
  $items['verify_email'] = entity_import('message_type', '{
    "name" : "verify_email",
    "description" : "Verify Email",
    "argument_keys" : [],
    "argument" : [],
    "category" : "message_type",
    "data" : {
      "token options" : { "clear" : 0 },
      "purge" : { "override" : 0, "enabled" : 0, "quota" : "", "days" : "" }
    },
    "language" : "",
    "arguments" : null,
    "message_text" : { "und" : [
        {
          "value" : "Skeleton - Verify Email",
          "format" : "filtered_html",
          "safe_value" : "\\u003Cp\\u003ESkeleton - Verify Email\\u003C\\/p\\u003E\\n"
        },
        {
          "value" : "Hello,\\r\\n\\r\\nClick this link to verify your email:\\r\\n[skeleton:verify-email-link]",
          "format" : "filtered_html",
          "safe_value" : "\\u003Cp\\u003EHello,\\u003C\\/p\\u003E\\n\\u003Cp\\u003EClick this link to verify your email:\\u003Cbr \\/\\u003E\\n[skeleton:verify-email-link]\\u003C\\/p\\u003E\\n"
        }
      ]
    }
  }');
  return $items;
}
