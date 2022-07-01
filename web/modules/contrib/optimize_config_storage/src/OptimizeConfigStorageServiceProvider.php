<?php

namespace Drupal\optimize_config_storage;

use Drupal\Core\DependencyInjection\ContainerBuilder;
use Drupal\Core\DependencyInjection\ServiceModifierInterface;

/**
 *
 */
class OptimizeConfigStorageServiceProvider implements ServiceModifierInterface {

  /**
   * @param \Drupal\Core\DependencyInjection\ContainerBuilder $container
   * @return void
   */
  public function alter(ContainerBuilder $container) {
    $definition = $container->getDefinition('config.storage.active');
    $definition->setClass(OptimizeConfigMemoryStorage::class);
  }

}
