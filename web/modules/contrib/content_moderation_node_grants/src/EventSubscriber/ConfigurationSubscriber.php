<?php

namespace Drupal\content_moderation_node_grants\EventSubscriber;

use Drupal\Core\Config\ConfigCrudEvent;
use Drupal\Core\Config\ConfigEvents;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

/**
 * Content Moderation Node Grants Workflow config event subscriber.
 */
class ConfigurationSubscriber implements EventSubscriberInterface {

  /**
   * Trigger a node access rebuild when the workflow transitions is updated.
   */
  public function configSave(ConfigCrudEvent $event) {
    $config = $event->getConfig();
    $config_name = $config->getName();

    // Work only with content_moderation workflow configurations.
    if (strpos($config_name, 'workflows.workflow.') !== 0 || $config->get('type') !== 'content_moderation') {
      return;
    }

    $needs_rebuild = $event->isChanged('type_settings.default_moderation_state');
    if (!$needs_rebuild) {
      // Check new and deleted transitions for changes.
      $transitions = $config->get('type_settings.transitions') + $config->getOriginal('type_settings.transitions');
      foreach ($transitions as $transition_id => $transition_prop) {
        if (
          $event->isChanged("type_settings.transitions.$transition_id.from") ||
          $event->isChanged("type_settings.transitions.$transition_id.to")
        ) {
          // The available transitions have been updated.
          $needs_rebuild = TRUE;
          break;
        }
      }
    }

    if ($needs_rebuild) {
      node_access_needs_rebuild(TRUE);
    }
  }

  /**
   * {@inheritdoc}
   */
  public static function getSubscribedEvents() {
    $events[ConfigEvents::SAVE] = ['configSave'];

    return $events;
  }

}
