<?php

namespace Drupal\resume\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a 'Hello' Block.
 *
 * @Block(
 *   id = "hello_block",
 *   admin_label = @Translation("Hello block"),
 *   category = @Translation("Hello World"),
 * )
 */
class HelloBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    $config = $this->getConfiguration();
    $form['heading'] = [
      '#type' => 'textfield',
      '#title' => t('Heading'),
      '#description' => t('Enter text your here'),
      '#default_value' => $config['heading'] ?? '',
    ];
    $form['name'] = [
      '#type' => 'textfield',
      '#title' => ('Name'),
    ];

    return $form;
  }

  public function blockSubmit($form, FormStateInterface $formState) {
    $this->configuration['heading'] = $formState->getValue('heading');
    $this->configuration['name'] = $formState->getValue('name');
  }

  public function build() {
    $data = $this->configuration['heading'];
    return [
      '#markup' => $data,
      '#data' =>$data,
    ];
  }

}
