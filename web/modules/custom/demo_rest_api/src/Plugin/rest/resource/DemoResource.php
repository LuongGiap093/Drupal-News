<?php

namespace Drupal\demo_rest_api\Plugin\rest\resource;

use Drupal\node\Entity\Node;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;

/**
 * Provides a Demo Resource.
 *
 * @RestResource(
 *   id = "demo_resource",
 *   label = @Translation("Demo Resource"),
 *   uri_paths = {
 *     "canonical" = "/demo_rest_api/demo_resource"
 *   }
 * )
 */
class DemoResource extends ResourceBase {

  /**
   * Responds to entity GET requests.
   *
   * @return \Drupal\rest\ResourceResponse
   *   A prepared statement object, already executed.
   */
  public function get() {
    $nids = \Drupal::entityQuery('node')
      ->condition('type', 'article')
      ->execute();
    $nodes = Node::loadMultiple($nids);
    $response = $this->processNodes($nodes);
    return new ResourceResponse($response);
  }

  /**
   * Support for fclose().
   *
   * @return output
   *   TRUE on success, FALSE on failure.
   */
  public function processNodes($nodes) {
    $output = [];
    foreach ($nodes as $node_dump) {
      $output['title'] = $node_dump->get('title')->getValue();
      $output['body'] = $node_dump->get('body')->getValue();
    }
    return $output;
  }

}
